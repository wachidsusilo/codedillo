import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './constants'
import { get, getDatabase, ref, set, orderByChild, equalTo, query, push, onValue } from '@firebase/database'
import { isObject } from '../utils/utils'
import {
    getAuth,
    Unsubscribe,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as signOutUser,
    updatePassword as updateUserPassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from '@firebase/auth'
import { EditorData, Role, User } from '../typings'

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

export const onAuthChanged = (onChange: (isAuthenticated: boolean, id: string) => void): Unsubscribe => {
    return onAuthStateChanged(auth, (user) => {
        onChange(user !== null, user?.uid ?? '')
    })
}

export const signIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password)
}

export const signOut = async (): Promise<void> => {
    await signOutUser(auth)
}

export const reauthenticate = async (password: string): Promise<void> => {
    const email = auth.currentUser?.email
    if (!email) {
        throw new Error('auth/invalid-email')
    }
    await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(email, password))
}

export const updatePassword = async (newPassword: string): Promise<void> => {
    if (!auth.currentUser) {
        throw new Error('auth/not-authenticated')
    }
    await updateUserPassword(auth.currentUser, newPassword)
}

export const getUser = async (id: string): Promise<User | null> => {
    const user = (await get(ref(db, `users/${id}`))).val()
    if (!isObject(user)) {
        return null
    }
    return {
        id: id,
        name: user.name ?? '',
        bio: user.bio ?? '',
        profilePicture: user.profilePicture,
        dateCreated: user.dateCreated ?? Date.now(),
        dateModified: user.dateModified ?? Date.now(),
    }
}

export const onUserChanged = (id: string, onChange: (user: User) => void): Unsubscribe => {
    return onValue(ref(db, `users/${id}`), (snapshot) => {
        const user = snapshot.val()
        if (isObject(user)) {
            onChange({
                id: id,
                name: user.name ?? '',
                bio: user.bio ?? '',
                profilePicture: user.profilePicture,
                dateCreated: user.dateCreated ?? Date.now(),
                dateModified: user.dateModified ?? Date.now(),
            })
        }
    })
}

export const updateUser = async (user: User): Promise<void> => {
    const {id, name, bio, profilePicture, dateCreated} = user
    await set(ref(db, `users/${id}`),
        {
            id,
            name,
            bio,
            dateCreated,
            profilePicture: profilePicture ?? null,
            dateModified: Date.now()
        })
}

export const getRole = async (id: string): Promise<Role> => {
    const roles = (await get(ref(db, 'roles/admin'))).val()
    if (isObject(roles) && roles[id] == id) {
        return 'admin'
    }
    return 'creator'
}

export const getArticle = async (id: string): Promise<EditorData | null> => {
    const meta = (await get(ref(db, `articles/${id}`))).val()
    if (!isObject(meta)) {
        return null
    }

    const contents = (await get(ref(db, `data/articles/${id}`))).val()
    return {
        id,
        url: meta.url ?? '',
        type: meta.type ?? 'article',
        title: meta.title ?? 'Untitled',
        description: meta.description ?? '',
        thumbnails: meta.thumbnails ?? [],
        authorId: meta.authorId ?? 'Anonymous',
        tags: meta.tags ?? [],
        categories: meta.categories ?? [],
        dateCreated: meta.dateCreated ?? Date.now(),
        dateModified: meta.dateModified ?? Date.now(),
        published: false,
        contents
    }
}

export const updateArticle = async (article: EditorData): Promise<void> => {
    const {id, type, title, description, thumbnails, authorId, dateCreated, tags, categories, contents} = article
    const url = generateArticleUrl(id, title)
    await set(ref(db, `articles/${id}`), {
        id,
        type,
        title,
        description,
        thumbnails,
        authorId,
        dateCreated,
        tags,
        categories,
        url,
        dateModified: Date.now()
    })

    if (contents) {
        await set(ref(db, `data/articles/${id}`), contents)
    }

    await set(ref(db, `meta/articles/${id}`), {url})
}

export const removeArticle = async (id: string): Promise<void> => {
    await set(ref(db, `articles/${id}`), null)
    await set(ref(db, `data/articles/${id}`), null)
    await set(ref(db, `meta/articles/${id}`), null)
}

const generateArticleUrl = async (id: string, title: string) => {
    let originalUrl = title
        .replace(' ', '-')
        .replace(/[^a-zA-Z0-9-_]+/igm, '')
        .toLowerCase()

    let available = false
    let index = 2
    let currentUrl = originalUrl

    while (!available) {
        const user = (await get(query(ref(db, `articles`), orderByChild('url'), equalTo(currentUrl)))).val()
        if (!user || user.id === id) {
            available = true
            break
        }
        currentUrl = `${originalUrl}-${index}`
        index++
    }
    return currentUrl
}

export const generateArticleId = (): string | null => {
    return push(ref(db, 'articles')).key
}