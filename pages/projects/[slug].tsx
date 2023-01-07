import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Header, { HeaderStaticContent } from '../../components/header/Header'
import fs from 'fs'
import path from 'path'
import { parseOrNull, toTitleCase } from '../../utils/utils'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import { ProjectMeta } from '../../typings'

interface Props {
    headerContent: HeaderStaticContent,
    project: ProjectMeta
}

const Project: NextPage<Props> = ({headerContent, project}: Props) => {
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
                <div>
                    {project.title}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticPaths: GetStaticPaths = async ({locales, defaultLocale}) => {
    const titles: Array<string> = ['title_1', 'title_2']

    const paths = titles.map((title) => {
        if (locales) {
            return locales.map((locale) => {
                return {
                    locale,
                    params: {slug: title}
                }
            })
        } else {
            return {
                locale: defaultLocale,
                params: {slug: title}
            }
        }
    }).flat(Infinity) as Array<{params: {slug: string}, locale?: string | undefined}>

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({locale, params}) => {
    const header = fs.readFileSync(path.join('locales', locale ?? 'en', 'header.json'), 'utf-8')
    const headerProps = parseOrNull(header)

    const {slug} = params as IParams

    const project: ProjectMeta = {
        id: slug,
        title: toTitleCase(slug.replace('_', ' ')),
        description: slug == 'title_1'
            ? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at deleniti iusto velit. Eligendi illum modi numquam repudiandae sequi! Quaerat?'
            : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto commodi deserunt dolorem dolores enim esse laudantium modi tenetur unde.',
        imageUrls: [
            '/assets/images/sample_programming.jpg',
            '/assets/images/sample_programming.jpg',
            '/assets/images/sample_programming.jpg',
            '/assets/images/sample_programming.jpg',
            '/assets/images/sample_programming.jpg'
        ],
        languages: slug == 'title_1' ? ['cpp', 'kt'] : ['cpp', 'ts'],
        frameworks: slug == 'title_1' ? ['arduino', 'android'] : ['arduino', 'next'],
    }

    return {
        props: {
            headerContent: headerProps,
            project
        }
    }
}

export default Project