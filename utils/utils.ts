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
