import Head from 'next/head'
import Header, { HeaderStaticContent } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { GetStaticProps, NextPage } from 'next'
import { parseOrNull } from '../../utils/utils'
import fs from 'fs'
import path from 'path'
import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import HeroAbout from '../../components/about/HeroAbout'
import AboutSkills from '../../components/about/AboutSkills'
import AboutEducation from '../../components/about/AboutEducation'
import AboutInterest from '../../components/about/AboutInterest'
import SocialMedia from '../../components/SocialMedia'
import AboutWork from '../../components/about/AboutWork'

interface Props {
    headerContent: HeaderStaticContent
}

const About: NextPage<Props> = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>About - Codedillo</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full px-8 pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <HeroAbout className="mt-24" />
                <AboutEducation className="mt-32" />
                <AboutSkills className="mt-32" />
                <AboutInterest className="mt-32" />
                <AboutWork className="mt-32" />
                <SocialMedia className="mt-32" />
            </main>
            <Footer/>
        </div>
    )
}

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
    const headerContent = parseOrNull(fs.readFileSync(path.join('locales', locale ?? 'en', 'header.json'), 'utf-8'))
    return {
        props: {
            headerContent
        }
    }
}

export default About