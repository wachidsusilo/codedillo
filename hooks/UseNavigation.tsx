import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

interface INavigation {
    root: HTMLDivElement | null
    setRoot: Dispatch<SetStateAction<HTMLDivElement | null>>
    navbarOpen: boolean
    setNavbarOpen: Dispatch<SetStateAction<boolean>>
    registerClickConsumer(id: string, call: () => void, windowEvent?: boolean): void
    unregisterClickConsumer(id: string): void
    clickAnywhere(...excludeIds: Array<string>): void
}

interface ClickCallback {
    id: string
    call: () => void
    windowEvent: boolean
}

const clickCallbacks: Array<ClickCallback> = []

const registerClickConsumer = (id: string, call: () => void, windowEvent: boolean = true) => {
    if (!clickCallbacks.some(value => value.id === id)) {
        clickCallbacks.push({id, call, windowEvent})
    }
}

const unregisterClickConsumer = (id: string) => {
    const idx = clickCallbacks.findIndex(value => value.id === id)
    if (idx >= 0) {
        clickCallbacks.splice(idx, 1)
    }
}

const clickAnywhere = (...excludeIds: Array<string>) => {
    for (const callback of clickCallbacks) {
        if (!excludeIds.some(id => id === callback.id)) {
            callback.call()
        }
    }
}

const NavigationContext = createContext<INavigation>({
    root: null,
    setRoot: () => {},
    navbarOpen: false,
    setNavbarOpen: () => {},
    registerClickConsumer,
    unregisterClickConsumer,
    clickAnywhere
})

interface NavigationProviderProps {
    children: ReactNode
}

export const NavigationProvider = ({children}: NavigationProviderProps) => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null)
    const [navbarOpen, setNavbarOpen] = useState(false)

    useEffect(() => {
        const onClick = () => {
            for (const callback of clickCallbacks) {
                if (callback.windowEvent) {
                    callback.call()
                }
            }
        }

        window.addEventListener('click', onClick)
        return () => {
            window.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <NavigationContext.Provider
            value={{
                root,
                setRoot,
                navbarOpen,
                setNavbarOpen,
                registerClickConsumer,
                unregisterClickConsumer,
                clickAnywhere
            }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default function useNavigation () {
    return useContext(NavigationContext)
}