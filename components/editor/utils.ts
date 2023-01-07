
import { isObject } from '../../utils/utils'
import { AriaRole } from 'react'
import { Extension } from '@codemirror/state'
import { autocompletion, completeAnyWord, CompletionResult, CompletionSource } from '@codemirror/autocomplete'
import { javascript, snippets } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { html, htmlCompletionSource } from '@codemirror/lang-html'
import { cpp } from '@codemirror/lang-cpp'
import { css, cssCompletionSource } from '@codemirror/lang-css'
import { java } from '@codemirror/lang-java'
import { markdown } from '@codemirror/lang-markdown'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { xml } from '@codemirror/lang-xml'
import { indentUnit } from '@codemirror/language'
import {
    CellAlignment,
    CellBlock,
    CellData, CellType, cellTypes,
    CodeTab,
    EditorData,
    EditorType, editorTypes,
    FilterType,
    LangType, langTypes
} from '../../typings'

export const isCellType = (obj: any): obj is CellType => {
    return typeof obj === 'string' && cellTypes.includes(obj as CellType)
}

export const isLangType = (obj: any): obj is LangType => {
    return typeof obj === 'string' && langTypes.includes(obj as LangType)
}

export const isEditorType = (obj: any): obj is EditorType => {
    return typeof obj === 'string' && editorTypes.includes(obj as EditorType)
}

export const isCellData = (data: any): data is CellData => {
    return isObject(data)
        && (data.name === undefined || typeof data.name === 'string')
        && (data.text === undefined || typeof data.text === 'string')
        && (data.url === undefined || typeof data.url === 'string')
        && (data.code === undefined || typeof data.code === 'string')
        && (data.lang === undefined || isLangType(data.lang))
}

export const isCellArray = (data: any): data is Array<CellData> => {
    return Array.isArray(data) && data.every((v: any) => isCellData(v))
}

export const isCellBlock = (obj: any): obj is CellBlock => {
    return isObject(obj)
        && typeof obj.id === 'string'
        && isCellType(obj.type)
        && (isCellData(obj) || isCellArray(obj))
}

export const isEditorData = (obj: any): obj is EditorData => {
    return isObject(obj)
        && typeof obj.id === 'string'
        && isEditorType(obj.type)
        && typeof obj.authorId === 'string'
        && typeof obj.title === 'string'
        && typeof obj.description === 'string'
        && Array.isArray(obj.tags) && obj.tags.every((v: any) => typeof v === 'string')
        && Array.isArray(obj.categories) && obj.tags.every((v: any) => typeof v === 'string')
        && obj.dateCreated.toString() === '[object Date]'
        && obj.dateModified.toString() === '[object Date]'
}

export const getLanguageType = (langId: string): LangType => {
    return langTypes.find(v => v === langId) ?? 'txt'
}

