
import { useEffect, useRef } from 'react'
import {
    getFontWeightClass,
    getTextAlignmentClass,
    getTextColorClass,
    getTextSizeClass,
    getTextSpacingClass,
    parseList
} from '../utils'
import { CellData, CellType } from '../../../typings'

interface Props {
    className?: string
    editable: boolean
    type: CellType
    data: Array<CellData>

    onFocus?(): void

    onBlur?(data: Array<CellData>): void
}

const List = ({className = '', editable, type, onFocus, onBlur, data}: Props) => {
    const control = useRef<boolean>(false)
    const oListRef = useRef<HTMLOListElement>(null)
    const uListRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const list = oListRef.current ?? uListRef.current
        if (!list) {
            return
        }

        list.innerHTML = parseList(data, editable)

        list.onfocus = () => {
            if (onFocus) {
                onFocus()
            }
        }

        list.onblur = () => {
            if (onBlur) {
                onBlur(list.innerText.split('\n').map(v => ({text: v})))
            }
            document.getSelection()?.empty()
        }

        list.onkeydown = (e) => {
            if (e.key === 'Backspace' && !e.repeat && list.innerHTML.length === 1 && list.innerText === '\n') {
                e.preventDefault()
                e.stopPropagation()
            }

            if (e.key === 'Control' && !e.repeat) {
                control.current = true
            }

            if (control.current) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                    case 'i':
                    case 'u':
                        e.preventDefault()
                        break
                }
            }
        }

        const onKeyup = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                control.current = false
            }
        }
        window.addEventListener('keyup', onKeyup)

        return () => {
            window.removeEventListener('keyup', onKeyup)
        }
    }, [data, editable, oListRef.current, uListRef.current])

    if (type === 'list-number') {
        return (
            <ol ref={oListRef}
                className={`w-full h-auto pl-12 flex flex-col gap-1.5 list-decimal focus:outline-none [&>li]:pl-2
                ${getTextSizeClass(type)} ${getFontWeightClass(type)} ${getTextSpacingClass(type)} 
                ${getTextColorClass(type)} ${getTextAlignmentClass('left')} ${className}`}
                contentEditable={editable}
                spellCheck="false"
                aria-label={'list'}
                role={'list'}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}>
            </ol>
        )
    }

    return (
        <ul ref={oListRef}
            className={`w-full h-auto pl-12 flex flex-col gap-1.5 list-disc focus:outline-none [&>li]:pl-2
            ${getTextSizeClass(type)} ${getFontWeightClass(type)} ${getTextSpacingClass(type)} 
            ${getTextColorClass(type)} ${getTextAlignmentClass('left')} ${className}`}
            spellCheck="false"
            contentEditable={editable}
            aria-label={'list'}
            role={'list'}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}>
        </ul>
    )
}

export default List