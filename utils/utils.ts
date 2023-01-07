import { CSSProperties } from 'react'

export const parseOrNull = (json: string | null | undefined) => {
    if (!json) return null
    try {
        return JSON.parse(json)
    } catch (e) {
        return null
    }
}

export const midIntOf = (value: number) => {
    return Math.round(value + 0.5)
}

const getTransitionDuration = (style: CSSProperties): number | undefined => {
    const duration = parseFloat(style.transitionDuration ?? '')
    const isMilliseconds = style.transitionDuration?.toLowerCase()?.includes('ms')
    if (!duration || !isMilliseconds) {
        return undefined
    }
    return duration * (isMilliseconds ? 1000 : 1)
}

export const toTitleCase = (text: string): string => {
    const articles = ['a', 'an', 'the'];
    const conjunctions = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'];
    const prepositions = [
        'with', 'at', 'from', 'into','upon', 'of', 'to', 'in', 'for',
        'on', 'by', 'like', 'over', 'plus', 'but', 'up', 'down', 'off', 'near'
    ];

    // The list of spacial characters can be tweaked here
    const replaceCharsWithSpace = (str: string) => str.replace(/[^0-9a-z&/\\]/gi, ' ').replace(/(\s\s+)/gi, ' ');
    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);
    const normalizeStr = (str: string) => str.toLowerCase().trim();
    const shouldCapitalize = (word: string, fullWordList: Array<String>, posWithinStr: number) => {
        if ((posWithinStr == 0) || (posWithinStr == fullWordList.length - 1)) {
            return true;
        }

        return !(articles.includes(word) || conjunctions.includes(word) || prepositions.includes(word));
    }

    text = replaceCharsWithSpace(text);
    text = normalizeStr(text);

    let words = text.split(' ');
    if (words.length <= 2) { // Strings less than 3 words long should always have first words capitalized
        words = words.map(w => capitalizeFirstLetter(w));
    }
    else {
        for (let i = 0; i < words.length; i++) {
            words[i] = (shouldCapitalize(words[i], words, i) ? capitalizeFirstLetter(words[i]) : words[i]);
        }
    }

    return words.join(' ');
}

export const isObject = (obj: any) => {
    return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export const move = (arr: Array<any>, from: number, to: number) => {
    arr.splice(to, 0, ...arr.splice(from, 1))
    return arr
}

export const filePicker = (accepts: Array<string>, multiple: boolean, onFiles: (files: FileList) => void) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accepts.join()
    input.multiple = multiple
    input.style.display = 'hidden'

    input.onchange = () => {
        if (input.files) {
            onFiles(input.files)
        }
    }

    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
}

export const isValidFiles = (files: FileList, mimeTypes: Array<string>) => {
    mimeTypes = mimeTypes.map(v => v.toLowerCase())
    for (let i = 0; i < files.length; i++) {
        if (!mimeTypes.includes(files[i].type.toLowerCase())) {
            return false
        }
    }
    return true
}

export const supportedImageTypes = ['image/jpg', 'image/jpeg', 'image/png']

export const isValidImage = (files: FileList) => {
    return isValidFiles(files, supportedImageTypes)
}

export const isValidEmail = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}

export const parseNumber = (obj: any, defaultValue: number) => {
    if (typeof obj === 'number') {
        return obj
    }

    if (obj && typeof obj === 'string') {
        const value = parseFloat(obj)
        if (!isNaN(value) && isFinite(value)) {
            return value
        }
    }

    return defaultValue
}