export const parseContent = (content?: string) => {
    if (!content) {
        return ''
    }
    return content
        .replace(/\*\*\*(.*)\*\*\*/gim, '<b><i>$1</i></b>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/`(.*)`/gim, '<code class="bg-white/20 rounded px-1 py-0.5">$1</code>')
        .replace(/\[(.*)]\((.*)\)/gim, '<a href="$1" class="text-blue hover:underline"><b>$2</b></a>')
}

export const parseList = (data: any, editable: boolean) => {
    if (!isCellArray(data)) {
        return '<li></li>'
    }
    return data.map(v => `<li>${editable ? (v.text ?? '') : parseContent(v.text)}</li>`).join('')
}

export const createFragment = (htmlString: string) => {
    return document.createRange().createContextualFragment(htmlString)
}

export const getAriaRole = (type: CellType): AriaRole => {
    switch (type) {
        case 'title':
        case 'subtitle-1':
        case 'subtitle-2':
        case 'code-files':
        case 'code':
            return 'heading'
        case 'list-number':
        case 'list-bullet':
            return 'listitem'
        default:
            return 'article'
    }
}

export const getFontWeightClass = (type: CellType) => {
    switch (type) {
        case 'title':
        case 'subtitle-1':
        case 'subtitle-2':
            return 'font-semibold'
        default:
            return 'font-normal'
    }
}

export const getTextAlignmentClass = (alignment: CellAlignment) => {
    switch (alignment) {
        case 'left':
            return 'text-left'
        case 'center':
            return 'text-center'
        case 'right':
            return 'text-right'
        default:
            return 'text-justify'
    }
}

export const getTextSizeClass = (type: CellType) => {
    switch (type) {
        case 'title':
            return 'text-[32px]'
        case 'subtitle-1':
            return 'text-[24px]'
        case 'subtitle-2':
            return 'text-[20px]'
        case 'paragraph':
        case 'list-number':
        case 'list-bullet':
            return 'text-[16px]'
        default:
            return 'text-[14px]'
    }
}

export const getTextSpacingClass = (type: CellType) => {
    switch (type) {
        case 'paragraph':
        case 'tips':
        case 'warning':
        case 'important':
            return 'tracking-wide leading-7'
        default:
            return 'tracking-normal leading-normal'
    }
}

export const getTextColorClass = (type: CellType) => {
    switch (type) {
        case 'tips':
            return 'text-blue'
        case 'warning':
            return 'text-yellow'
        case 'important':
            return 'text-red'
        default:
            return 'text-white'
    }
}

export const getBackgroundColorClass = (type: CellType) => {
    switch (type) {
        case 'tips':
            return 'bg-blue-transparent'
        case 'warning':
            return 'bg-yellow-transparent'
        case 'important':
            return 'bg-red-transparent'
        default:
            return 'bg-transparent'
    }
}

export const getLanguageExtension = (type: LangType) => {
    let lang: Extension = []
    const completionSources: Array<CompletionSource> = [context => completeAnyWord(context)]

    switch (type) {
        case 'ts':
            lang = javascript({jsx: true, typescript: true})
            completionSources.push(context => {
                const result: CompletionResult = {
                    from: context.state.wordAt(context.pos)?.from ?? context.pos,
                    options: snippets
                }
                return result
            })
            break
        case 'js':
            lang = javascript({jsx: true})
            completionSources.push(context => {
                const result: CompletionResult = {
                    from: context.state.wordAt(context.pos)?.from ?? context.pos,
                    options: snippets
                }
                return result
            })
            break
        case 'json':
            lang = json()
            break
        case 'html':
            lang = html({matchClosingTags: true, autoCloseTags: true})
            completionSources.push(htmlCompletionSource)
            break
        case 'c':
        case 'cpp':
            lang = cpp()
            break
        case 'css':
            lang = css()
            completionSources.push(cssCompletionSource)
            break
        case 'java':
        case 'kt':
            lang = java()
            break
        case 'md':
            lang = markdown()
            break
        case 'php':
            lang = php()
            break
        case 'py':
            lang = python()
            break
        case 'rs':
            lang = rust()
            break
        case 'sql':
            lang = sql()
            break
        case 'xml':
            lang = xml()
            break
    }

    return {lang, completionSources}
}

export const getLanguageName = (langId: LangType) => {
    switch (langId) {
        case 'c':
            return 'C'
        case 'cpp':
            return 'C++'
        case 'css':
            return 'CSS'
        case 'html':
            return 'HTML'
        case 'java':
            return 'Java'
        case 'js':
            return 'Javascript'
        case 'json':
            return 'JSON'
        case 'kt':
            return 'Kotlin'
        case 'md':
            return 'Markdown'
        case 'php':
            return 'PHP'
        case 'py':
            return 'Python'
        case 'rs':
            return 'Rust'
        case 'sql':
            return 'SQL'
        case 'txt':
            return 'Text'
        case 'ts':
            return 'Typescript'
        case 'xml':
            return 'XML'
    }
}

export const getCellTypeName = (type: CellType) => {
    switch (type) {
        case 'title':
            return 'Title'
        case 'subtitle-1':
            return 'Subtitle 1'
        case 'subtitle-2':
            return 'Subtitle 2'
        case 'paragraph':
            return 'Paragraph'
        case 'tips':
            return 'Tips'
        case 'warning':
            return 'Warning'
        case 'important':
            return 'Important'
        case 'image':
            return 'Image'
        case 'list-number':
            return 'List Number'
        case 'list-bullet':
            return 'List Bullet'
        case 'code-files':
            return 'Code Files'
        case 'code':
            return 'Code'
        default:
            return 'Unknown'
    }
}

export const getFilterType = (type: CellType, data?: CellData | Array<CellData>): FilterType => {
    if (type === 'image' && isCellArray(data) && data.length > 0) {
        return 'image-only'
    }

    if (type === 'code-files' && isCellArray(data) && data.length > 1) {
        return 'code-only'
    }

    return 'all'
}

export const updateLang = (tab: CodeTab, langId: string, forceUpdate: boolean = false) => {
    if (tab.data.lang === langId && !forceUpdate) return
    tab.data.lang = getLanguageType(langId)
    const newLanguage = getLanguageExtension(tab.data.lang)

    tab.view?.dispatch({
        effects: [
            tab.compartment.lang.reconfigure(newLanguage.lang),
            tab.compartment.completion.reconfigure(autocompletion({override: newLanguage.completionSources})),
            tab.effect.lang.of(langId)
        ]
    })
}

export const updateIndentSpaces = (tab: CodeTab) => {
    tab.view?.dispatch({
        effects: [
            tab.compartment.indent.reconfigure(indentUnit.of(' '.repeat(tab.indentSpaces)))
        ]
    })
}

export const updateDoc = (tab: CodeTab, editable: boolean) => {
    tab.view?.dispatch({
        changes: {
            from: 0,
            to: tab.view?.state.doc.length,
            insert: editable ? (tab.data.code ?? '') : '\n' + (tab.data.code?.trim() ?? '') + '\n'
        }
    })
}

const getCellTypeCategory = (type: CellType) => {
    switch (type) {
        case 'title':
        case 'subtitle-1':
        case 'subtitle-2':
        case 'paragraph':
        case 'tips':
        case 'warning':
        case 'important':
            return 'text'
        case 'list-number':
        case 'list-bullet':
            return 'text-list'
        case 'code-files':
            return 'code-list'
        case 'code':
            return 'code'
        default:
            return 'unknown'
    }
}

const textToCode = (data: CellData): CellData => {
    return {
        name: 'untitled',
        code: data.text,
        lang: 'txt'
    }
}

const textListToCode = (data: Array<CellData>): CellData => {
    return {
        name: 'untitled',
        code: data.map(v => v.text).filter(v => v).join('\n'),
        lang: 'txt'
    }
}

export const reassignType = (content: CellBlock, type: CellType) => {
    if (content.type === type) {
        return
    }

    if (type === 'image') {
        content.data = []
    }

    const from = getCellTypeCategory(content.type)
    const to = getCellTypeCategory(type)

    if (from === to) {
        return
    }

    if (from === 'text' && to === 'text-list') {
        if (isCellData(content.data)) {
            content.data = content.data.text?.split('\n').map(text => ({text})) ?? []
        }
        return
    }

    if (from === 'text' && to === 'code') {
        if (isCellData(content.data)) {
            content.data = textToCode(content.data)
        }
        return
    }

    if (from === 'text' && to === 'code-list') {
        if (isCellData(content.data)) {
            content.data = [textToCode(content.data)]
        }
        return
    }

    if (from === 'text-list' && to === 'text') {
        if (isCellArray(content.data)) {
            content.data = {text: content.data.map(v => v.text).filter(v => v).join('\n')}
        }
        return
    }

    if (from === 'text-list' && to === 'code') {
        if (isCellArray(content.data)) {
            content.data = textListToCode(content.data)
        }
        return
    }

    if (from === 'text-list' && to === 'code-list') {
        if (isCellArray(content.data)) {
            content.data = [textListToCode(content.data)]
        }
        return
    }

    if (from === 'code' && to === 'text') {
        if (isCellData(content.data)) {
            content.data = {text: content.data.code}
        }
    }

    if (from === 'code' && to === 'text-list') {
        if (isCellData(content.data)) {
            content.data = content.data.code?.split('\n').map(text => ({text})) ?? []
        }
    }

    if (from === 'code' && to === 'code-list') {
        if (isCellData(content.data)) {
            content.data = [content.data]
        }
    }

    if (from === 'code-list' && to === 'text') {
        if (isCellArray(content.data)) {
            content.data = {text: content.data.map(v => v.code).filter(v => v).join('\n')}
        }
        return
    }

    if (from === 'code-list' && to === 'text-list') {
        if (isCellArray(content.data)) {
            content.data = content.data.map(v => v.code).filter(v => v).join('\n').split('\n').map(text => ({text}))
        }
        return
    }

    if (from === 'code-list' && to === 'code') {
        if (isCellArray(content.data)) {
            content.data = content.data[0] ?? {}
        }
        return
    }
}