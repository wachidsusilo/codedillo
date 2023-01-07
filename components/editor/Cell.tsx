import { useEffect, useState } from 'react'
import {
    getAriaRole, getFilterType, getFontWeightClass, getTextAlignmentClass,
    getTextColorClass, getTextSizeClass, getTextSpacingClass, isCellArray, isCellData
} from './utils'
import TextBox from './cell/TextBox'
import List from './cell/List'
import Image from './cell/Image'
import CodeFiles from './cell/CodeFiles'
import Code from './cell/Code'
import Container from './cell/Container'
import { CellAlignment, CellBlock, CellData, CellSpacing, CellType, FilterType } from '../../typings'

interface Props {
    content: CellBlock
    alignment?: CellAlignment
    padding?: CellSpacing
    margin?: CellSpacing
    editable?: boolean
    placeholder?: string
    removable?: boolean
    fixedType?: boolean

    onChange?(data: CellData | Array<CellData>): void
    onAdd?(): void
    onRemove?(): void
    onTypeChange?(type: CellType): void
}

const Cell = (
    {
        content,
        alignment = 'justify',
        padding = {vertical: 8, horizontal: 8},
        margin = {vertical: 8, horizontal: 0},
        editable = false,
        placeholder,
        onChange,
        onAdd,
        onRemove,
        onTypeChange,
        removable,
        fixedType
    }: Props
) => {
    const [active, setActive] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<FilterType>(getFilterType(content.type, content.data))

    useEffect(() => {
        setFilterType(getFilterType(content.type, content.data))
    }, [content])

    if (content.type === 'code-files') {
        return (
            <Container type={content.type}
                       filterType={filterType}
                       padding={editable ? {vertical: 0, horizontal: 0} : padding}
                       margin={margin}
                       editable={editable}
                       active={active}
                       removable={removable}
                       fixedType={fixedType}
                       onAdd={onAdd}
                       onRemove={onRemove}
                       onTypeChange={onTypeChange}>
                <CodeFiles type={content.type}
                           editable={editable}
                           className="select-text"
                           data={isCellArray(content.data) ? content.data : []}
                           onFocus={() => setActive(true)}
                           onBlur={(value) => {
                          setActive(false)
                          setFilterType(getFilterType(content.type, value))
                          if (onChange) {
                              onChange(value)
                          }
                      }}/>
            </Container>
        )
    }

    if (content.type === 'code') {
        return (
            <Container type={content.type}
                       filterType={filterType}
                       padding={editable ? {vertical: 0, horizontal: 0} : padding}
                       margin={margin}
                       editable={editable}
                       active={active}
                       removable={removable}
                       fixedType={fixedType}
                       onAdd={onAdd}
                       onRemove={onRemove}
                       onTypeChange={onTypeChange}>
                <Code editable={editable}
                      className="select-text"
                      data={isCellData(content.data) ? content.data : {}}
                      onFocus={() => setActive(true)}
                      onBlur={(value) => {
                                setActive(false)
                                if (onChange) {
                                    onChange(value)
                                }
                            }}/>
            </Container>
        )
    }

    if (content.type === 'image') {
        return (
            <Container type={content.type}
                       filterType={filterType}
                       padding={padding}
                       margin={margin}
                       editable={editable}
                       active={active}
                       removable={removable}
                       fixedType={fixedType}
                       onAdd={onAdd}
                       onRemove={onRemove}
                       onTypeChange={onTypeChange}>
                <Image type={content.type}
                       editable={editable}
                       data={isCellArray(content.data) ? content.data : []}
                       className="select-text"
                       placeholder={placeholder}
                       onFocus={() => setActive(true)}
                       onBlur={(value) => {
                           setActive(false)
                           setFilterType(getFilterType(content.type, value))
                           if (onChange) {
                               onChange(value)
                           }
                       }}/>
            </Container>
        )
    }

    if (content.type === 'list-number' || content.type === 'list-bullet') {
        return (
            <Container type={content.type}
                       filterType={filterType}
                       padding={padding}
                       margin={margin}
                       editable={editable}
                       active={active}
                       removable={removable}
                       fixedType={fixedType}
                       onAdd={onAdd}
                       onRemove={onRemove}
                       onTypeChange={onTypeChange}>
                <List type={content.type}
                      className="select-text"
                      editable={editable}
                      data={isCellArray(content.data) ? content.data : []}
                      onFocus={() => setActive(true)}
                      onBlur={(value) => {
                          setActive(false)
                          if (onChange) {
                              onChange(value)
                          }
                      }}/>
            </Container>
        )
    }

    return (
        <Container type={content.type}
                   filterType={filterType}
                   padding={padding}
                   margin={margin}
                   editable={editable}
                   active={active}
                   removable={removable}
                   fixedType={fixedType}
                   onAdd={onAdd}
                   onRemove={onRemove}
                   onTypeChange={onTypeChange}>
            <TextBox
                className={`w-full select-text ${getFontWeightClass(content.type)} ${getTextSizeClass(content.type)} 
                ${getTextSpacingClass(content.type)} ${getTextColorClass(content.type)} ${getTextAlignmentClass(alignment)}`}
                editable={editable}
                role={getAriaRole(content.type)}
                value={isCellData(content.data) ? content.data.text : ''}
                placeholder={placeholder}
                title={content.type}
                onFocus={() => setActive(true)}
                onBlur={(text) => {
                    setActive(false)
                    if (onChange) {
                        onChange({text})
                    }
                }}/>
        </Container>
    )
}

export default Cell