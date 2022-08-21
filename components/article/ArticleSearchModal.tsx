import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, PlusIcon, SearchIcon } from '@heroicons/react/outline'
import useArticle from '../../hooks/UseArticle'
import { ArticleMeta } from '../../typings'

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

const articles: Array<ArticleMeta> = [
    {...article, id: 'article1'},
    {...article, id: 'article2'},
    {...article, id: 'article3'},
    {...article, id: 'article4'},
    {...article, id: 'article5'},
    {...article, id: 'article6'},
    {...article, id: 'article7'},
    {...article, id: 'article8'},
    {...article, id: 'article9'},
    {...article, id: 'article10'},
    {...article, id: 'article11'},
    {...article, id: 'article12'},
    {...article, id: 'article13'},
    {...article, id: 'article14'},
    {...article, id: 'article15'},
    {...article, id: 'article16'},
    {...article, id: 'article17'},
    {...article, id: 'article18'},
    {...article, id: 'article19'},
    {...article, id: 'article20'}
]

const ArticleSearchModal = () => {
    const [results, setResults] = useState<Array<ArticleMeta>>([])
    const [search, setSearch] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)
    const initialSearch = useRef<boolean>(true)
    const searchInput = useRef<HTMLInputElement>(null)
    const [selected, setSelected] = useState<number>(0)
    const {searchModalOpen, setSearchModalOpen} = useArticle()
    const isCtrlKeyPressed = useRef<boolean>(false)

    useEffect(() => {
        if (search.length === 0) {
            initialSearch.current = true
            setResults([])
            setSearching(false)
            return
        }
        setSearching(true)
        const searchTimeout = window.setTimeout(() => {
            initialSearch.current = false
            setResults(articles.filter((value) => value.id.includes(search)))
            setSearching(false)
        }, 1000)
        return () => {
            window.clearTimeout(searchTimeout)
        }
    }, [search])

    useEffect(() => {
        if (searchModalOpen) {
            searchInput.current?.focus()
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (searchModalOpen && e.key === 'Escape') {
                e.stopPropagation()
                e.preventDefault()
                setSearchModalOpen(false)
                return
            }
            if (e.key === 'Control') {
                if (!isCtrlKeyPressed.current) {
                    isCtrlKeyPressed.current = true
                }
                return
            }
            if (isCtrlKeyPressed.current && e.key.toLowerCase() === 's') {
                if (!searchModalOpen) {
                    e.stopPropagation()
                    e.preventDefault()
                    setSearchModalOpen(true)
                    return
                }
                if (searchInput.current !== document.activeElement) {
                    e.stopPropagation()
                    e.preventDefault()
                    searchInput.current?.focus()
                }
            }
        }

        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                if (isCtrlKeyPressed.current) {
                    isCtrlKeyPressed.current = false
                }
            }
        }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [searchModalOpen])

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen px-4 justify-center bg-black/70 z-50 ${searchModalOpen ? 'flex' : 'hidden'}`}
            onClick={() => {
                setSearchModalOpen(false)
            }}>
            <div
                className="mt-32 mb-auto w-full max-w-[640px] bg-[rgba(22,22,22,1)] border border-[rgba(49,49,49,1)] rounded-lg"
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}>
                <form className="relative w-full flex">
                    <input
                        ref={searchInput}
                        className="grow bg-transparent p-4 border-b border-b-[rgba(49,49,49,1)] text-md"
                        type="text"
                        onInput={(e) => {
                            setSearch(e.currentTarget.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.stopPropagation()
                                e.preventDefault()
                                return
                            }
                        }}
                        placeholder="Search..."/>
                    <span className={`absolute top-full w-50 h-[1.5px] bg-gradient-white-shimmering animate-back-and-forth 
                    opacity-50 ${searching ? 'flex' : 'hidden'}`}></span>
                </form>
                <div
                    className="w-full max-h-[608px] px-2 pb-4 text-white/40 overflow-y-auto scrollbar-thin-purple-dark">
                    {
                        search.length === 0 || (searching && initialSearch.current) ? (
                                <div key={'create_article'}>
                                    <h3 className="w-full px-4 pt-6 pb-4 text-sm font-medium">
                                        Articles
                                    </h3>
                                    <ul className="w-full">
                                        <Link href="/articles">
                                            <a className="w-full px-4 py-2.5 rounded-md flex items-center gap-2 bg-white/10">
                                                <PlusIcon className="w-4 h-4"/>
                                                <span className="text-white/40">Create Article</span>
                                            </a>
                                        </Link>
                                    </ul>
                                </div>
                            )
                            :
                            results.length === 0 ? (
                                    <div key={'results_empty'} className="w-full flex flex-col items-center pb-6">
                                        <SearchIcon className="w-5 h-5 mt-12 mb-6"/>
                                        <p className="pb-3 whitespace-nowrap text-sm text-white/40">
                                            Can't find what you're looking for?
                                        </p>
                                        <Link href="/articles">
                                            <a className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white/70 group">
                                                <span className="transition">Create your own article</span>
                                                <ArrowRightIcon className="w-4 h-4 ml-0 transition"/>
                                            </a>
                                        </Link>
                                    </div>
                                )
                                : (
                                    <div key={'results'}>
                                        <h3 className="w-full px-4 pt-6 pb-4 text-sm font-medium">Results</h3>
                                        {
                                            results.map((value, index) => (
                                                <Link key={value.id} href="/articles">
                                                    <a
                                                        className="w-full px-4 py-2.5 flex items-center gap-4 rounded-md"
                                                        style={{
                                                            backgroundColor: selected === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                                                        }}
                                                        onMouseEnter={() => {
                                                            setSelected(index)
                                                        }}>
                                                        <img
                                                            className="w-6 h-6 rounded-md"
                                                            src={value.iconUrl}
                                                            alt=""/>
                                                        <div className="grow flex flex-col justify-center overflow-hidden">
                                                            <span className="text-sm text-white/60">
                                                                {value.title}
                                                            </span>
                                                            <span
                                                                className="text-sm text-white/40 whitespace-nowrap text-ellipsis overflow-hidden">
                                                                {value.description}
                                                            </span>
                                                        </div>
                                                    </a>
                                                </Link>
                                            ))
                                        }
                                        {
                                            results.length >= 20 && (
                                                <Link key={'browse_results'} href="/articles">
                                                    <a
                                                        className="w-full px-4 py-3 flex items-center justify-between gap-4 rounded-md"
                                                        style={{
                                                            backgroundColor: selected === -1 ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                                                        }}
                                                        onMouseEnter={() => {
                                                            setSelected(-1)
                                                        }}>
                                                        <span className="text-md font-medium text-white/40">
                                                            View all results
                                                        </span>
                                                        <ArrowRightIcon className="w-4 h-4 text-white/40"/>
                                                    </a>
                                                </Link>
                                            )
                                        }
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}

export default ArticleSearchModal