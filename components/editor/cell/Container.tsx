import { ReactNode, useEffect, useRef, useState } from 'react'
import { getBackgroundColorClass, getCellTypeName, getTextColorClass } from '../utils'
import { ChevronDownIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon, ExclamationTriangleIcon, StarIcon } from '@heroicons/react/24/solid'
import CellTypeSelector from './CellTypeSelector'
import {v4 as UUID} from 'uuid'
import useNavigation from '../../../hooks/UseNavigation'
import { CellSpacing, CellType, FilterType } from '../../../typings'

interface Props {
    className?: string
    children: ReactNode
    padding: CellSpacing
    margin: CellSpacing
    type: CellType
    filterType: FilterType
    editable: boolean
    active: boolean
    removable?: boolean
    fixedType?: boolean

    onAdd?(): void

    onRemove?(): void

    onTypeChange?(type: CellType): void
}

const Container = (
    {
        type,
        children,
        className,
        padding,
        margin,
        editable,
        active,
        onAdd,
        onRemove,
        onTypeChange,
        filterType,
        removable = true,
        fixedType = false
    }: Props
) => {
    const [openTypeMenu, setOpenTypeMenu] = useState<boolean>(false)
    const {registerClickConsumer, unregisterClickConsumer, clickAnywhere} = useNavigation()
    const id = useRef<string>(UUID())

    useEffect(() => {
        registerClickConsumer(id.current, () => {
            setOpenTypeMenu(false)
        })

        return () => {
            unregisterClickConsumer(id.current)
        }
    }, [])

    if (!editable) {
        return <InnerContainer type={type} children={children} className={className} padding={padding}
                               margin={margin} editable={editable}/>
    }

    const outline = active ? 'shadow-[0_0_0_1px_rgba(37,99,235,0.8)]' : 'shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'

    return (
        <div className="relative w-full h-auto flex flex-col my-3">
            <div className={`w-auto px-2.5 py-0.5 flex justify-end items-center rounded-tl-md text-[13px] text-white/80 rounded-tr-md 
            ${active ? 'bg-blue-600/80' : 'bg-white/10'} ${outline}`}>
                <div className={`h-full flex items-center gap-2 ${filterType === 'all' && !fixedType ? 'cursor-pointer' : ''}`}
                     onClick={(e) => {
                         e.stopPropagation()
                         setOpenTypeMenu(!openTypeMenu)
                         clickAnywhere(id.current)
                     }}>
                    {getCellTypeName(type)}
                    {
                        filterType === 'all' && !fixedType && (
                            <ChevronDownIcon className={`s-[14px] transition ${openTypeMenu ? 'rotate-180' : ''}`}/>
                        )
                    }
                </div>
            </div>
            {
                !fixedType && (
                    <CellTypeSelector open={openTypeMenu}
                                      filterType={filterType}
                                      onSelected={(type) => {
                                          if (onTypeChange) {
                                              onTypeChange(type)
                                          }
                                          setOpenTypeMenu(false)
                                      }}/>
                )
            }
            <InnerContainer type={type}
                            children={children}
                            className={outline}
                            padding={padding}
                            margin={{vertical: 2, horizontal: 0}}
                            editable={editable}/>
            <div className="px-2 text-[13px] flex justify-end gap-2">
                <button
                    className={`py-1 flex items-center gap-2 transition ${active ? 'text-green' : 'text-white/80 hover:text-white/90'}`}
                    onClick={() => {
                        if (onAdd) {
                            onAdd()
                        }
                    }}>
                    <PlusIcon className="s-4"/>
                    Add Below
                </button>
                <div className="w-[1px] bg-white/10"></div>
                <button
                    className={`py-1 flex items-center gap-2 transition 
                    ${!removable ? 'text-white/40' : active ? 'text-red' : 'text-white/80 hover:text-white/90'}`}
                    disabled={!removable}
                    onClick={() => {
                        if (removable && onRemove) {
                            onRemove()
                        }
                    }}>
                    <TrashIcon className="s-4"/>
                    Remove
                </button>
            </div>
        </div>
    )
}

interface InnerProps {
    className?: string
    children: ReactNode
    padding: CellSpacing
    margin: CellSpacing
    type: CellType
    editable: boolean
}

const InnerContainer = ({type, children, className = '', padding, margin, editable}: InnerProps) => {

    const rounded = editable ? 'rounded-bl-md rounded-br-md' : 'rounded-md'

    if (type === 'important' || type === 'warning' || type === 'tips') {
        return (
            <div className={`h-auto p-2 flex ${rounded} ${getBackgroundColorClass(type)} ${className}`}
                 style={{
                     width: `calc(100%-${(margin?.left ?? margin?.horizontal ?? 0) + (margin?.right ?? margin?.horizontal ?? 0)}px)`,
                     marginLeft: margin?.left ?? margin?.horizontal ?? 0,
                     marginRight: margin?.right ?? margin?.horizontal ?? 0,
                     marginTop: margin?.top ?? margin?.vertical ?? 0,
                     marginBottom: margin?.bottom ?? margin?.vertical ?? 0
                 }}>
                <div className="w-12 shrink-0 flex justify-end pt-2.5 pr-1">
                    {
                        type === 'important' ?
                            <ExclamationCircleIcon className={`s-6 ${getTextColorClass(type)}`}/>
                            :
                            type === 'warning' ?
                                <ExclamationTriangleIcon className={`s-6 ${getTextColorClass(type)}`}/>
                                :
                                <StarIcon className={`s-6 ${getTextColorClass(type)}`}/>
                    }
                </div>
                <div className="w-full h-auto"
                     style={{
                         paddingLeft: padding?.left ?? padding?.horizontal ?? 0,
                         paddingRight: padding?.right ?? padding?.horizontal ?? 0,
                         paddingTop: padding?.top ?? padding?.vertical ?? 0,
                         paddingBottom: padding?.bottom ?? padding?.vertical ?? 0
                     }}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={`h-auto ${className}`}
             style={{
                 width: `calc(100%-${(margin?.left ?? margin?.horizontal ?? 0) + (margin?.right ?? margin?.horizontal ?? 0)}px)`,
                 paddingLeft: padding?.left ?? padding?.horizontal ?? 0,
                 paddingRight: padding?.right ?? padding?.horizontal ?? 0,
                 paddingTop: padding?.top ?? padding?.vertical ?? 0,
                 paddingBottom: padding?.bottom ?? padding?.vertical ?? 0,
                 marginLeft: margin?.left ?? margin?.horizontal ?? 0,
                 marginRight: margin?.right ?? margin?.horizontal ?? 0,
                 marginTop: margin?.top ?? margin?.vertical ?? 0,
                 marginBottom: margin?.bottom ?? margin?.vertical ?? 0,
             }}>
            {children}
        </div>
    )
}

export default Container