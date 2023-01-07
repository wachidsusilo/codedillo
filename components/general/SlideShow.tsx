import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'
import { wrap } from 'popmotion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const variants = {
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    enter: (direction: number) => ({
        zIndex: 0,
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
}

const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
}

interface Props {
    className?: string
    frameClassName?: string
    imageClassName?: string
    imageUrls: Array<string>
    onChange?(position: number): void
}

const SlideShow = ({className = '', frameClassName = '', imageClassName = '', imageUrls, onChange}: Props) => {
    const [[page, direction], setPage] = useState([0, 0])
    const controls = useAnimationControls()

    const imageIndex = wrap(0, imageUrls.length, page)

    useEffect(() => {
        if (imageUrls.length < 2) {
            if (onChange) {
                onChange(imageIndex)
            }
            return
        }

        if ((direction > 0 && imageIndex !== 0) || (direction < 0 && imageIndex === imageUrls.length - 1)) {
            controls.start({
                right: `${imageUrls.length - 1 -imageIndex}rem`
            }).then(() => {
                controls.start({
                    left: `${imageIndex}rem`
                }).then()
            })
        } else {
            controls.start({
                left: `${imageIndex}rem`
            }).then(() => {
                controls.start({
                    right: `${imageUrls.length - 1 - imageIndex}rem`
                }).then()
            })
        }
        if (onChange) {
            onChange(imageIndex)
        }
    }, [imageIndex, imageUrls])

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    return (
        <div className={`relative group ${className}`}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    variants={variants}
                    className={`absolute w-full overflow-hidden ${imageUrls.length > 1 ? 'h-[calc(100%-1.5rem)]' : 'h-full'} ${frameClassName}`}
                    custom={direction}
                    animate="center"
                    initial="enter"
                    exit="exit"
                    transition={{
                        x: {duration: 0.3},
                        opacity: {duration: 0.2}
                    }}
                    drag={imageUrls.length > 1 ? 'x' : false}
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={1}
                    onDragEnd={(e, {offset, velocity}) => {
                        const swipe = swipePower(offset.x, velocity.x)
                        if (swipe < -10000) {
                            paginate(1)
                        } else if (swipe > 10000) {
                            paginate(-1)
                        }
                    }}>
                    <img
                        className={`w-full h-full object-cover ${imageClassName}`}
                        src={imageUrls[imageIndex]}
                        alt=""
                        loading="lazy" />
                </motion.div>
            </AnimatePresence>
            {
                imageUrls.length > 1 &&
                    <>
                        <ChevronLeftIcon
                            key={'left'}
                            className="absolute left-0 top-[calc(50%-0.75rem)] s-16 -translate-y-1/2 text-transparent group-hover:text-white/40
                            transition duration-300 cursor-pointer z-10"
                            onClick={() => {
                                paginate(-1)
                            }}/>
                        <ChevronRightIcon
                            key={'right'}
                            className="absolute right-0 top-[calc(50%-0.75rem)] s-16 -translate-y-1/2 text-transparent group-hover:text-white/40
                            transition duration-300 cursor-pointer z-10"
                            onClick={() => {
                                paginate(1)
                            }}/>
                        <ul className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-2 z-10">
                            {
                                imageUrls.map((value, index) => (
                                    <li
                                        key={index}
                                        className={`s-2 rounded-full bg-white/20`}
                                        onClick={() => {
                                            if (imageIndex !== index) {
                                                paginate(index - imageIndex)
                                            }
                                        }}>
                                    </li>
                                ))
                            }
                            <motion.li
                                className="absolute inset-0 rounded-full bg-magenta origin-left"
                                initial={false}
                                animate={controls}
                                transition={{
                                    type: 'tween',
                                    duration: 0.2
                                }}
                            >
                            </motion.li>
                        </ul>
                    </>
            }
        </div>
    )
}

export default SlideShow