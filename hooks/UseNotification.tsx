import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { v4 as UUID } from 'uuid'

export type NotificationType = 'info' | 'error' | 'warning'

interface Notification {
    id: string
    type: NotificationType
    title: string
    description: string
    duration?: number
    imageUrl?: string
    imagePortrait?: boolean

    onDismiss?(): void
}

interface INotification {
    notifications: Array<Notification>

    showNotification(
        type: NotificationType,
        title: string,
        description: string,
        duration?: number,
        imageUrl?: string,
        imagePortrait?: boolean,
        onDismiss?: () => void
    ): void

    removeNotification(id: string): void
}

const NotificationContext = createContext<INotification>({
    notifications: [],
    showNotification() {},
    removeNotification() {},
})

interface NotificationProviderProps {
    children: ReactNode
}

export const NotificationProvider = ({children}: NotificationProviderProps) => {
    const [notifications, setNotifications] = useState<Array<Notification>>([])

    const showNotification = useCallback((
        type: NotificationType,
        title: string,
        description: string,
        duration?: number,
        imageUrl?: string,
        imagePortrait?: boolean,
        onDismiss?: () => void
    ) => {
        setNotifications(notifications => {
            const newNotifications = [...notifications]
            while (newNotifications.length >= 5) {
                const onDismiss = newNotifications[0].onDismiss
                if (onDismiss) {
                    onDismiss()
                }
                newNotifications.splice(0, 1)
            }

            const id = UUID()
            newNotifications.push({id, type, title, description, duration, imageUrl, imagePortrait, onDismiss})
            if (duration) {
                window.setTimeout(() => {
                    removeNotification(id)
                }, duration * 1000)
            }
            return newNotifications
        })
    }, [])

    const removeNotification = useCallback((id: string) => {
        setNotifications(notifications => {
            const newNotifications = [...notifications]
            const index = newNotifications.findIndex(v => v.id === id)
            if (index !== -1) {
                const onDismiss = newNotifications[index].onDismiss
                if (onDismiss) {
                    onDismiss()
                }
                newNotifications.splice(index, 1)
                return newNotifications
            }
            return notifications
        })
    }, [])

    return (
        <NotificationContext.Provider value={{
            notifications,
            showNotification,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export default function useNotification() {
    return useContext(NotificationContext)
}