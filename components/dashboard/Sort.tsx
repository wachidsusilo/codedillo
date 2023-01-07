import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { v4 as UUID } from 'uuid'
import useNavigation from '../../hooks/UseNavigation'

const sortTypes = ['title', 'date-created', 'date-modified', 'comments', 'views'] as const
export type SortType = typeof sortTypes[number]

const getSortTypeName = (type: SortType) => {
    switch (type) {
        case 'title':
            return 'Title'
        case 'date-created':
            return 'Date Created'
        case 'date-modified':
            return 'Date Modified'
        case 'comments':
            return 'Comments'
        case 'views':
            return 'Views'
        default:
            return ''
    }
}

interface Props {
    className?: string

    onChange?(type: SortType, ascending: boolean): void
}

const Sort = ({className = '', onChange}: Props) => {
    const [ascending, setAscending] = useState<boolean>(true)
    const [sorting, setSorting] = useState<SortType>('title')
    const [openSorting, setOpenSorting] = useState<boolean>(false)
    const id = useRef<string>(UUID())
    const {registerClickConsumer, unregisterClickConsumer, clickAnywhere} = useNavigation()

    useEffect(() => {
        registerClickConsumer(id.current, () => {
            setOpenSorting(false)
        })

        if (onChange) {
            onChange(sorting, ascending)
        }

        return () => {
            unregisterClickConsumer(id.current)
        }
    }, [])

    return (
        <div className={`relative flex items-center gap-4 text-white/80 z-50 ${className}`}>
            {
                ascending ?
                    <BarsArrowDownIcon className="s-5 cursor-pointer"
                                       onClick={() => {
                                           if (onChange) {
                                               onChange(sorting, false)
                                           }
                                           setAscending(false)
                                       }}/>
                    :
                    <BarsArrowUpIcon className="s-5 cursor-pointer"
                                     onClick={() => {
                                         if (onChange) {
                                             onChange(sorting, true)
                                         }
                                         setAscending(true)
                                     }}/>
            }
            <div className="min-w-[120px] flex gap-2 items-center cursor-pointer text-[14px]"
                 onClick={(e) => {
                     e.stopPropagation()
                     setOpenSorting(!openSorting)
                     clickAnywhere(id.current)
                 }}>
                Sort by {getSortTypeName(sorting)}
            </div>
            <div className={`absolute -bottom-4 left-0 translate-y-full rounded-lg bg-bg-200 text-[14px] overflow-hidden
                transition-[height,box-shadow] ${openSorting ? 'shadow-[0_0_0_1px_#36363a,0_0_4px_2px_#00000080]' : 'shadow-none'}`}
                 style={{
                     height: openSorting ? `${1.75 * sortTypes.length + 1}rem` : 0
                 }}>
                <div className="py-2 flex flex-col"
                     style={{
                         height: `${1.75 * sortTypes.length + 1}rem`
                     }}>
                    {
                        sortTypes.map((type, index) => (
                            <div key={index}
                                 className={`h-7 px-4 shrink-0 flex items-center hover:bg-white/10 cursor-pointer transition`}
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     if (onChange && sorting !== type) {
                                         onChange(type, ascending)
                                     }
                                     setSorting(type)
                                     setOpenSorting(false)
                                 }}>
                                {getSortTypeName(type)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sort