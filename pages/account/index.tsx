import Header, { HeaderStaticContent } from '../../components/header/Header'
import { GetStaticProps, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import { parseOrNull } from '../../utils/utils'
import useNavigation from '../../hooks/UseNavigation'
import { useEffect } from 'react'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import AccountSetting from '../../components/account/AccountSetting'

interface Props {
    headerContent: HeaderStaticContent
}

const Account: NextPage<Props> = ({headerContent}: Props) => {
    const {navbarOpen, setNavbarOpen} = useNavigation()

    useEffect(() => {
        setNavbarOpen(false)
    }, [])

    return (
        <div
            className={`relative w-screen h-screen scrollbar-thin-purple-dark md:!overflow-auto ${navbarOpen && '!overflow-hidden'}`}>
            <Head>
                <title>Account - Codedillo</title>
                <link rel="icon" type="image/png" href="/favicon.png"/>
            </Head>
            <Header content={headerContent}/>
            <main className="w-full min-h-[100vh] pb-16 sm:pb-32 max-w-full block scrollbar-thin-purple-dark">
                <div className="absolute max-w-full left-0 right-0 flex justify-center -z-10 !overflow-hidden">
                    <img
                        className="mx-auto min-w-[1250px] max-w-[1250px] w-full object-contain"
                        alt=""
                        src="/assets/images/splash.png"/>
                </div>
                <AccountSetting />
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

export default Account