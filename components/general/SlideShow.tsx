import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { wrap } from 'popmotion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

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
    imageUrls: Array<string>
}

const SlideShow = ({className, imageUrls}: Props) => {
    const [[page, direction], setPage] = useState([0, 0])
    const controls = useAnimationControls()

    const imageIndex = wrap(0, imageUrls.length, page)

    useEffect(() => {
        if (imageUrls.length < 2) {
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
    }, [imageIndex])

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection])
    }

    return (
        <div className={`relative group ${className}`}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    variants={variants}
                    className="absolute w-full h-[calc(100%-1.5rem)] rounded-tl-xl rounded-tr-xl overflow-hidden"
                    custom={direction}
                    animate="center"
                    initial="enter"
                    exit="exit"
                    transition={{
                        x: {duration: 0.3},
                        opacity: {duration: 0.2}
                    }}
                    drag="x"
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
                        className="w-full h-full object-cover"
                        src={imageUrls[imageIndex]}
                        alt=""/>
                </motion.div>
            </AnimatePresence>
            <ChevronLeftIcon
                key={'left'}
                className="absolute left-0 top-1/2 s-16 -translate-y-1/2 text-transparent group-hover:text-white/40
                transition duration-300 cursor-pointer z-10"
                onClick={() => {
                    paginate(-1)
                }}/>
            <ChevronRightIcon
                key={'right'}
                className="absolute right-0 top-1/2 s-16 -translate-y-1/2 text-transparent group-hover:text-white/40
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
                <motion.div
                    className="absolute inset-0 rounded-full bg-magenta origin-left"
                    initial={false}
                    animate={controls}
                    transition={{
                        type: 'tween',
                        duration: 0.2
                    }}
                >

                </motion.div>
            </ul>
        </div>
    )
}

export default SlideShow