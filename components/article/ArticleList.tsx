import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChatIcon, ExternalLinkIcon, EyeIcon } from '@heroicons/react/outline'
import Pagination from '../general/Pagination'
import usePagination from '../../hooks/UsePagination'
import { useRouter } from 'next/router'
import useArticle from '../../hooks/UseArticle'
import { ArticleMeta } from '../../typings'

interface Props {
    className?: string
}

const article: ArticleMeta = {
    id: 'article',
    title: 'How to use Servo in ESP32',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, aperiam.',
    author: 'Wachid Susilo',
    profilePictureUrl: '/assets/images/profile.jpg',
    imageUrl: '/assets/images/sample_programming.jpg',
    iconUrl: '/assets/images/lightning.png',
    reads: 324,
    comments: 10
}

const ArticleList = ({className}: Props) => {
    const [recent, setRecent] = useState(false)
    const articleAnchorRef = useRef<HTMLDivElement>(null)
    const lastPageRef = useRef(1)
    const {selected} = usePagination()
    const {query: {page}} = useRouter()
    const {setSearchModalOpen} = useArticle()

    useEffect(() => {
        if (page && typeof page === 'string' && !isNaN(parseInt(page)) && isFinite(parseInt(page))) {
            const p = parseInt(page)
            if (p !== lastPageRef.current) {
                lastPageRef.current = p
                articleAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'start'
                })
            }
        }
    }, [selected, page])

    return (
        <section ref={articleAnchorRef} className={`w-full flex px-8 ${className}`}>
            <div className="w-full max-w-container mx-auto flex flex-col">
                <div>
                    <h2 className="text-xl font-medium">Articles</h2>
                    <p className="mt-2 text-md text-white/40">Browse articles that interest you</p>
                </div>
                <div className="w-full py-12 flex items-center justify-between">
                    <div className="flex gap-4">
                        <button
                            className={`px-4 py-2.5 rounded-full text-md text-white/60 hover:text-white/80 transition 
                            whitespace-nowrap ${!recent && 'bg-white/10'}`}
                            onClick={() => {
                                setRecent(false)
                            }}>
                            All Articles
                        </button>
                        <button
                            className={`px-4 py-2.5 rounded-full text-md text-white/60 hover:text-white/80 transition 
                            whitespace-nowrap ${recent && 'bg-white/10'}`}
                            onClick={() => {
                                setRecent(true)
                            }}>
                            Recently Added
                        </button>
                    </div>
                    <div
                        className="w-72 py-2 px-3 hidden md:flex items-center rounded-lg bg-white/5 border
                            border-white/10 cursor-text"
                        onClick={() => {
                            setSearchModalOpen(true)
                        }}>
                        <input
                            className="min-w-0 text-sm sm:text-md text-white/40 bg-transparent outline-none cursor-text"
                            type="text"
                            disabled={true}
                            placeholder="Search articles..."/>
                        <span
                            className="px-1.5 py-0.5 hidden lg:flex rounded-md bg-white/10 text-sm text-white/60">CTRL</span>
                        <span
                            className="ml-1.5 px-1.5 py-0.5 hidden lg:flex rounded-md bg-white/10 text-sm text-white/60">S</span>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {
                        Array(20).fill(0).map((value, index) => (
                            <Link key={index} href="/pages">
                                <a className="relative w-full h-64 p-8 flex flex-col bg-white/10
                                    border border-white/5 rounded-xl cursor-pointer overflow-hidden group">
                                    <div className="w-full grid grid-cols-[3.5rem_1fr]">
                                        <div className="w-14 h-14 rounded-2xl self-center justify-self-center
                                            flex items-center justify-center border border-white/5 bg-gradient-to-b
                                            from-white/10 via-white/5 to-transparent">
                                            <img
                                                className="w-6 h-6 object-contain"
                                                src={article.iconUrl}
                                                alt=""/>
                                        </div>
                                        <h3 className="ml-4 text-lg font-medium self-center line-clamp-2 text-shadow-lg z-10">
                                            {article.title}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-md line-clamp-3 text-white/60 text-shadow-lg z-10">
                                        {article.description} Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit. Asperiores aspernatur cum cupiditate dolor et explicabo libero minus
                                        quaerat quo temporibus.
                                    </p>
                                    <div className="mt-auto flex z-10">
                                        <div className="flex items-center text-white/60
                                            hover:text-white/80 transition z-10">
                                            <img
                                                className="w-5 h-5 rounded-full object-cover"
                                                src={article.profilePictureUrl}
                                                alt=""/>
                                            <span
                                                className="ml-3 text-sm font-medium text-shadow-lg">{article.author}</span>
                                        </div>
                                        <div className="ml-6 flex items-center text-white/40
                                            hover:text-white/80 transition z-10">
                                            <EyeIcon className="w-5 h-5"/>
                                            <span className="ml-2 text-sm text-shadow-lg">{article.reads}</span>
                                        </div>
                                        <div className="ml-6 hidden xxs:flex items-center text-white/40
                                            hover:text-white/80 transition z-10">
                                            <ChatIcon className="w-5 h-5"/>
                                            <span className="ml-2 flex text-sm text-shadow-lg">
                                                    {article.comments}
                                                <span className="hidden xs:flex">
                                                        &nbsp;&nbsp;Comments
                                                    </span>
                                                </span>
                                        </div>
                                    </div>
                                    <ExternalLinkIcon className="absolute right-4 bottom-4 w-5 h-5 text-white/40
                                        hover:text-white/80 transition"/>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <Pagination className="mt-16"/>
            </div>
        </section>
    )
}

export default ArticleList