import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { generateArticleId, getArticle, removeArticle, updateArticle } from '../firebase/firebase'
import { EditorData } from '../typings'

interface IArticle {
    searchModalOpen: boolean
    setSearchModalOpen: Dispatch<SetStateAction<boolean>>
    getArticle(id: string): Promise<EditorData | null>
    updateArticle(article: EditorData): Promise<void>
    removeArticle(id: string): Promise<void>
    generateArticleId(): string | null
}

const ArticleContext = createContext<IArticle>({
    searchModalOpen: false,
    setSearchModalOpen: () => {},
    getArticle,
    updateArticle,
    removeArticle,
    generateArticleId
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
                setSearchModalOpen,
                getArticle,
                updateArticle,
                removeArticle,
                generateArticleId
            }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default function useArticle () {
    return useContext(ArticleContext)
}