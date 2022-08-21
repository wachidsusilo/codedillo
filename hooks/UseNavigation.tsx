import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface INavigation {
    root: HTMLDivElement | null
    setRoot: Dispatch<SetStateAction<HTMLDivElement | null>>
    navbarOpen: boolean
    setNavbarOpen: Dispatch<SetStateAction<boolean>>
}

const NavigationContext = createContext<INavigation>({
    root: null,
    setRoot: () => {},
    navbarOpen: false,
    setNavbarOpen: () => {}
})

interface NavigationProviderProps {
    children: ReactNode
}

export const NavigationProvider = ({children}: NavigationProviderProps) => {
    const [root, setRoot] = useState<HTMLDivElement | null>(null)
    const [navbarOpen, setNavbarOpen] = useState(false)

    return (
        <NavigationContext.Provider
            value={{
                root,
                setRoot,
                navbarOpen,
                setNavbarOpen
            }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default function useNavigation () {
    return useContext(NavigationContext)
}