import { CSSProperties, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { Color, getColor } from '../../utils/color'

type Layout = 'vertical' | 'horizontal' | 'horizontal-reverse' | 'branding'

interface Props {
    className?: string,
    layout?: Layout,
    buttonColor?: Color,
    maxLineDesc?: number,
    maxLineHead?: number
}

const getImageClass = (layout: Layout): string => {
    switch (layout) {
        case 'horizontal':
            return 'mask-image-horizontal'
        case 'horizontal-reverse':
            return 'mask-image-horizontal-reverse'
        default:
            return 'bottom-[20%] mask-image-vertical'
    }
}

const getTextClass = (layout: Layout): string => {
    switch (layout) {
        case 'horizontal':
            return 'md:left-[50%]'
        case 'horizontal-reverse':
            return 'md:right-[50%]'
        default:
            return ''
    }
}

const getHeadingStyle = (maxLine: number): CSSProperties => {
    return {
        maxHeight: `${maxLine * 1.75}rem`,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        lineClamp: maxLine,
        overflow: 'hidden'
    }
}

const getParagraphStyle = (maxLine: number): CSSProperties => {
    return {
        maxHeight: `${maxLine * 1.5}rem`,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        lineClamp: maxLine,
        overflow: 'hidden'
    }
}

const VideoCard = (
    {
        className = '',
        layout = 'vertical',
        buttonColor = 'purple',
        maxLineDesc = 3,
        maxLineHead = 2
    }: Props
) => {
    const [lineHead, setLineHead] = useState(window.innerWidth > 768 ? maxLineHead : 2)
    const [lineDesc, setLineDesc] = useState(window.innerWidth > 768 ? maxLineDesc : 3)

    useEffect(() => {
        const onResize = () => {
            setLineHead(window.innerWidth > 768 ? maxLineHead : 2)
            setLineDesc(window.innerWidth > 768 ? maxLineDesc : 3)
        }
        window.addEventListener('resize', onResize)
        setLineHead(window.innerWidth > 768 ? maxLineHead : 2)
        setLineDesc(window.innerWidth > 768 ? maxLineDesc : 3)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [maxLineDesc, maxLineHead])

    return (
        <div className={`w-full relative mb-4 md:mb-0 overflow-hidden bg-white/5 rounded-xl ${className}`}>
            {
                layout === 'branding' ?
                    <>
                        <div className="w-full h-full p-8 flex items-center justify-center">
                            <img
                                className="w-full h-full object-contain"
                                src="/assets/images/lightning.png"
                                alt=""/>
                        </div>
                    </>
                    :
                    <>
                        <div
                            className={`absolute inset-0 -z-10 ${getImageClass(layout)}`}>
                            <img
                                className="absolute w-full h-full object-cover"
                                src="/assets/images/sample_programming.jpg"
                                alt=""/>
                        </div>
                        <div
                            className={`absolute inset-0 px-8 md:px-12 pb-8 md:pb-12 flex flex-col justify-end 
                            overflow-hidden ${getTextClass(layout)}`}>
                            <h3
                                className="text-lg font-medium text-shadow-lg"
                                style={getHeadingStyle(lineHead)}>
                                Lorem ipsum dolor sit amet, consectetur.
                            </h3>
                            <p
                                className="w-full mt-2 text-md text-white/60 text-shadow-lg"
                                style={getParagraphStyle(lineDesc)}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur commodi culpa
                                deserunt dicta eius, et, ex hic laborum laudantium mollitia natus, neque nesciunt nihil
                                nisi nulla odit possimus quae quidem reiciendis temporibus unde vel veniam. Ab accusamus
                                aliquid amet assumenda autem consectetur cum dolor doloremque ea, et fuga in inventore
                                magnam modi mollitia nobis, odit, perferendis placeat possimus quibusdam quis quod rem
                                repudiandae sequi totam. Assumenda autem, cum delectus dolores error, ex exercitationem
                                facere harum illo ipsa iure, iusto laboriosam maxime minima modi mollitia pariatur
                                possimus praesentium provident quod ratione recusandae repellat sequi sunt tempora
                                tempore ullam voluptatibus? Magnam.
                            </p>
                            <Link href={'/'}>
                                <a className="mt-8 mr-auto py-2 px-4 justify-self-end flex items-center justify-center
                                    text-sm rounded-lg cursor-pointer group shrink-on-click"
                                   style={{
                                       color: getColor(buttonColor, 1),
                                       backgroundColor: getColor(buttonColor, 0.15)
                                   }}
                                   onMouseEnter={(e) => {
                                       e.currentTarget.style.backgroundColor = getColor(buttonColor, 0.2)
                                   }}
                                   onMouseLeave={(e) => {
                                       e.currentTarget.style.backgroundColor = getColor(buttonColor, 0.15)
                                   }}>
                                    <span className="mr-1.5 flex whitespace-nowrap">Watch Video</span>
                                    <ArrowRightIcon
                                        className="w-4 h-4 transition duration-300 group-hover:translate-x-1/4"/>
                                </a>
                            </Link>
                        </div>
                    </>
            }
        </div>
    )
}

export default VideoCard