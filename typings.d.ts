import { Color } from './utils/color'

export interface ArticleMeta {
    id: string
    title: string
    description: string
    author: string
    profilePictureUrl: string
    imageUrl: string
    iconUrl: string
    reads: number
    comments: number
}

export type LanguageId = 'ts' | 'kt' | 'cpp'
export type FrameworkId = 'android' | 'arduino' | 'next' | 'react'

export interface ProjectMeta {
    id: string
    title: string
    description: string
    imageUrls: Array<string>
    languages: Array<LanguageId>
    frameworks: Array<FrameworkId>
}

export interface Language {
    id: LanguageId
    name: string
    description: string
    iconUrl: string
    referenceUrl: string
    cite: string
    color: Color
}

export interface Framework {
    id: FrameworkId
    name: string
    description: string
    iconUrl: string
    referenceUrl: string
    cite: string
    color: Color
}
