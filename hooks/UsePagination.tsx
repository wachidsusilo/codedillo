import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'


interface IPagination {
    selected: number
    previous: number
    next: number
    ellipsisStart: boolean
    ellipsisEnd: boolean
    pages: Array<number>
    setEnabled(enabled: boolean): void
    setSelected(page: number): void
    setTotal(total: number): void
}

const PaginationContext = createContext<IPagination>({
    selected: 1,
    previous: 0,
    next: 2,
    ellipsisStart: false,
    ellipsisEnd: false,
    pages: [],
    setEnabled: () => {},
    setSelected: () => {},
    setTotal: () => {}
})

interface PaginationProviderProps {
    children: ReactNode
}


export const PaginationProvider = ({children}: PaginationProviderProps) => {
    const [selected, setSelected] = useState(1)
    const [total, setTotal] = useState(1)
    const [half, setHalf] = useState(0)
    const enabled = useRef<boolean>(false)
    const {push, query: {page, ...queries}} = useRouter()

    const goToPage = (page: number) => {
        push({query: {...queries, page}}).then()
    }

    useEffect(() => {
        if (!window) return
        const onResize = () => {
            const w = window.innerWidth
            if (w > 768) {
                setHalf(4)
            } else if (w > 640) {
                setHalf(3)
            } else if (w > 500) {
                setHalf(2)
            } else if (w > 393) {
                setHalf(1)
            } else {
                setHalf(0)
            }
        }
        window.addEventListener('resize', onResize)
        onResize()
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [window])

    useEffect(() => {
        if (page && enabled.current) {
            if (typeof page === 'string') {
                const p = parseInt(page)
                if (isNaN(p) || !isFinite(p)) {
                    goToPage(1)
                    return
                }
                if (p < 1) {
                    goToPage(1)
                    return
                }
                if (p > total) {
                    goToPage(total)
                    return
                }
                setSelected(p)
            } else {
                goToPage(1)
            }
        }
    }, [page])

    const memoizedValue = useMemo<IPagination>(() => {
        const pages: Array<number> = [1]
        const leftMin = selected - half - Math.max(selected + half + 1 - total, 0)
        const leftMax = selected + half - Math.min(selected - half - 2, 0)
        for (let i = leftMin; i < selected; i++) {
            if (i > 1) {
                pages.push(i)
            }
        }
        if (selected !== 1 && selected !== total) {
            pages.push(selected)
        }
        for (let i = selected + 1; i <= leftMax; i++) {
            if (i < total) pages.push(i)
        }
        if (total > 1) {
            pages.push(total)
        }

        return {
            selected: selected,
            previous: selected - 1,
            next: selected + 1,
            ellipsisStart: pages[1] !== 2 && total > 2 * half + 1,
            ellipsisEnd: pages[pages.length - 2] !== total - 1 && total > 2 * half + 1,
            pages: pages,
            setEnabled(en) {
                enabled.current = en
            },
            setSelected: (page) => {
                if (isNaN(page) || !isFinite(page)) {
                    return
                }
                if (page < 1) {
                    setSelected(1)
                    return
                }
                if (page > total) {
                    setSelected(total)
                    return
                }
                setSelected(page)
            },
            setTotal: (total) => {
                if (isNaN(total) || !isFinite(total)) {
                    return
                }
                setTotal(total)
            }
        }
    }, [selected, total, half])

    return (
        <PaginationContext.Provider value={memoizedValue}>
            {children}
        </PaginationContext.Provider>
    )
}

export default function usePagination() {
    return useContext(PaginationContext)
}