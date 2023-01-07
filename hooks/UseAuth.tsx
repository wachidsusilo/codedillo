
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import {
    getRole,
    getUser, onAuthChanged, onUserChanged,
    reauthenticate,
    signIn,
    signOut,
    updatePassword,
    updateUser
} from '../firebase/firebase'
import { Role, User } from '../typings'

interface IAuth {
    user: User | null
    role: Role

    signIn(email: string, password: string): Promise<void>
    signOut(): Promise<void>
    reauthenticate(password: string): Promise<void>
    updatePassword(newPassword: string): Promise<void>
    getRole(id: string): Promise<Role>
    getUser(id: string): Promise<User | null>
    updateUser(user: User): Promise<void>
}

const AuthContext = createContext<IAuth>({
    user: null,
    role: 'creator',
    signIn,
    signOut,
    reauthenticate,
    updatePassword,
    getRole,
    getUser,
    updateUser
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User|null>(null)
    const [role, setRole] = useState<Role>('creator')

    useEffect(() => {
        return onAuthChanged((isAuthenticated, id) => {
            if (isAuthenticated) {
                getUser(id).then(setUser)
                getRole(id).then(setRole)
            } else {
                setUser(null)
                setRole('creator')
            }
        })
    }, [])

    useEffect(() => {
        if (!user) {
            return
        }
        return onUserChanged(user.id, (newUser) => {
            setUser(newUser)
        })
    }, [user])

    return (
        <AuthContext.Provider value={{
            user,
            role,
            signIn,
            signOut,
            reauthenticate,
            updatePassword,
            getRole,
            getUser,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}