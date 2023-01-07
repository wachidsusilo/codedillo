import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

type LocaleType = 'en' | 'id'

interface ILocale {
    code: LocaleType
    name: string
}

const locales: Array<ILocale> = [
    {code: 'en', name: 'English'},
    {code: 'id', name: 'Bahasa'}
]

const defaultLocale: ILocale = {
    code: 'en',
    name: 'English'
}

const getLocale = (code: string): ILocale | null => {
    return locales.find((l) => l.code === code) ?? null
}

interface ILocaleProvider {
    locale: ILocale,
    setLocale: (code: string) => void
}

const LocaleContext = createContext<ILocaleProvider>({
    locale: defaultLocale,
    setLocale: () => {}
})

interface LocaleProviderProps {
    children: ReactNode
}

export const LocaleProvider = ({children}: LocaleProviderProps) => {
    const [language, setLanguage] = useState<ILocale>(defaultLocale)
    const [initialLoading, setInitialLoading] = useState(true)
    const {replace, pathname, asPath, query, locale} = useRouter()

    useEffect(() => {
        const preferredLocale = getLocale(localStorage.getItem('lang') ?? 'en')
        const suggestedLocale = getLocale(locale ?? 'en')
        setLanguage(preferredLocale ?? suggestedLocale ?? defaultLocale)
        setInitialLoading(false)
    }, [])

    useEffect(() => {
        if (!initialLoading) {
            replace({pathname, query, hash: asPath.split('#')[1]}, asPath, {locale: language.code})
                .catch((e) => {
                    if (!e.cancelled) {
                        throw e
                    }
                })
        }
    }, [language])

    const memoizedValue = useMemo<ILocaleProvider>(() => ({
        locale: language,
        setLocale: (code) => {
            localStorage.setItem('lang', code)
            setLanguage(getLocale(code) ?? defaultLocale)
        }
    }), [language])

    return (
        <LocaleContext.Provider value={memoizedValue}>
            {!initialLoading && children}
        </LocaleContext.Provider>
    )
}

export default function useLocale() {
    return useContext(LocaleContext)
}