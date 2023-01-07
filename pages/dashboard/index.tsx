import Header, { HeaderStaticContent } from '../../components/header/Header'
import { GetStaticProps, NextPage } from 'next'
import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import SideBar, { isBoardType } from '../../components/dashboard/SideBar'
import Projects from '../../components/dashboard/Projects'
import { PaginationProvider } from '../../hooks/UsePagination'
import Articles from '../../components/dashboard/Articles'
import { useRouter } from 'next/router'

interface Props {
    headerContent: HeaderStaticContent
}

const Dashboard: NextPage<Props> = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()
    const {query: {board}} = useRouter()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto 
        ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>Account - Codedillo</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full min-h-[100vh] pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <div className="absolute max-w-full -top-32 left-0 right-0 flex justify-center -z-10 !overflow-hidden">
                    <img
                        className="mx-auto min-w-[1250px] max-w-[1250px] w-full object-contain"
                        alt=""
                        src="/assets/images/splash.png"/>
                </div>
                <div className="w-[calc(100%-2rem)] mt-24 mx-auto max-w-container flex">
                    <SideBar className="shrink-0 mb-auto" />
                    <PaginationProvider>
                        <Projects className={isBoardType(board) && board === 'projects' ? 'flex' : 'hidden' } />
                    </PaginationProvider>
                    <PaginationProvider >
                        <Articles className={isBoardType(board) && board === 'articles' ? 'flex' : 'hidden' } />
                    </PaginationProvider>
                </div>
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

export default Dashboard