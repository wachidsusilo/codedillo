import { AriaRole, useEffect, useRef } from 'react'
import { createFragment, parseContent } from '../utils'

interface Props {
    className?: string
    editable: boolean
    role: AriaRole
    value?: string
    placeholder?: string
    title?: string
    editMode?: 'click' | 'double-click'

    onFocus?(): void

    onBlur?(value: string): void
}

const TextBox = (
    {
        className,
        role,
        onFocus,
        onBlur,
        editable = false,
        value,
        placeholder,
        title,
        editMode = 'click',
    }: Props
) => {
    const ph = useRef<string>('')
    const inputRef = useRef<HTMLDivElement>(null)
    const isEditing = useRef<boolean>(false)

    useEffect(() => {
        const input = inputRef.current
        if (!input) {
            return
        }

        if (editable) {
            if (!value && placeholder && placeholder.length > 0) {
                ph.current = placeholder ?? ''
                input.style.color = 'rgba(255,255,255,0.6)'
                input.replaceChildren(ph.current)
            } else {
                input.replaceChildren(value ?? '')
                ph.current = ''
            }
        } else {
            input.replaceChildren(createFragment(parseContent(value)))
        }
    }, [placeholder, value, editable, inputRef.current])

    useEffect(() => {
        const input = inputRef.current
        if (!input) {
            return
        }

        input.onfocus = () => {
            if (ph.current.length > 0) {
                ph.current = ''
                input.style.removeProperty('color')
                input.replaceChildren()
            }
            if (onFocus) {
                onFocus()
            }
        }

        input.onblur = () => {
            if (!input.innerText && placeholder && placeholder.length > 0) {
                ph.current = placeholder ?? ''
                input.style.color = 'rgba(255,255,255,0.6)'
                input.replaceChildren(ph.current)
            }
            if (onBlur) {
                onBlur(input.innerText)
            }
            if (editMode === 'double-click') {
                isEditing.current = false
                input.contentEditable = 'false'
                input.style.cursor = 'pointer'
                if (!input.classList.contains('select-none')) {
                    input.classList.add('select-none')
                }
            }
            document.getSelection()?.empty()
        }

        input.onkeydown = (e) => {
            if (e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                    case 'i':
                    case 'u':
                        e.preventDefault()
                        break
                }
            }
        }

        if (editMode === 'double-click') {
            if (document.activeElement !== input) {
                input.style.cursor = 'pointer'
                if (!input.classList.contains('select-none')) {
                    input.classList.add('select-none')
                }
            }

            input.ondblclick = (e) => {
                console.log(isEditing.current)
                if (!isEditing.current) {
                    e.preventDefault()
                    isEditing.current = true
                    input.contentEditable = 'true'
                    input.style.cursor = 'auto'
                    input.focus()
                    input.classList.remove('select-none')
                }
            }
        } else {
            input.classList.remove('select-none')
        }
    }, [placeholder, editMode, inputRef.current])

    return (
        <div ref={inputRef}
             role={editable ? 'textbox' : role}
             spellCheck="false"
             className={`focus:outline-none ${className}`}
             contentEditable={editable && editMode === 'click'}
             aria-label={title}
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => e.preventDefault()}>
        </div>
    )
}

export default TextBox