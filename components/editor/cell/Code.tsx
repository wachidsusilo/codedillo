
import { useEffect, useRef, useState } from 'react'
import { Compartment, EditorState, StateEffect, StateField } from '@codemirror/state'
import { oneDark, setup, spaceGutter } from '../setup'
import { EditorView } from '@codemirror/view'
import { getLanguageName, updateDoc, updateIndentSpaces, updateLang } from '../utils'
import { indentUnit } from '@codemirror/language'
import { autocompletion, completeAnyWord } from '@codemirror/autocomplete'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import LanguageSelector from './LanguageSelector'
import CellTooltip from './CellTooltip'
import useNavigation from '../../../hooks/UseNavigation'
import { v4 as UUID } from 'uuid'
import useNotification from '../../../hooks/UseNotification'
import { CellData, CodeTab } from '../../../typings'

interface Props {
    className?: string
    editable: boolean
    data: CellData

    onFocus?(): void

    onBlur?(data: CellData): void
}

const Code = ({className = '', editable, data, onFocus, onBlur}: Props) => {
    const [openLanguage, setOpenLanguage] = useState<boolean>(false)
    const [cursorPosition, setCursorPosition] = useState<{ col: number, row: number }>({col: 0, row: 0})
    const [rerender, setRerender] = useState<boolean>(false)
    const editorRef = useRef<HTMLDivElement>(null)
    const autoDetectTimeout = useRef<number>(0)
    const tab = useRef<CodeTab | null>(null)
    const {registerClickConsumer, unregisterClickConsumer, clickAnywhere} = useNavigation()
    const id = useRef<string>(UUID())
    const {showNotification} = useNotification()

    const refresh = () => {
        setRerender(!rerender)
    }

    useEffect(() => {
        registerClickConsumer(id.current, () => {
            setOpenLanguage(false)
        })

        return () => {
            unregisterClickConsumer(id.current)
        }
    }, [])

    useEffect(() => {
        const editor = editorRef.current
        if (!editor) {
            return
        }

        const newTab: CodeTab = {
            root: editor,
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

        const guessLangWorker = editable ? new Worker('/guesslang/worker.js') : undefined

        const extensions = [
            setup(editable),
            oneDark(editable, true)
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

                if (v.docChanged && newTab.autoDetect) {
                    if (autoDetectTimeout.current) {
                        clearTimeout(autoDetectTimeout.current)
                    }

                    autoDetectTimeout.current = window.setTimeout(() => {
                        detectLanguage(v.state.doc.toJSON().join('\n'))
                            .then(langId => {
                                updateLang(newTab, langId)
                                refresh()
                            })
                    }, 1000)
                }
            })

            const languageField = StateField.define<string>({
                create: () => '',
                update: (value, tr) => {
                    for (let e of tr.effects) if (e.is(newTab.effect.lang)) value = e.value
                    return value
                }
            })

            extensions.push(onChange)
            extensions.push(newTab.compartment.indent.of([indentUnit.of(' '.repeat(newTab.indentSpaces))]))
            extensions.push(newTab.compartment.lang.of([]))
            extensions.push(newTab.compartment.completion.of(autocompletion({override: [context => completeAnyWord(context)]})))
            extensions.push(languageField)
        } else {
            extensions.push(newTab.compartment.lang.of([]))
            extensions.push(newTab.compartment.gutter.of([spaceGutter(3)]))
            extensions.push(EditorState.readOnly.of(true))
            extensions.push(EditorView.editable.of(false))
        }

        newTab.root.className = 'w-full h-auto [&>div]:!outline-none [&>div>div]:scrollbar-thin-purple-dark'
        newTab.view = new EditorView({
            state: EditorState.create({extensions}),
            parent: newTab.root
        })

        if (editable) {
            newTab.view.contentDOM.addEventListener('focus', () => {
                if (onFocus) onFocus()
            })

            newTab.view.contentDOM.addEventListener('blur', () => {
                if (onBlur) {
                    newTab.data.code = newTab.view?.state.doc.toJSON().join('\n') ?? ''
                    if (onBlur) {
                        onBlur(newTab.data)
                    }
                }
            })
        }

        updateLang(newTab, newTab.data.lang ?? 'txt', true)
        updateDoc(newTab, editable)

        tab.current = newTab

        return () => {
            guessLangWorker?.terminate()
            newTab.view?.destroy()
        }
    }, [data])

    return (
        <div className={`bg-[#110d17] ${editable ? '' : 'rounded-lg shadow-[0_0_0_1px_#27272a]'} ${className}`}>
            <div className="relative w-full h-auto">
                <div ref={editorRef} className={`w-full ${editable ? 'h-[600px]' : 'h-auto'}`}></div>
                {
                    !editable && (
                        <div
                            className="absolute top-[28px] right-4 flex flex-col gap-4 z-10 select-none">
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
                                     const currentTab = tab.current
                                     if (!currentTab) {
                                         return
                                     }
                                     if (currentTab.indentSpaces === 4) {
                                         currentTab.indentSpaces = 2
                                     } else {
                                         currentTab.indentSpaces = 4
                                     }
                                     updateIndentSpaces(currentTab)
                                     e.currentTarget.replaceChildren(`${currentTab.indentSpaces} spaces`)
                                 }}>
                                {`${tab.current?.indentSpaces ?? 4} spaces`}
                            </div>
                        </CellTooltip>
                        <CellTooltip text="Language detection">
                            <div className="select-none cursor-pointer hover:text-white/80 transition"
                                 onClick={(e) => {
                                     const currentTab = tab.current
                                     if (!currentTab) {
                                         return
                                     }
                                     currentTab.autoDetect = !currentTab.autoDetect
                                     e.currentTarget.replaceChildren(currentTab.autoDetect ? 'On' : 'Off')
                                 }}>
                                {(tab.current?.autoDetect ?? true) ? 'On' : 'Off'}
                            </div>
                        </CellTooltip>
                        <div className="cursor-pointer hover:text-white/80 transition"
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setOpenLanguage(!openLanguage)
                                 clickAnywhere(id.current)
                             }}>
                            {getLanguageName(tab.current?.data.lang ?? 'txt')}
                        </div>
                        <LanguageSelector open={openLanguage}
                                          onSelected={(lang) => {
                                              setOpenLanguage(false)
                                              const currentTab = tab.current
                                              if (!currentTab) {
                                                  return
                                              }
                                              currentTab.autoDetect = false
                                              currentTab.data.lang = lang
                                              updateLang(currentTab, lang, true)
                                          }}/>
                    </div>
                )
            }
        </div>
    )
}

export default Code