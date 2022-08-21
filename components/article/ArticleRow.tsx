import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface Props {
    className?: string,
    title: string,
    description: string,
    iconUrl?: string,
    url?: string,
}

const ArticleRow = ({className, title, description, iconUrl, url}: Props) => {
    const container = useRef<HTMLAnchorElement | null>(null)

    useEffect(() => {
        const onMouseEnter = () => {
            const siblings = document.getElementsByClassName('article-row')
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('article-row-selected')
            }
            container.current?.classList.add('article-row-selected')
        }
        container.current?.addEventListener('mouseenter', onMouseEnter)
        return () => {
            container.current?.removeEventListener('mouseenter', onMouseEnter)
        }
    }, [container])

    return (
        <Link href={url ?? '/'}>
            <a ref={container} className={`article-row flex items-center h-[58px] px-[15px] text-ellipsis overflow-hidden ${className}`}>
                <img
                    className="w-5.5 h-5.5 mr-[15px] rounded-[5px] object-contain"
                    src={iconUrl ?? '/assets/images/code.png'}
                    alt=""/>
                <div className="flex flex-col flex-grow flex text-ellipsis overflow-hidden">
                    <span className="w-full mb-1.5 mr-auto flex-shrink flex-grow-0 rounded-[3px] whitespace-nowrap
                       text-ellipsis overflow-hidden text-sm leading-[1rem] font-medium">
                        {title}
                    </span>
                    <span className="w-full mr-auto flex-shrink flex-grow-0 text-white/60 rounded-[3px] whitespace-nowrap
                       text-ellipsis overflow-hidden text-sm leading-[1rem]">
                        {description}
                    </span>
                </div>
            </a>
        </Link>
    )
}

export default ArticleRow