import { useEffect, useRef } from 'react'
import Pagination from '../general/Pagination'
import usePagination from '../../hooks/UsePagination'
import { useRouter } from 'next/router'
import Search from './Search'
import Sort from './Sort'
import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import SlideShow from '../general/SlideShow'
import LanguageFrameworkIcon from '../general/LanguageFrameworkIcon'
import { FrameworkType, LangType } from '../../typings'
import { LinkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Tooltip from '../general/Tooltip'
import { isBoardType } from './SideBar'
import PublishStatusIcon from './PublishStatusIcon'

interface Props {
    className?: string
}

const Projects = ({className = ''}: Props) => {
    const lastPageRef = useRef(1)
    const scrollAnchorRef = useRef<HTMLDivElement>(null)
    const {query: {page, board}} = useRouter()
    const {selected, setEnabled} = usePagination()

    setEnabled(isBoardType(board) && board === 'projects')

    useEffect(() => {
        if (page && typeof page === 'string' && !isNaN(parseInt(page)) && isFinite(parseInt(page))) {
            const p = parseInt(page)
            if (p !== lastPageRef.current) {
                lastPageRef.current = p
                scrollAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                })
            }
        }
    }, [selected, page])

    const langFrames: Array<FrameworkType | LangType> = ['ts', 'cpp', 'android', 'arduino']

    return (
        <div className={`w-full md:pl-8 flex flex-col ${className}`}>
            <div ref={scrollAnchorRef} className="absolute top-0 s-0"></div>
            <Search/>
            <div className="w-full mt-8 flex justify-between">
                <Sort/>
                <Link href="/projects/editor"
                      className="px-2 py-1 flex gap-2 text-[14px] text-blue/80 hover:text-red/80 transition">
                    <PlusIcon className="s-5"/>
                    New Project
                </Link>
            </div>
            <div className="w-full mt-4 grid md:grid-cols-2 gap-4">
                {
                    Array(10).fill(0).map((value, index) => (
                        <div key={index}
                             className="relative w-full pb-4 bg-white/10 rounded-xl">
                            <SlideShow
                                className="w-full h-[200px] rounded-tl-xl rounded-tr-xl overflow-hidden"
                                frameClassName="rounded-tl-xl rounded-tr-xl"
                                imageUrls={[
                                    '/assets/images/sample_programming.jpg',
                                    '/assets/images/sample_programming.jpg',
                                    '/assets/images/sample_programming.jpg'
                                ]}/>
                            <div className="relative w-full mt-4 px-6">
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
                                <div className="w-full mt-4 flex flex-wrap gap-2">
                                    {
                                        langFrames.map((value, index) => (
                                            <LanguageFrameworkIcon key={index}
                                                                   className="s-6"
                                                                   type={value}/>
                                        ))
                                    }
                                </div>
                                <div className="absolute bottom-0 right-4 flex items-center gap-4">
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

export default Projects