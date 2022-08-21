import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import usePagination from '../../hooks/UsePagination'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
    className?: string
}

const Pagination = ({className}: Props) => {
    const {selected, previous, next, pages, ellipsisStart, ellipsisEnd, setTotal} = usePagination()
    const {pathname} = useRouter()

    useEffect(() => {
        setTotal(48)
    }, [])

    return (
        <nav className={`flex justify-center gap-2 ${className}`}>
            {
                previous >= pages[0] &&
                <Link key={'prev'} href={`${pathname}?page=${previous}`}>
                    <a className="flex-square-9 group">
                        <ChevronLeftIcon className="s-5 text-white/60 group-hover:text-white transition"/>
                    </a>
                </Link>
            }
            {
                pages.length > 0 && (
                    selected === pages[0] ?
                        <span
                            key={'first'}
                            className="flex-square-9 text-sm font-medium text-white/60 transition rounded-md bg-white/10">
                            {pages[0]}
                        </span>
                        :
                        <Link key={'first-link'} href={`${pathname}?page=${pages[0]}`}>
                            <a className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">
                                {pages[0]}
                            </a>
                        </Link>
                )
            }
            {
                ellipsisStart &&
                <span key={'ellipsis-start'} className="flex-square-9">
                    <DotsHorizontalIcon className="s-5 text-white/60"/>
                </span>
            }
            {
                pages.map((value, index) => {
                    if (index > 0 && index < pages.length - 1) {
                        if (selected === value) {
                            return (
                                <span key={`page-${value}`}
                                      className="flex-square-9 text-sm font-medium text-white/60 transition rounded-md bg-white/10">
                                    {value}
                                </span>
                            )
                        } else {
                            return (
                                <Link key={`page-${value}-link`} href={`${pathname}?page=${value}`}>
                                    <a className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">
                                        {value}
                                    </a>
                                </Link>
                            )
                        }
                    }
                })
            }
            {
                ellipsisEnd &&
                <span key={'ellipsis-end'} className="flex-square-9">
                    <DotsHorizontalIcon className="s-5 text-white/60"/>
                </span>
            }
            {
                pages.length > 1 && (
                    selected === pages[pages.length - 1] ?
                        <span
                            key={'last'}
                            className="flex-square-9 text-sm font-medium text-white/60 transition rounded-md bg-white/10">
                            {pages[pages.length - 1]}
                        </span>
                        :
                        <Link key={pages[pages.length - 1]} href={`${pathname}?page=${pages[pages.length - 1]}`}>
                            <a
                                key={'last-link'}
                                className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">
                                {pages[pages.length - 1]}
                            </a>
                        </Link>
                )
            }
            {
                next <= pages[pages.length - 1] &&
                <Link key={'next'} href={`${pathname}?page=${next}`}>
                    <a className="flex-square-9 group">
                        <ChevronRightIcon className="s-5 text-white/60 group-hover:text-white transition"/>
                    </a>
                </Link>
            }
        </nav>
    )
}

export default Pagination