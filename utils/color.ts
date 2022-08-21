
export type Color = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'magenta' | 'azure'

export const getColor = (color: Color, alpha: number): string => {
    switch (color) {
        case 'red':
            return `rgba(255,97,97,${alpha})`
        case 'green':
            return `rgba(89,212,153,${alpha})`
        case 'blue':
            return `rgba(87,193,255,${alpha})`
        case 'yellow':
            return `rgba(255,197,51,${alpha})`
        case 'purple':
            return `rgba(164,133,255,${alpha})`
        case 'magenta':
            return `rgba(207,24,117,${alpha})`
        case 'azure':
            return `rgba(6,154,243,${alpha})`
        default:
            return `rgba(255,255,255,${alpha})`
    }
}
