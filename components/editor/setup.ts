import {
    keymap,
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    EditorView,
    lineNumbers, highlightActiveLineGutter, rectangularSelection, gutter, GutterMarker
} from '@codemirror/view'
import { Extension, EditorState } from '@codemirror/state'
import {
    bracketMatching,
    defaultHighlightStyle,
    syntaxHighlighting,
    foldGutter,
    foldKeymap,
    indentOnInput, HighlightStyle
} from '@codemirror/language'
import { defaultKeymap, historyKeymap, indentWithTab, history } from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { lintKeymap } from '@codemirror/lint'
import { tags as t } from '@lezer/highlight'

const gutterSpacer = (space: number) => new class extends GutterMarker {
    toDOM(view: EditorView): Node {
        return document.createTextNode('.'.repeat(space))
    }
}

export const leftGutter = (space: number) => {
    return gutter({
        class: 'cm-left-gutter',
        initialSpacer: () => gutterSpacer(space)
    })
}

export const defaultGutter = (space: number) => {
    return gutter({
        class: 'cm-default-gutter',
        initialSpacer: () => gutterSpacer(space)
    })
}

export const spaceGutter = (space: number) => {
    return gutter({
        class: 'cm-space-gutter',
        initialSpacer: () => gutterSpacer(space)
    })
}

export const lineGutter = (space: number) => {
    return gutter({
        class: 'cm-line-gutter',
        initialSpacer: () => gutterSpacer(space)
    })
}

export const setup = (editable: boolean) => {
    const extension = [
        highlightSpecialChars(),
        syntaxHighlighting(defaultHighlightStyle, {fallback: true})
    ]

    if (editable) {
        extension.push(defaultGutter(1))
        extension.push(lineNumbers())
        extension.push(defaultGutter(1))
        extension.push(
            foldGutter({
                openText: '⊟',
                closedText: '⊞'
            })
        )
        extension.push(lineGutter(1))
        extension.push(history())
        extension.push(drawSelection())
        extension.push(EditorState.allowMultipleSelections.of(true))
        extension.push(indentOnInput())
        extension.push(closeBrackets())
        extension.push(bracketMatching())
        extension.push(rectangularSelection())
        extension.push(highlightActiveLineGutter())
        extension.push(highlightActiveLine())
        extension.push(highlightSelectionMatches())
        extension.push(
            keymap.of([
                ...closeBracketsKeymap,
                ...defaultKeymap,
                ...searchKeymap,
                ...historyKeymap,
                ...foldKeymap,
                ...completionKeymap,
                ...lintKeymap,
                indentWithTab
            ])
        )
    }

    return extension
}

const oneDarkTheme = (editable: boolean, simple: boolean) => EditorView.theme({
    '&': {
        color: '#a9b7c6',
        backgroundColor: 'transparent',
        fontSize: '16px',
        height: editable ? '600px' : 'auto',
        minHeight: simple ? 'auto' : '100px',
        maxHeight: simple ? '' : '600px'
    },

    '.cm-content': {
        caretColor: '#528bff',
        lineHeight: '1.5'
    },

    '.cm-default-gutter': {
        backgroundColor: '#110d17',
        boxShadow: simple ? '' : 'inset 0 1px #27272a'
    },

    '.cm-left-gutter': {
        backgroundColor: '#110d17',
        borderBottomLeftRadius: '0.5rem',
        boxShadow: simple ? '' : 'inset 0 1px #27272a'
    },

    '.cm-lineNumbers': {
        backgroundColor: '#110d17',
        boxShadow: simple ? '' : 'inset 0 1px #27272a'
    },

    '.cm-foldGutter': {
        backgroundColor: '#110d17',
        boxShadow: simple ? '' : 'inset 0 1px #27272a'
    },

    '.cm-line-gutter': {
        backgroundColor: '#110d17',
        boxShadow: simple ? '1px 0 0 0 #27272a' : '1px 0 0 0 #27272a, inset 0 1px #27272a'
    },

    '.cm-space-gutter': {
        backgroundColor: 'transparent !important'
    },

    '&.cm-focused .cm-cursor': {borderLeftColor: '#528bff'},
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {backgroundColor: '#214283'},

    '.cm-panels': {backgroundColor: '#05010d', color: '#a9b7c6'},
    '.cm-panels.cm-panels-top': {borderBottom: '2px solid black'},
    '.cm-panels.cm-panels-bottom': {borderTop: '2px solid black'},

    '.cm-searchMatch': {
        backgroundColor: '#72a1ff59',
        outline: '1px solid #457dff'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: '#6199ff2f'
    },

    '&.cm-focused .cm-activeLine': {backgroundColor: '#ffffff11'},
    '.cm-activeLine': {backgroundColor: 'transparent'},
    '.cm-selectionMatch': {backgroundColor: '#aafe661a'},

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: '#bad0f847',
        outline: '1px solid #515a6b'
    },

    '.cm-gutters': {
        backgroundColor: 'transparent',
        color: '#ffffff55',
        border: 'none',
        userSelect: 'none'
    },

    '&.cm-focused .cm-activeLineGutter': {backgroundColor: '#ffffff11'},
    '.cm-activeLineGutter': {backgroundColor: 'transparent'},

    '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ddd'
    },

    '.cm-tooltip': {
        border: 'none',
        backgroundColor: '#353a42'
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: '#353a42',
        borderBottomColor: '#353a42'
    },
    '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
            backgroundColor: '#ffffff11',
            color: '#ffffff'
        }
    }
}, {dark: true})

const oneDarkHighlightStyle = HighlightStyle.define([
    {
        tag: [t.keyword, t.operatorKeyword, t.self, t.escape, t.separator, t.atom, t.unit, t.standard(t.typeName), t.modifier, t.null],
        color: '#cc7832'
    },
    {
        tag: [t.variableName, t.operator, t.className, t.attributeName],
        color: '#a9b7c6'
    },
    {
        tag: [t.deleted, t.macroName, t.processingInstruction],
        color: '#e06c75'
    },
    {
        tag: [t.character, t.string],
        color: '#6a8759'
    },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName), t.function(t.name), t.tagName, t.labelName, t.function(t.definition(t.variableName))],
        color: '#ffc66d'
    },
    {
        tag: [t.regexp, t.color, t.number, t.constant(t.variableName)],
        color: '#6897bb'
    },
    {
        tag: [t.special(t.string), t.special(t.name)],
        color: '#3d92c7'
    },
    {
        tag: [t.annotation, t.typeName, t.namespace],
        color: '#bbb529'
    },
    {
        tag: [t.propertyName],
        color: '#9876aa'
    },
    {
        tag: [t.comment, t.lineComment],
        color: '#808080'
    },
    {
        tag: [t.docComment, t.docString, t.blockComment],
        color: '#629755'
    },
    {
        tag: t.strong,
        fontWeight: 'bold'
    },
    {
        tag: t.emphasis,
        fontStyle: 'italic'
    },
    {
        tag: t.strikethrough,
        textDecoration: 'line-through'
    },
    {
        tag: [t.link, t.url],
        color: '#7d8799',
        textDecoration: 'underline'
    },
    {
        tag: t.invalid,
        color: '#ffffff'
    },
])

export const oneDark = (editable: boolean, simple: boolean): Extension => {
    return [oneDarkTheme(editable, simple), syntaxHighlighting(oneDarkHighlightStyle)]
}
