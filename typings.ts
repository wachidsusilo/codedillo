import { Color } from './utils/color'
import { EditorView } from '@codemirror/view'
import { Compartment, StateEffectType } from '@codemirror/state'

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

export interface ProjectMeta {
    id: string
    title: string
    description: string
    imageUrls: Array<string>
    languages: Array<FrameworkType>
    frameworks: Array<LangType>
}

export interface Language {
    id: LangType
    name: string
    description: string
    iconUrl: string
    referenceUrl: string
    cite: string
    color: Color
}

export interface Framework {
    id: FrameworkType
    name: string
    description: string
    iconUrl: string
    referenceUrl: string
    cite: string
    color: Color
}

// ======= User =======

/**
 * @author Wachid Susilo
 * The role of a {@link User}.
 * This type is used to determine what a user capable of.
 */
export type Role = 'admin' | 'creator'

/**
 * @author Wachid Susilo
 * An interface to describe a user.
 * Every field can only be changed by admin, or it's corresponding user.
 *
 */
export interface User {
    /** The id of the user. This id is assigned by the database. */
    id: string

    /** The display name of the user. */
    name: string

    /** The description of the user. */
    bio: string

    /**
     * The profile picture of the user.
     * The image dimension is 256px by 256px and available in the form of {@link https://en.wikipedia.org/wiki/Base64 base64}. */
    profilePicture?: string

    /** The date when the user is created by an admin. */
    dateCreated: number

    /** The date when the user is modified, either by admin or by itself. */
    dateModified: number
}

// ======= Editor =======

/**
 * @author Wachid Susilo
 * The list of the {@link CellType}.
 */
export const cellTypes = ['title', 'subtitle-1', 'subtitle-2', 'paragraph', 'image', 'important', 'warning', 'tips', 'code', 'code-files', 'list-number', 'list-bullet'] as const

/**
 * @author Wachid Susilo
 * The list of the {@link FilterType}.
 */
export const filterTypes = ['all', 'image-only', 'code-only'] as const

/**
 * @author Wachid Susilo
 * The list of the {@link LangType}.
 */
export const langTypes = ['c', 'cpp', 'css', 'html', 'java', 'js', 'json', 'kt', 'md', 'php', 'py', 'rs', 'sql', 'txt', 'ts', 'xml'] as const

/**
 * @author Wachid Susilo
 * The list of the {@link FrameworkType}.
 */
export const frameworkTypes = ['android', 'arduino', 'next', 'react'] as const

/**
 * @author Wachid Susilo
 * The list of the {@link EditorType}.
 */
export const editorTypes = ['project', 'article'] as const

/**
 * @author Wachid Susilo
 * The type of the {@link Cell}.
 */
export type CellType = typeof cellTypes[number]

/**
 * @author Wachid Susilo
 * A type to be used to filter {@link CellType} list in {@link CellTypeSelector}.
 */
export type FilterType = typeof filterTypes[number]

/**
 * @author Wachid Susilo
 * A type to determine the programming language of a code sample.
 * This type is used by {@link import('../components/editor/cell/Code').Code Code}
 * and {@link import('../components/editor/cell/CodeFiles').CodeFiles CodeFiles} to apply syntax highlighting.
 */
export type LangType = typeof langTypes[number]

/**
 * @author Wachid Susilo
 * A type to be used to classify an Article or Project by its technology.
 */
export type FrameworkType = typeof frameworkTypes[number]

/**
 * @author Wachid Susilo
 * A type to be used to filter {@link CellType} list in {@link CellTypeSelector}.
 */
export type EditorType = typeof editorTypes[number]

/**
 * @author Wachid Susilo
 * A type to be used to align the content inside a {@link import('../components/editor/Cell').Cell Cell}.
 */
export type CellAlignment = 'left' | 'center' | 'right' | 'justify'

/**
 * @author Wachid Susilo
 * Used as a content of a {@link import('../components/editor/Cell').Cell Cell}
 * in the {@link import('../components/editor/Editor').Editor Editor}.
 * Please note that every field is optional.
 * This is because we only used the content according to the {@link CellType}.
 */
export interface CellData {
    /** Used by {@link import('../components/editor/cell/CodeFiles').CodeFiles CodeFiles} as a tab name. */
    name?: string

    /**
     * Used by {@link import('../components/editor/cell/TextBox').TextBox TextBox}
     * and {@link import('../components/editor/cell/List').List List} as it's text content,
     * or {@link import('../components/editor/cell/Image').Image Image} as it's description. */
    text?: string

    /** Used by {@link import('../components/editor/cell/Image').Image Image} as it's src property. */
    url?: string

    /**
     * Used by {@link import('../components/editor/cell/Code').Code Code}
     * and {@link import('../components/editor/cell/CodeFiles').CodeFiles CodeFiles} as the code sample. */
    code?: string

    /**
     * Used by {@link import('../components/editor/cell/Code').Code Code}
     * and {@link import('../components/editor/cell/CodeFiles').CodeFiles CodeFiles} as it's {@link LangType}. */
    lang?: LangType
}

export interface CellBlock {
    id: string
    type: CellType
    data: CellData | Array<CellData>
}

export interface CellSpacing {
    top?: number
    bottom?: number
    left?: number
    right?: number
    vertical?: number
    horizontal?: number
}

export interface EditorData {
    id: string
    url: string
    type: EditorType
    title: string
    description: string
    thumbnails: Array<string>
    authorId: string
    tags: Array<string>
    categories: Array<string>
    dateCreated: Date
    dateModified: Date
    published: boolean
    contents?: Array<CellBlock>
}

export interface CodeTab {
    view: EditorView | null
    root: HTMLDivElement
    data: CellData
    indentSpaces: number
    autoDetect: boolean
    compartment: {
        lang: Compartment,
        completion: Compartment,
        indent: Compartment,
        gutter: Compartment
    },
    effect: {
        lang: StateEffectType<string>
    }
}