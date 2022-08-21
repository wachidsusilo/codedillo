import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LocaleProvider } from '../hooks/UseLocale'
import RouteProgress from '../components/RouteProgress'
import { NavigationProvider } from '../hooks/UseNavigation'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <RouteProgress/>
            <LocaleProvider>
                <NavigationProvider>
                    <Component {...pageProps} />
                </NavigationProvider>
            </LocaleProvider>
        </>
    )
}

export default MyApp
