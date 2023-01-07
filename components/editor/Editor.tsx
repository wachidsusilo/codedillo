import Cell from './Cell'
import { useState } from 'react'
import { isCellData, reassignType } from './utils'
import { v4 as UUID} from 'uuid'
import { CalendarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { CellAlignment, CellBlock, CellSpacing, CellType, EditorData } from '../../typings'

interface Props {
    className?: string
    editable?: boolean
    data: EditorData
}

const Editor = ({className = '', data, editable = false}: Props) => {
    const [editorData, setEditorData] = useState<EditorData>(data)

    const title: CellBlock = {id:'title', type: 'title', data: {text: editorData.title}}

    return (
        <div className={`mx-auto w-[calc(100%-2rem)] max-w-container flex flex-col ${className}`}>
            <Cell editable={editable}
                  content={title}
                  removable={false}
                  fixedType={true}
                  alignment={getAlignment('title')}
                  placeholder={getPlaceholder('title')}
                  padding={getPadding('title')}
                  onAdd={() => {
                      if (!editorData.contents) {
                          editorData.contents = []
                      }
                      const contents = [...editorData.contents]

                      contents.splice(0, 0, {
                          id: UUID(),
                          type: 'paragraph',
                          data: { text: '' }
                      })
                      setEditorData({...editorData, contents})
                  }}
                  onChange={(newData) => {
                      if (isCellData(newData)) {
                          editorData.title = newData.text ?? ''
                      }
                  }} />
            {
                !editable && (
                    <div className="w-full mb-16 flex justify-center gap-8 text-[14px] text-white/80">
                        <div className="flex items-center gap-4 font-semibold">
                            <img className="s-7 object-cover rounded-full" src="/assets/images/profile.jpg" alt="" />
                            Wachid Susilo
                        </div>
                        <div className="flex items-center gap-2">
                            <EyeIcon className="s-5" />
                            234
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="s-5" />
                            05 November 2020
                        </div>
                    </div>
                )
            }
            {
                editorData.contents && editorData.contents.map((content, index) => (
                    <Cell key={content.id}
                          editable={editable}
                          content={content}
                          alignment={getAlignment(content.type)}
                          placeholder={getPlaceholder(content.type)}
                          padding={getPadding(content.type)}
                          margin={getMargin(content.type)}
                          onAdd={() => {
                              if (!editorData.contents) {
                                  editorData.contents = []
                              }
                              const contents = [...editorData.contents]
                              contents.splice(index + 1, 0, {
                                  id: UUID(),
                                  type: 'paragraph',
                                  data: { text: '' }
                              })
                              setEditorData({...editorData, contents})
                          }}
                          onRemove={() => {
                              if (!editorData.contents) {
                                  editorData.contents = []
                              }
                              const contents = [...editorData.contents]
                              contents.splice(index, 1)
                              setEditorData({...editorData, contents})
                          }}
                          onTypeChange={(type) => {
                              reassignType(content, type)
                              content.type = type
                              setEditorData({...editorData})
                          }}
                          onChange={(newData) => {
                              content.data = newData
                          }} />
                ))
            }
        </div>
    )
}

const getAlignment = (type: CellType): CellAlignment | undefined => {
    switch (type) {
        case 'title':
            return 'center'
        case 'subtitle-1':
        case 'subtitle-2':
            return 'left'
        case 'paragraph':
        case 'tips':
        case 'warning':
        case 'important':
        case 'list-number':
        case 'list-bullet':
            return 'justify'
        default:
            return undefined
    }
}

const getPlaceholder = (type: CellType): string | undefined => {
    switch (type) {
        case 'title':
            return 'Enter a title'
        case 'image':
            return 'Enter a description'
        default:
            return undefined
    }
}

const getPadding = (type: CellType): CellSpacing | undefined => {
    switch (type) {
        case 'tips':
        case 'warning':
        case 'important':
            return {vertical: 8, left: 8, right: 24}
        default:
            return undefined
    }
}

const getMargin =  (type: CellType): CellSpacing | undefined => {
    switch (type) {
        case 'tips':
        case 'warning':
        case 'important':
            return {vertical: 8, horizontal: 8}
        default:
            return undefined
    }
}

export default Editor