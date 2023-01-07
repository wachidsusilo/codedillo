import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LocaleProvider } from '../hooks/UseLocale'
import RouteProgress from '../components/RouteProgress'
import { NavigationProvider } from '../hooks/UseNavigation'
import { AuthProvider } from '../hooks/UseAuth'
import Snackbar from '../components/Snackbar'
import { NotificationProvider } from '../hooks/UseNotification'

function App({Component, pageProps}: AppProps) {
    return (
        <NotificationProvider>
            <RouteProgress/>
            <LocaleProvider>
                <AuthProvider>
                    <NavigationProvider>
                        <Component {...pageProps} />
                    </NavigationProvider>
                </AuthProvider>
            </LocaleProvider>
            <Snackbar/>
        </NotificationProvider>
    )
}

export default App
