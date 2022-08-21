import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Header, { HeaderStaticContent } from '../components/header/Header'
import Hero from '../components/Hero'
import * as fs from 'fs'
import path from 'path'
import { parseOrNull } from '../utils/utils'
import ArticleSpotlight from '../components/article/ArticleSpotlight'
import VideoBoard from '../components/general/VideoBoard'
import SocialMedia from '../components/SocialMedia'
import Footer from '../components/footer/Footer'
import useNavigation from '../hooks/UseNavigation'
import { useEffect } from 'react'

interface Props {
    headerContent: HeaderStaticContent
}

const Home: NextPage<Props> = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div
            className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>Codedillo</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <Hero/>
                <ArticleSpotlight className="my-24 md:my-36 lg:my-44 xl:my-56"/>
                <VideoBoard className="mt-24 md:mt-36 lg:mt-44 xl:mt-56"/>
                <SocialMedia
                    className="mt-24 md:mt-36 lg:mt-44 xl:mt-56"
                    title={'Get in touch with us!'} />
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

export default Home
