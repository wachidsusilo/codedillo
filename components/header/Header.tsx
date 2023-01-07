import Link from 'next/link'
import Hamburger from '../general/Hamburger'
import { LanguageIcon } from '@heroicons/react/24/outline'
import useLocale from '../../hooks/UseLocale'
import useNavigation from '../../hooks/UseNavigation'
import useAuth from '../../hooks/UseAuth'
import { useState } from 'react'

export interface HeaderStaticContent {
    projects: string,
    articles: string,
    services: string,
    about: string,
    contact: string
}

interface Props {
    content: HeaderStaticContent
}

const Header = ({content}: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const {navbarOpen, setNavbarOpen} = useNavigation()
    const {locale, setLocale} = useLocale()
    const {user} = useAuth()

    return (
        <header className={`absolute top-0 w-full block pt-2 h-20 bg-transparent transition-[height,background-color] z-10 
        ${navbarOpen && '!bg-bg md:!bg-transparent !h-full md:!h-20 md:transition-none'}`}>
            <div className={`relative z-20 w-full h-full max-w-container mx-auto p-5.5 flex items-center md:justify-between 
            ${navbarOpen && 'pt-28 flex-col md:!flex-row md:pt-5.5 !items-start md:!items-center'}`}>
                <Link href="/"
                      className="absolute top-6 left-5.5 md:relative md:top-0 md:left-0 flex cursor-pointer font-semibold">
                    <img className="h-5 w-8 object-contain"
                         src="/assets/images/app_icon_white.png"
                         alt=""/>
                    Codedillo
                </Link>
                <div className={`md:flex gap-x-8 items-end
                ${navbarOpen ? 'flex flex-col md:flex-row !items-start md:!items-end gap-y-9 md:gap-y-0 ml-8 md:ml-0' : 'hidden'}`}>
                    <Link href="/projects"
                          className="nav-link">
                        {content?.projects}
                        <span className="badge-green">
                            17
                        </span>
                    </Link>
                    <Link href="/articles"
                          className="nav-link">
                        {content?.articles}
                        <span className="badge-red">
                            24
                        </span>
                    </Link>
                    <Link href="/services"
                          className="nav-link">
                        {content?.services}
                    </Link>
                    <Link href="/about"
                          className="nav-link">
                        {content?.about}
                    </Link>
                    {
                        user && (
                            <>
                                <Link href="/account"
                                      className="nav-link md:hidden">
                                    Account
                                </Link>
                                <Link href="/dashboard"
                                      className="nav-link md:hidden">
                                    Dashboard
                                </Link>
                            </>
                        )
                    }
                </div>
                {
                    user && (
                        <div className={`absolute w-40 right-4 bottom-0 px-4 translate-y-full hidden md:flex flex-col gap-4 
                        rounded-lg bg-black/40 transition-[height,box-shadow] overflow-hidden 
                        ${navbarOpen ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.1)] h-[140px]' : 'shadow-none h-0'}`}>
                            <Link href="/account"
                                  className="nav-link mt-4">
                                My Account
                            </Link>
                            <Link href="/dashboard"
                                  className="nav-link">
                                Dashboard
                            </Link>
                            <button className="contact-link shrink-on-click justify-center w-full md:w-auto mx-auto md:mx-0"
                                    onClick={() => {
                                        if (loading) {
                                            setLoading(false)
                                            // TODO remove setLoading
                                            return
                                        }

                                        setLoading(true)
                                        // TODO Sign Out
                                    }}>
                                {
                                    loading ?
                                        <div className="s-5 rounded-full border-2 border-white/80 border-t-transparent animate-spin"></div>
                                        :
                                        'Logout'
                                }
                            </button>
                        </div>
                    )
                }
                <div className={`hidden md:flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 
                ${navbarOpen && '!flex w-full md:w-auto mt-16 md:mt-0'}`}>
                    <button
                        className="py-3 flex gap-x-2 items-center text-blue/90 hover:text-red/90 font-semibold transition text-sm"
                        onClick={() => {
                            if (locale.code === 'en') {
                                setLocale('id')
                            } else {
                                setLocale('en')
                            }
                        }}>
                        <LanguageIcon className="w-4 h-4"/> {locale.name}
                    </button>
                    {
                        user ?
                            <>
                                <button className={`contact-link md:hidden shrink-on-click 
                                ${navbarOpen && 'justify-center w-full md:w-auto mx-auto md:mx-0'}`}
                                        onClick={() => {
                                            if (loading) {
                                                setLoading(false)
                                                // TODO remove setLoading
                                                return
                                            }

                                            setLoading(true)
                                            // TODO Sign Out
                                        }}>
                                    {
                                        loading ?
                                            <div className="s-6 rounded-full border-2 border-white/80 border-t-transparent animate-spin"></div>
                                            :
                                            'Logout'
                                    }
                                </button>
                                <button className=""
                                        onClick={() => {
                                            setNavbarOpen(!navbarOpen)
                                        }}>
                                    <img className="s-8 hidden md:flex object-cover rounded-full"
                                         src="/assets/images/profile.jpg"
                                         alt="profile_picture" />
                                </button>
                            </>
                            :
                            <Link
                                href="/login"
                                className={`contact-link shrink-on-click ${navbarOpen && 'justify-center w-full md:w-auto mx-auto md:mx-0'}`}
                                onClick={() => {
                                    setNavbarOpen(!navbarOpen)
                                }}>
                                Login
                            </Link>
                    }
                </div>
                <Hamburger
                    className="absolute top-6 right-7 md:hidden"
                    active={navbarOpen}
                    onClick={() => {
                        setNavbarOpen(!navbarOpen)
                    }}/>
            </div>
        </header>
    )
}

export default Header