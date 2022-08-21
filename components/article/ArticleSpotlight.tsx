import {
    ArrowRightIcon,
    ChevronDownIcon,
    DocumentTextIcon,
    FilterIcon,
    FolderOpenIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/solid'
import Skeleton from '../general/Skeleton'
import ArticleRow from './ArticleRow'
import { useState } from 'react'

interface Props {
    className?: string
}

const articleFilter = [
    "All",
    "Arduino",
    "NextJS",
    "Android",
    "Productivity",
    "Miscellaneous"
]

const ArticleSpotlight = ({className}: Props) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('All')
    const [filterOpen, setFilterOpen] = useState(false)

    return (
        <div className={`w-full max-w-container-lg mx-auto flex flex-col px-8 ${className}`}>
            <div className="w-full flex items-center justify-center flex flex-col">
                <h2 className="flex items-center justify-center text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    Latest&nbsp;
                    <span className="text-green">Articles&nbsp;</span>
                    <DocumentTextIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-green"/>
                </h2>
                <p className="text-md md:text-lg lg:text-xl text-white/60 text-center mt-2 md:mt-3 lg:mt-4">
                    Check out our newest articles!
                </p>
            </div>
            <div className="w-full mt-12 md:mt-16 lg:mt-18 rounded-xl bg-gradient-yellow-green
            flex flex-col xl:grid xl:grid-cols-[31rem_auto] gap-12 md:gap-14 xl:gap-12">
                <div
                    className="px-8 py-8 sm:pt-8 sm:pb-0 md:px-16 md:pt-16 xl:pl-16 xl:pr-0 xl:py-16 self-center flex flex-col">
                    <figure className="text-xl sm:text-2xl text-shadow-md">
                        <blockquote
                            className="text-center xl:text-start"
                            cite={'https://www.goodreads.com/quotes/408441-a-reader-lives-a-thousand-lives-before-he-dies-said'}>
                            “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
                        </blockquote>
                        <figcaption
                            className="mt-4 font-semibold text-white/80 text-sm sm:text-lg text-center xl:text-start">
                            <cite>
                                ―&nbsp;
                                <Link href={'https://en.wikipedia.org/wiki/George_R._R._Martin'}>
                                    <a className="hover:underline">George R.R. Martin</a>
                                </Link>
                                ,&nbsp;
                                <Link href={'https://en.wikipedia.org/wiki/A_Dance_with_Dragons'}>
                                    <a className="hover:underline">A Dance with Dragons</a>
                                </Link>
                            </cite>
                        </figcaption>
                    </figure>
                    <Link href="/articles">
                        <a className="mt-8 mx-auto xl:ml-0 xl:mr-auto py-2 px-4 flex items-center justify-center bg-white/20
                        text-sm sm:text-md text-white rounded-lg cursor-pointer hover:bg-white/30 group shrink-on-click">
                            <span className="mr-1.5 flex whitespace-nowrap font-medium text-shadow-sm">
                                Browse Articles
                            </span>
                            <ArrowRightIcon className="w-4 h-4 transition duration-300 group-hover:translate-x-1/4"/>
                        </a>
                    </Link>
                </div>
                <div className="w-full px-8 pb-8 md:px-16 md:pb-16 xl:pr-10 xl:pl-0 xl:py-16 2xl:px-0 hidden sm:flex">
                    <div className="relative w-full 2xl:min-w-[50rem] h-[38rem]
                    grid grid-rows-[48px_1fr_40px] border border-white/10 rounded-xl
                    supports-backdrop-filter:backdrop-blur-4xl bg-black/60">
                        <img
                            className="absolute -left-6 -bottom-6 -z-10"
                            src="/assets/images/frame_glow.png"
                            alt=""/>
                        <div className="relative w-full h-12 px-4 border-b border-b-white/10 flex items-center z-10">
                            <div className="w-6 h-6 mr-2 rounded-lg bg-white/10 flex items-center justify-center">
                                <SearchIcon className="w-3.5 h-3.5"/>
                            </div>
                            <input
                                className="flex-grow flex items-center text-sm bg-transparent text-white outline-0 pt-0.5 "
                                type="text"
                                placeholder="Search Articles..."/>
                            <div className="w-32 md:w-44 xl:w-60 mt-[calc(0.5rem-2px)] rounded-lg self-start border border-white/10
                                overflow-hidden transition duration-300 z-10"
                                 style={{
                                     background: filterOpen ? 'rgba(0, 0, 0, 0.6)' : 'transparent'
                                 }}>
                                <div
                                    className="w-full h-8 flex items-center gap-2.5 px-2.5 cursor-pointer"
                                    onClick={() => {
                                        setFilterOpen(!filterOpen)
                                    }}>
                                    <FilterIcon className="w-3.5 h-3.5"/>
                                    <h4 className="w-[calc(100%-3.125rem)] text-sm overflow-hidden text-ellipsis">{selectedFilter}</h4>
                                    <ChevronDownIcon
                                        className="w-4 h-4 transition"
                                        style={{
                                            transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}/>
                                </div>
                                <div
                                    className="w-full transition-[height] duration-300 overflow-hidden"
                                    style={{
                                        height: filterOpen ? `${1.75 * articleFilter.length + 1}rem` : 0
                                    }}>
                                    <div className="w-full py-2 flex flex-col overflow-hidden">
                                        {
                                            articleFilter.map((value, index) => (
                                                <h4 key={index} className="w-full h-7 pl-3 md:pl-8.5 pr-2.5 flex items-center text-sm
                                            cursor-pointer hover:bg-white/10 overflow-hidden text-ellipsis"
                                                    onClick={() => {
                                                        setSelectedFilter(value)
                                                        setFilterOpen(false)
                                                    }}>
                                                    {value}
                                                </h4>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <span className="absolute top-full w-50 h-[1.5px] bg-gradient-white-shimmering animate-back-and-forth
                            opacity-50"></span>
                        </div>
                        <div className="relative w-full h-full max-h-full overflow-y-scroll flex scrollbar-thin-purple-dark ">
                            <div className="absolute top-0 left-0 w-full h-full px-2.5">
                                <div
                                    className="mt-2.5 px-4 py-2.5 font-medium text-sm text-transparent motion-safe:animate-pulse">
                                    <span className="bg-white/[0.15] rounded-[3px]">All Index</span>
                                </div>
                                <Skeleton className="bg-white/10 motion-safe:animate-pulse"/>
                                {
                                    Array(7).fill(0).map((_, index) => (
                                        <Skeleton key={index} className="motion-safe:animate-pulse"/>
                                    ))
                                }
                            </div>
                            <div className="relative w-full px-2.5 pb-2 hidden">
                                <div className="mt-2.5 px-4 py-2.5 font-medium text-sm text-white/60">
                                    All Index
                                </div>
                                <div className="absolute left-0 right-0 top-44 flex flex-col items-center justify-center
                                gap-1 hidden">
                                    <FolderOpenIcon className="w-32 h-32 text-white/20"/>
                                    <p className="text-sm text-white/60">No Results</p>
                                </div>
                                <div className="px-2.5 pb-10 flex flex-col">
                                    {
                                        Array(20).fill(0).map((_, index) => (
                                            <ArticleRow
                                                key={index}
                                                title="Lorem ipsum dolor sit amet, consectetur."
                                                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, praesentium!"/>
                                        ))
                                    }
                                    <Link href="/articles">
                                        <a className="py-2.5 px-4 mx-auto mt-4 flex items-center justify-center text-sm
                                        rounded-md bg-white/5 hover:bg-white/10 transition group">
                                            Show more&nbsp; <ArrowRightIcon
                                            className="w-3.5 h-3.5 group-hover:translate-x-1/4 transition"/>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="h-10 absolute left-0 right-0 bottom-0 px-3 py-2.5 rounded-br-[11px]
                        supports-backdrop-filter:backdrop-blur-5xl not-supports-backdrop-filter:bg-black/20
                        rounded-bl-[11px] flex items-center border-t border-white/10 text-sm z-10">
                            <FolderOpenIcon className="mr-2 h-full text-red"/>Articles
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-[29rem_minmax(0,3fr)] gap-8 isolate">
                <div className="absolute -inset-8 -z-10 overflow-hidden">
                    <div
                        className="absolute -inset-x-12 -inset-y-10 bg-[length:100%_100%] bg-panel-green pointer-events-none"></div>
                </div>
                <div className="flex flex-col items-center justify-between rounded-xl bg-white/10">
                    <div className="w-full h-72 overflow-hidden rounded-tl-xl rounded-tr-xl">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/images/sample_programming.jpg"
                            alt=""/>
                    </div>
                    <div className="w-full p-8 md:p-16 flex flex-col gap-4">
                        <h3 className="text-xl font-medium">
                            Title
                        </h3>
                        <p className="text-md text-white/80">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur est facilis nobis
                            provident quisquam ratione reprehenderit rerum. At dignissimos, ipsum?
                            &nbsp;
                            <Link href="/pages">
                                <a className="hover:underline text-blue">
                                    Read more
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-col-reverse items-center justify-between rounded-xl bg-white/10">
                    <div
                        className="w-full h-72 overflow-hidden rounded-tl-xl rounded-tr-xl lg:rounded-none lg:rounded-bl-xl lg:rounded-br-xl">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/images/sample_programming.jpg"
                            alt=""/>
                    </div>
                    <div className="w-full p-8 md:p-16 flex flex-col gap-4">
                        <h3 className="text-xl font-medium">
                            Title
                        </h3>
                        <p className="text-md text-white/80">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet facere numquam perspiciatis
                            reprehenderit? Cumque delectus, est excepturi impedit sunt tempore.
                            &nbsp;
                            <Link href="/pages">
                                <a className="hover:underline text-blue">
                                    Read more
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleSpotlight