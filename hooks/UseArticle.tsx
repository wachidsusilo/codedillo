import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface IArticleNavigation {
    searchModalOpen: boolean
    setSearchModalOpen: Dispatch<SetStateAction<boolean>>
}

const ArticleContext = createContext<IArticleNavigation>({
    searchModalOpen: false,
    setSearchModalOpen: () => {}
})

interface ArticleProviderProps {
    children: ReactNode
}

export const ArticleProvider = ({children}: ArticleProviderProps) => {
    const [searchModalOpen, setSearchModalOpen] = useState(false)

    return (
        <ArticleContext.Provider
            value={{
                searchModalOpen,
                setSearchModalOpen
            }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default function useArticle () {
    return useContext(ArticleContext)
}