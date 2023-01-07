import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import usePagination from '../../hooks/UsePagination'
import { FrameworkType, LangType } from '../../typings'
import Search from './Search'
import Sort from './Sort'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'
import LanguageFrameworkIcon from '../general/LanguageFrameworkIcon'
import Tooltip from '../general/Tooltip'
import { LinkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Pagination from '../general/Pagination'
import { isBoardType } from './SideBar'
import PublishStatusIcon from './PublishStatusIcon'

interface Props {
    className?: string
}

const Articles = ({className}: Props) => {
    const scrollAnchorRef = useRef<HTMLDivElement>(null)
    const lastPageRef = useRef(1)
    const {selected, setEnabled} = usePagination()
    const {query: {page, board}} = useRouter()

    setEnabled(isBoardType(board) && board === 'articles')

    useEffect(() => {
        if (page && typeof page === 'string' && !isNaN(parseInt(page)) && isFinite(parseInt(page))) {
            const p = parseInt(page)
            if (p !== lastPageRef.current) {
                scrollAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                })
                lastPageRef.current = p
            }
        }
    }, [selected, page])

    return (
        <div className={`w-full md:pl-8 flex flex-col ${className}`}>
            <div ref={scrollAnchorRef} className="absolute top-0 s-0"></div>
            <Search/>
            <div className="w-full mt-8 flex justify-between">
                <Sort/>
                <Link href="/projects/editor"
                      className="px-2 py-1 flex gap-2 text-[14px] text-green/80 hover:text-red/80 transition">
                    <PlusIcon className="s-5"/>
                    New Article
                </Link>
            </div>
            <div className="w-full mt-4 grid md:grid-cols-2 gap-4">
                {
                    Array(10).fill(0).map((value, index) => (
                        <div key={index}
                             className="relative w-full pb-10 bg-white/10 rounded-xl">
                            <div className="relative w-full mt-6 px-6">
                                <h3 className="text-[16px] font-medium">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, hic.
                                </h3>
                                <div className="w-full mt-2 flex flex-wrap gap-2">
                                    <PublishStatusIcon published={true}/>
                                    {
                                        ['android', 'web', 'ultrasound'].map((value, index) => (
                                            <div key={index}
                                                 className="px-2 py-0.5 text-[12px] text-blue bg-blue/20 rounded-md">
                                                {value}
                                            </div>
                                        ))
                                    }
                                </div>
                                <p className="mt-4 text-[14px] text-white/60 line-clamp-3">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque eius illum
                                    molestiae porro, rerum temporibus.
                                </p>
                                <div className="absolute -bottom-6 right-4 flex items-center gap-4">
                                    {
                                        1 && (
                                            <button>
                                                <Tooltip className="!shadow-[0_0_0_1px_#36363a] !z-20"
                                                         content={(
                                                             <div className="whitespace-nowrap text-white/80 p-0.5 text-[13px]">
                                                                 Copy link to clipboard
                                                             </div>
                                                         )}>
                                                    <LinkIcon className="s-4.5 text-white/60"/>
                                                </Tooltip>
                                            </button>
                                        )
                                    }
                                    <Link href={{
                                        pathname: '/projects/editor',
                                        query: {id: '123'}
                                    }}>
                                        <Tooltip className="!shadow-[0_0_0_1px_#36363a] !z-20"
                                                 content={(
                                                     <div className="whitespace-nowrap text-white/80 p-0.5 text-[13px]">
                                                         Open in editor
                                                     </div>
                                                 )}>
                                            <PencilSquareIcon className="s-5 text-white/60"/>
                                        </Tooltip>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Pagination className="mt-16"/>
        </div>
    )
}

export default Articles