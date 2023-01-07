import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import usePagination from '../../hooks/UsePagination'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
    className?: string
}

const Pagination = ({className}: Props) => {
    const {selected, previous, next, pages, ellipsisStart, ellipsisEnd, setTotal} = usePagination()
    const {pathname, query: {page, ...queries}} = useRouter()

    useEffect(() => {
        setTotal(48)
    }, [])

    return (
        <nav className={`flex justify-center gap-2 ${className}`}>
            {
                previous >= pages[0] &&
                <Link
                    key={'prev'}
                    href={{
                        pathname,
                        query: {...queries, page: previous}
                    }}
                    className="flex-square-9 group">

                    <ChevronLeftIcon className="s-5 text-white/60 group-hover:text-white transition"/>

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
                        <Link
                            key={'first-link'}
                            href={{
                                pathname,
                                query: {...queries, page: pages[0]}
                            }}
                            className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">

                            {pages[0]}

                        </Link>
                )
            }
            {
                ellipsisStart &&
                <span key={'ellipsis-start'} className="flex-square-9">
                    <EllipsisHorizontalIcon className="s-5 text-white/60"/>
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
                                (<Link
                                    key={`page-${value}-link`}
                                    href={{
                                        pathname,
                                        query: {...queries, page: value}
                                    }}
                                    className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">

                                    {value}

                                </Link>)
                            );
                        }
                    }
                })
            }
            {
                ellipsisEnd &&
                <span key={'ellipsis-end'} className="flex-square-9">
                    <EllipsisHorizontalIcon className="s-5 text-white/60"/>
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
                        <Link
                            key={pages[pages.length - 1]}
                            href={{
                                pathname,
                                query: {...queries, page: pages[pages.length - 1]}
                            }}
                            className="flex-square-9 text-sm font-medium text-white/60 hover:text-white transition rounded-md">

                            {pages[pages.length - 1]}

                        </Link>
                )
            }
            {
                next <= pages[pages.length - 1] &&
                <Link
                    key={'next'}
                    href={{
                        pathname,
                        query: {...queries, page: next}
                    }}
                    className="flex-square-9 group">

                    <ChevronRightIcon className="s-5 text-white/60 group-hover:text-white transition"/>

                </Link>
            }
        </nav>
    );
}

export default Pagination