import Header, { HeaderStaticContent } from '../../components/header/Header'
import { GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import HeroProject from '../../components/project/HeroProject'
import ProjectFeatured from '../../components/project/ProjectFeatured'
import { PaginationProvider } from '../../hooks/UsePagination'
import ProjectList from '../../components/project/ProjectList'
import { FilterProvider } from '../../hooks/UseFilter'
import { ProjectProvider } from '../../hooks/UseProject'
import { Framework, Language } from '../../typings'

interface Props {
    headerContent: HeaderStaticContent,
    languages: Array<Language>,
    frameworks: Array<Framework>
}

const Projects: NextPage<Props> = ({headerContent, languages, frameworks}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <ProjectProvider languageList={languages} frameworkList={frameworks}>
            <div className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
                <Head>
                    <title>Projects - Codedillo</title>
                    <link rel="icon" type="image/png" href="/favicon.png"/>
                </Head>
                <Header content={headerContent}/>
                <main className="w-full pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                    <HeroProject/>
                    <ProjectFeatured className="mt-16 md:mt-32 xl:mt-64"/>
                    <PaginationProvider>
                        <FilterProvider>
                            <ProjectList className="mt-16 md:mt-24 pt-6"/>
                        </FilterProvider>
                    </PaginationProvider>
                </main>
                <Footer/>
            </div>
        </ProjectProvider>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
    const headerContent = parseOrNull(fs.readFileSync(path.join('locales', locale ?? 'en', 'header.json'), 'utf-8'))
    const languages = parseOrNull(fs.readFileSync(path.join('locales', 'languages.json'), 'utf-8'))
    const frameworks = parseOrNull(fs.readFileSync(path.join('locales', 'frameworks.json'), 'utf-8'))

    return {
        props: {
            headerContent,
            languages,
            frameworks
        }
    }
}

export default Projects