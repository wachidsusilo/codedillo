import Link from 'next/link'
import Hamburger from '../general/Hamburger'
import { TranslateIcon } from '@heroicons/react/outline'
import useLocale from '../../hooks/UseLocale'
import useNavigation from '../../hooks/UseNavigation'

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
    const {navbarOpen, setNavbarOpen} = useNavigation()
    const {locale, setLocale} = useLocale()

    return (
        <header
            className={`absolute top-0 w-full block pt-2 h-20 bg-transparent transition-nav z-10 overflow-hidden 
            ${navbarOpen && '!bg-bg md:!bg-transparent !h-full md:!h-20 md:transition-none'}`}>
            <div
                className={`relative z-20 w-full h-full max-w-container mx-auto p-5.5 flex items-center md:justify-between
                ${navbarOpen && 'pt-28 flex-col md:!flex-row md:pt-5.5 !items-start md:!items-center'}`}>
                <Link href="/">
                    <a className="absolute top-6 left-5.5 md:relative md:top-0 md:left-0
                    flex cursor-pointer font-semibold">
                        <img className="h-5 w-8 object-contain" src="/assets/images/app_icon_white.png" alt=""/>
                        Codedillo
                    </a>
                </Link>
                <div className={`md:flex gap-x-8 items-end
                ${navbarOpen ? 'flex flex-col md:flex-row !items-start md:!items-end gap-y-9 md:gap-y-0 ml-8 md:ml-0' : 'hidden'}`}>
                    <Link href="/projects">
                        <a className="nav-link">
                            {content?.projects}
                            <span className="badge-green">17</span>
                        </a>
                    </Link>
                    <Link href="/articles">
                        <a
                            className="nav-link">
                            {content?.articles}
                            <span className="badge-red">24</span>
                        </a>
                    </Link>
                    <Link href="/services">
                        <a className="nav-link">{content?.services}</a>
                    </Link>
                    <Link href="/about">
                        <a className="nav-link">{content?.about}</a>
                    </Link>
                </div>
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
                        <TranslateIcon className="w-4 h-4"/> {locale.name}
                    </button>
                    <Link href="/contact">
                        <a
                            className={`contact-link shrink-on-click ${navbarOpen && 'justify-center w-full md:w-auto mx-auto md:mx-0'}`}
                            onClick={() => {
                                setNavbarOpen(!navbarOpen)
                            }}>
                            {content?.contact}
                        </a>
                    </Link>
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