import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { Framework, FrameworkId, Language, LanguageId } from '../typings'

interface IProject {
    languages: Array<Language>
    frameworks: Array<Framework>
    getLanguageById: (id: LanguageId) => Language | null
    getFrameworkById: (id: FrameworkId) => Framework | null
}

const ProjectContext = createContext<IProject>({
    languages: [],
    frameworks: [],
    getLanguageById: () => null,
    getFrameworkById: () => null,
})

interface ProjectProviderProps {
    children: ReactNode,
    languageList: Array<Language>,
    frameworkList: Array<Framework>
}

export const ProjectProvider = ({children, languageList, frameworkList}: ProjectProviderProps) => {
    const [languages, setLanguages] = useState<Array<Language>>(languageList)
    const [frameworks, setFrameworks] = useState<Array<Framework>>(frameworkList)

    useEffect(() => {
        setLanguages(languageList)
        setFrameworks(frameworkList)
    }, [languageList, frameworkList])

    const memoizedValue = useMemo<IProject>(() => ({
        languages,
        frameworks,
        getLanguageById: (id) => languages.find(it => it.id === id) ?? null,
        getFrameworkById: (id) => frameworks.find(it => it.id === id) ?? null
    }), [languages, frameworks])

    return (
        <ProjectContext.Provider value={memoizedValue}>
            {children}
        </ProjectContext.Provider>
    )
}

export default function useProject() {
    return useContext(ProjectContext)
}