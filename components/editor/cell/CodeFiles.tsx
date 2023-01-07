
import {
    getAriaRole,
    getFontWeightClass,
    getLanguageName,
    getTextAlignmentClass,
    getTextSizeClass,
    getTextSpacingClass, updateDoc, updateIndentSpaces, updateLang
} from '../utils'
import { EditorView, lineNumbers } from '@codemirror/view'
import { Compartment, EditorState, StateEffect, StateField } from '@codemirror/state'
import { autocompletion, completeAnyWord } from '@codemirror/autocomplete'
import { indentUnit } from '@codemirror/language'
import { useCallback, useEffect, useRef, useState } from 'react'
import { leftGutter, lineGutter, oneDark, setup, spaceGutter } from '../setup'
import { move } from '../../../utils/utils'
import TextBox from './TextBox'
import { DocumentDuplicateIcon, HashtagIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import LanguageSelector from './LanguageSelector'
import CellTooltip from './CellTooltip'
import useNavigation from '../../../hooks/UseNavigation'
import { v4 as UUID } from 'uuid'
import useNotification from '../../../hooks/UseNotification'
import { CellData, CellType, CodeTab } from '../../../typings'

interface DragTab {
    xOrigin: number
    lOrigin: number
    rOrigin: number
    index: number
    position: number
}

interface Props {
    className?: string
    type: CellType
    editable: boolean
    data: Array<CellData>

    onFocus?(): void

    onBlur?(data: Array<CellData>): void
}

const CodeFiles = ({className = '', type, editable, data, onFocus, onBlur}: Props) => {
    const [currentTab, setCurrentTab] = useState<number>(0)
    const [cursorPosition, setCursorPosition] = useState<{ col: number, row: number }>({col: 0, row: 0})
    const [tabs, setTabs] = useState<Array<CodeTab>>([])
    const [openLanguage, setOpenLanguage] = useState<boolean>(false)
    const [dragging, setDragging] = useState<boolean>(false)
    const [rerender, setRerender] = useState<boolean>(false)
    const editorRef = useRef<HTMLDivElement>(null)
    const showLineNumbers = useRef<boolean>(false)
    const autoDetectTimeout = useRef<number>(0)
    const dispatchBlur = useRef<(() => void) | null>(null)
    const dragTab = useRef<DragTab | null>(null)
    const dragTimeout = useRef<number>(0)
    const tabContainer = useRef<HTMLDivElement>(null)
    const langWorker = useRef<Worker | undefined>()
    const {registerClickConsumer, unregisterClickConsumer, clickAnywhere} = useNavigation()
    const id = useRef<string>(UUID())
    const {showNotification} = useNotification()

    const refresh = () => {
        setRerender(!rerender)
    }

    dispatchBlur.current = () => {
        if (onBlur) {
            onBlur(tabs.map(v => v.data))
        }
    }

    const updateGutter = useCallback((tab: CodeTab, show: boolean) => {
        tab.view?.dispatch({
            effects: [
                tab.compartment.gutter.reconfigure(
                    show ?
                        [
                            leftGutter(2),
                            lineNumbers(),
                            lineGutter(2),
                            spaceGutter(1)
                        ]
                        :
                        spaceGutter(3)
                )
            ]
        })
    }, [])

    const createTab = useCallback((data: CellData, editable: boolean, guessLangWorker?: Worker) => {
        const tab: CodeTab = {
            root: document.createElement('div'),
            view: null,
            data: data,
            indentSpaces: 4,
            autoDetect: !data.lang || data.lang === 'txt',
            compartment: {
                lang: new Compartment(),
                completion: new Compartment(),
                indent: new Compartment(),
                gutter: new Compartment()
            },
            effect: {
                lang: StateEffect.define<string>()
            }
        }

        const extensions = [
            setup(editable),
            oneDark(editable, false)
        ]

        if (editable) {
            const detectLanguage = (doc: string) => new Promise<string>(resolve => {
                if (guessLangWorker) {
                    guessLangWorker.onmessage = (e) => {
                        resolve(e.data)
                    }
                    guessLangWorker.postMessage(doc)
                }
            })

            const onChange = EditorView.updateListener.of((v) => {
                const line = v.state.doc.lineAt(v.state.selection.main.head)
                const row = v.state.selection.main.head - line.from

                setCursorPosition(pos => {
                    if (pos.col !== line.number || pos.row !== row) {
                        return {
                            col: line.number,
                            row: row
                        }
                    }
                    return pos
                })

                if (v.docChanged && tab.autoDetect) {
                    if (autoDetectTimeout.current) {
                        clearTimeout(autoDetectTimeout.current)
                    }

                    autoDetectTimeout.current = window.setTimeout(() => {
                        detectLanguage(v.state.doc.toJSON().join('\n'))
                            .then(langId => {
                                updateLang(tab, langId)
                                refresh()
                            })
                    }, 1000)
                }
            })

            const languageField = StateField.define<string>({
                create: () => '',
                update: (value, tr) => {
                    for (let e of tr.effects) if (e.is(tab.effect.lang)) value = e.value
                    return value
                }
            })

            extensions.push(onChange)
            extensions.push(tab.compartment.indent.of([indentUnit.of(' '.repeat(tab.indentSpaces))]))
            extensions.push(tab.compartment.lang.of([]))
            extensions.push(tab.compartment.completion.of(autocompletion({override: [context => completeAnyWord(context)]})))
            extensions.push(languageField)
        } else {
            extensions.push(tab.compartment.lang.of([]))
            extensions.push(tab.compartment.gutter.of([spaceGutter(3)]))
            extensions.push(EditorState.readOnly.of(true))
            extensions.push(EditorView.editable.of(false))
        }

        tab.root.className = 'hidden w-full h-auto [&>div]:!outline-none [&>div>div]:scrollbar-thin-purple-dark'
        tab.view = new EditorView({
            state: EditorState.create({extensions}),
            parent: tab.root
        })

        if (editable) {
            tab.view.contentDOM.addEventListener('focus', () => {
                if (onFocus) onFocus()
            })

            tab.view.contentDOM.addEventListener('blur', () => {
                if (onBlur) {
                    tab.data.code = tab.view?.state.doc.toJSON().join('\n') ?? ''
                    if (dispatchBlur.current) {
                        dispatchBlur.current()
                    }
                }
            })
        } else {
            updateGutter(tab, showLineNumbers.current)
        }

        updateLang(tab, tab.data.lang ?? 'txt', true)
        updateDoc(tab, editable)

        return tab
    }, [])

    const showTab = useCallback((tabIdx: number) => {
        setTabs(tabs => {
            for (let i = 0; i < tabs.length; i++) {
                const tab = tabs[i]
                if (i === tabIdx) {
                    tab.root.classList.remove('hidden')
                } else {
                    if (!tab.root.classList.contains('hidden')) {
                        tab.root.classList.add('hidden')
                    }
                }
            }
            return tabs
        })
    }, [])

    useEffect(() => {
        const editor = editorRef.current
        if (!editor) {
            return
        }

        const guessLangWorker = editable ? new Worker('/guesslang/worker.js') : undefined
        for (const tab of tabs) {
            tab.view?.destroy()
        }

        const newTabs: Array<CodeTab> = []
        editor.replaceChildren()

        for (const cell of data) {
            const tab = createTab(cell, editable, guessLangWorker)
            newTabs.push(tab)
            editor.appendChild(tab.root)
        }

        setTabs(newTabs)
        showTab(currentTab)
    }, [editable])

    useEffect(() => {
        const editor = editorRef.current
        if (!editor) {
            return
        }

        langWorker.current = editable ? new Worker('/guesslang/worker.js') : undefined
        setTabs(tabs => {
            const newTabs: Array<CodeTab> = []
            for (const cell of data) {
                const tab = tabs.find(v => v.data.name === cell.name)
                if (tab) {
                    tab.data = cell
                    updateLang(tab, cell.lang ?? 'txt', true)
                    updateDoc(tab, editable)
                    newTabs.push(tab)
                } else {
                    newTabs.push(createTab(cell, editable, langWorker.current))
                }
            }
            return newTabs
        })
        showTab(currentTab)
    }, [data])

    useEffect(() => {
        const container = tabContainer.current
        if (!container || !editable) {
            return
        }

        const getChildrenRects = () => {
            const rects: Array<DOMRect> = []
            for (let i = 0; i < container.children.length - 1; i++) {
                rects.push(container.children[i].getBoundingClientRect())
            }
            return rects
        }

        const getLastChildRect = () => {
            return container.children[container.children.length - 1].getBoundingClientRect()
        }

        const getChildElement = (index: number) => {
            return (container.children[index] as HTMLDivElement)
        }

        const rearrangeChild = (drag: DragTab) => {
            const childrenRects = getChildrenRects()
            const rect = childrenRects[drag.index]
            const halfWidth = rect.width / 2

            for (let i = 0; i < childrenRects.length; i++) {
                if (i === drag.index) {
                    continue
                }

                const sibling = childrenRects[i]

                if (rect.left > sibling.left && rect.left < sibling.right) {
                    if (rect.left - sibling.right < -halfWidth) {
                        if (i > drag.index) {
                            getChildElement(i).style.transform = ''
                            drag.position = i - 1
                        } else {
                            getChildElement(i).style.transform = `translate(${rect.width}px)`
                            drag.position = i
                        }
                        return
                    }
                }

                if (rect.right > sibling.left && rect.right < sibling.right) {
                    if (sibling.right - rect.right < halfWidth) {
                        if (i > drag.index) {
                            getChildElement(i).style.transform = `translate(${-rect.width}px)`
                            drag.position = i
                        } else {
                            getChildElement(i).style.transform = ''
                            drag.position = i + 1
                        }
                        return
                    }
                }
            }
        }

        const onUp = () => {
            const drag = dragTab.current
            if (drag) {
                dragTab.current = null
                getChildElement(drag.index).style.zIndex = ''

                setCurrentTab(drag.position)
                setTabs(tabs => {
                    if (drag.index === drag.position) {
                        for (let i = 0; i < container.children.length - 1; i++) {
                            (container.children[i] as HTMLDivElement).style.transform = ''
                        }
                        return tabs
                    }
                    return move([...tabs], drag.index, drag.position)
                })

                showTab(drag.position)
                window.setTimeout(() => {
                    setDragging(false)
                }, 100)
            }
            if (dragTimeout.current > 0) {
                window.clearTimeout(dragTimeout.current)
                dragTimeout.current = 0
            }
        }

        const onMove = (e: MouseEvent) => {
            const drag = dragTab.current
            if (drag) {
                const containerRect = container.getBoundingClientRect()
                const buttonRect = getLastChildRect()

                const delta = e.clientX - drag.xOrigin
                let distance: number

                if (drag.lOrigin + delta <= containerRect.x) {
                    distance = containerRect.x - drag.lOrigin
                } else if (drag.rOrigin + delta >= buttonRect.x) {
                    distance = buttonRect.x - drag.rOrigin
                } else {
                    distance = delta
                }

                getChildElement(drag.index).style.transform = `translate(${distance}px)`
                rearrangeChild(drag)
            }
        }

        window.addEventListener('mouseup', onUp)
        window.addEventListener('mousemove', onMove)

        return () => {
            window.removeEventListener('mouseup', onUp)
            window.removeEventListener('mousemove', onMove)
        }
    }, [editable])

    useEffect(() => {
        const container = tabContainer.current
        if (!container) {
            return
        }

        for (let i = 0; i < container.children.length - 1; i++) {
            (container.children[i] as HTMLDivElement).style.transform = ''
        }
    }, [tabs])

    useEffect(() => {
        registerClickConsumer(id.current, () => {
            setOpenLanguage(false)
        })

        return () => {
            unregisterClickConsumer(id.current)
        }
    }, [])

    return (
        <div className={`bg-[#110d17] ${editable ? '' : 'rounded-lg shadow-[0_0_0_1px_#27272a]'} ${className}`}>
            <div ref={tabContainer}
                 className="w-full shadow-[0_1px_0_0_#27272a] bg-bg flex text-[14px] rounded-tl-lg rounded-tr-lg select-none
                 overflow-x-auto scrollbar-thin-purple-dark">
                {
                    tabs.map((value, index) => (
                        <div key={index}
                             className={`relative h-12 px-6 flex items-center transition-[color] ${editable ? '' : 'cursor-pointer'} 
                             ${dragTab.current && dragTab.current?.index === index ? 'bg-[#110d17]' : editable ? 'bg-bg' : ''}
                             ${currentTab === index ? 'text-blue [&>.tabMarker]:bg-blue' : 'text-white/60 [&>.tabMarker]:hover:bg-white/60 hover:text-white/80'}`}
                             onClick={() => {
                                 if (!dragging) {
                                     setCurrentTab(index)
                                     showTab(index)
                                 }
                             }}
                             onMouseDown={
                                 editable ?
                                     (e) => {
                                         if (tabs.length < 2) {
                                             return
                                         }

                                         e.currentTarget.style.zIndex = '9999'
                                         dragTab.current = {
                                             xOrigin: e.clientX,
                                             lOrigin: e.currentTarget.getBoundingClientRect().left,
                                             rOrigin: e.currentTarget.getBoundingClientRect().right,
                                             index: index,
                                             position: index
                                         }

                                         dragTimeout.current = window.setTimeout(() => {
                                             setDragging(true)
                                         }, 300)
                                     }
                                     : undefined
                             }>
                            <TextBox
                                className={`w-full ${getFontWeightClass(type)} ${getTextSizeClass(type)} 
                                ${getTextSpacingClass(type)} ${getTextAlignmentClass('center')}`}
                                editable={editable}
                                role={getAriaRole(type)}
                                value={value.data.name ?? 'untitled'}
                                title={type}
                                editMode="double-click"
                                onFocus={() => {
                                    if (onFocus) {
                                        onFocus()
                                    }
                                    setOpenLanguage(false)
                                }}
                                onBlur={(text) => {
                                    if (onBlur) {
                                        value.data.name = text ? text : 'untitled'
                                        onBlur(tabs.map(v => v.data))
                                    }
                                }}/>
                            {
                                editable ?
                                    <div className={`absolute right-0 select-none ${dragging ? 'hidden' : ''}`}>
                                        {
                                            tabs.length > 1 && (
                                                <XMarkIcon className="s-4 cursor-pointer"
                                                           onMouseDown={(e) => e.stopPropagation()}
                                                           onClick={(e) => {
                                                           e.stopPropagation()
                                                           const editor = editorRef.current
                                                           if (tabs.length <= 1 || !editor) {
                                                               return
                                                           }

                                                           editor.removeChild(value.root)
                                                           value.view?.destroy()
                                                           setTabs(tabs.filter((v, i) => i !== index))

                                                           let tabIndex: number;
                                                           if (currentTab === index) {
                                                               tabIndex = (index === tabs.length - 1) ? (tabs.length - 2) : index
                                                           } else if (currentTab > index) {
                                                               tabIndex = currentTab - 1
                                                           } else {
                                                               tabIndex = currentTab
                                                           }
                                                           setCurrentTab(tabIndex)
                                                           showTab(tabIndex)
                                                       }}/>
                                            )
                                        }
                                    </div>
                                    :
                                    <div className="tabMarker absolute h-[3px] bottom-0 left-6 right-6 rounded-tl-md
                                    rounded-tr-md transition bg-transparent"></div>
                            }
                        </div>
                    ))
                }
                {
                    editable && (
                        <div className="px-4 flex items-center justify-center select-none">
                            <PlusIcon
                                className={`s-[18px] text-white/60 hover:text-white/80 cursor-pointer 
                                ${dragging ? '!text-transparent' : ''}`}
                                onClick={() => {
                                    const editor = editorRef.current
                                    if (tabs.length >= 10 || !editor) {
                                        return
                                    }
                                    const newTab = createTab(
                                        {code: '', lang: 'txt', name: 'untitled'},
                                        editable,
                                        langWorker.current
                                    )
                                    editor.appendChild(newTab.root)
                                    setTabs([...tabs, newTab])
                                    setCurrentTab(tabs.length)
                                    showTab(tabs.length)
                                }}/>
                        </div>
                    )
                }
            </div>
            <div className="relative w-full h-auto">
                <div ref={editorRef} className={`w-full min-h-[100px] ${editable ? 'h-[600px]' : 'h-auto'}`}></div>
                {
                    !editable && tabs.length && (
                        <div
                            className="absolute top-4 right-4 flex flex-col gap-4 z-10 select-none">
                            <CellTooltip text="Copy code sample">
                                <DocumentDuplicateIcon className="s-6 bg-[#110d17] text-white/40 hover:text-white/60
                                cursor-pointer transition text-blue"
                                                       onClick={() => {
                                                           showNotification(
                                                               'info',
                                                               'Clipboard',
                                                               'Code sample has been copied to clipboard.',
                                                               5
                                                           )
                                                       }}/>
                            </CellTooltip>
                            <CellTooltip text="Show/hide line numbers">
                                <HashtagIcon
                                    className="s-6 bg-[#110d17] text-white/40 hover:text-white/60 cursor-pointer transition"
                                    onClick={() => {
                                        showLineNumbers.current = !showLineNumbers.current
                                        for (const tab of tabs) {
                                            updateGutter(tab, showLineNumbers.current)
                                        }
                                    }}/>
                            </CellTooltip>
                        </div>
                    )
                }
            </div>
            {
                editable && (
                    <div className="relative w-full h-6 px-4 flex items-center justify-end bg-bg
                    shadow-[0_-1px_0_0_#27272a] gap-4 text-[13px] text-white/60 select-none">
                        <div className="select-none">{cursorPosition.col + ':' + cursorPosition.row}</div>
                        <div className="select-none">UTF-8</div>
                        <CellTooltip text="Indent unit">
                            <div className="select-none cursor-pointer hover:text-white/80 transition"
                                 onClick={(e) => {
                                     if (tabs[currentTab].indentSpaces === 4) {
                                         tabs[currentTab].indentSpaces = 2
                                     } else {
                                         tabs[currentTab].indentSpaces = 4
                                     }
                                     updateIndentSpaces(tabs[currentTab])
                                     e.currentTarget.replaceChildren(`${tabs[currentTab].indentSpaces} spaces`)
                                 }}>
                                {`${tabs[currentTab]?.indentSpaces ?? 4} spaces`}
                            </div>
                        </CellTooltip>
                        <CellTooltip text="Language detection">
                            <div className="select-none cursor-pointer hover:text-white/80 transition"
                                 onClick={(e) => {
                                     tabs[currentTab].autoDetect = !tabs[currentTab].autoDetect
                                     e.currentTarget.replaceChildren(tabs[currentTab].autoDetect ? 'On' : 'Off')
                                 }}>
                                {(tabs[currentTab]?.autoDetect ?? true) ? 'On' : 'Off'}
                            </div>
                        </CellTooltip>
                        <div className="cursor-pointer hover:text-white/80 transition"
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setOpenLanguage(!openLanguage)
                                 clickAnywhere(id.current)
                             }}>
                            {getLanguageName(tabs[currentTab]?.data.lang ?? 'txt')}
                        </div>
                        <LanguageSelector open={openLanguage}
                                          onSelected={(lang) => {
                                              tabs[currentTab].autoDetect = false
                                              tabs[currentTab].data.lang = lang
                                              updateLang(tabs[currentTab], lang, true)
                                              setOpenLanguage(false)
                                          }}/>
                    </div>
                )
            }
        </div>
    )
}

export default CodeFiles