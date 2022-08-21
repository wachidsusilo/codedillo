import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import Header, { HeaderStaticContent } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ArticleEditor from '../../components/article/ArticleEditor'

interface Props {
    headerContent: HeaderStaticContent
}

const Create = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>Codedillo - Create Article</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <div className="w-full max-w-container mx-auto mt-32 flex flex-col items-center">
                    <h1 className="text-3xl font-medium text-center">Create Article</h1>
                    <p className="max-w-[600px] mt-4 text-md text-white/60 text-center">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at commodi laboriosam nam
                        placeat possimus ratione repellat reprehenderit vel veritatis!
                    </p>
                </div>
                <ArticleEditor className="mt-8" />
            </main>
            <Footer/>
        </div>
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

export default Create