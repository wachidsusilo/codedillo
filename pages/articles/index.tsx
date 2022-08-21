import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Header, { HeaderStaticContent } from '../../components/header/Header'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import Footer from '../../components/footer/Footer'
import HeroArticle from '../../components/article/HeroArticle'
import ArticleFeatured from '../../components/article/ArticleFeatured'
import ArticleList from '../../components/article/ArticleList'
import useNavigation from '../../hooks/UseNavigation'
import { PaginationProvider } from '../../hooks/UsePagination'
import { useEffect } from 'react'
import ArticleCreate from '../../components/article/ArticleCreate'
import ArticleSearchModal from '../../components/article/ArticleSearchModal'
import { ArticleProvider } from '../../hooks/UseArticle'

interface Props {
    headerContent: HeaderStaticContent
}

const Articles: NextPage<Props> = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <ArticleProvider>
            <div
                className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
                <Head>
                    <title>Codedillo - Articles</title>
                    <link rel="icon" type="image/png" href="/favicon.png"/>
                </Head>
                <Header content={headerContent}/>
                <main className="w-full pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                    <HeroArticle/>
                    <ArticleFeatured className="mt-16 sm:mt-32 xl:mt-48"/>
                    <PaginationProvider>
                        <ArticleList className="pt-6"/>
                    </PaginationProvider>
                    <ArticleCreate className="mt-32 lg:mt-64" />
                </main>
                <ArticleSearchModal />
                <Footer/>
            </div>
        </ArticleProvider>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
    const header = fs.readFileSync(path.join('locales', locale ?? 'en', 'header.json'), 'utf-8')
    const headerProps = parseOrNull(header)

    return {
        props: {
            headerContent: headerProps
        }
    }
}

export default Articles