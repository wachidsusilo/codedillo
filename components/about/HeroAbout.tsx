import { motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

interface Props {
    className?: string
}

const HeroAbout = ({className}: Props) => {
    return (
        <section
            className={`relative w-full max-w-container mx-auto grid grid-cols-2 lg:grid-cols-3 overflow-hidden ${className}`}>
            <div
                className="absolute h-[40rem] md:h-auto justify-end md:justify-start md:static pb-8 md:pb-0 flex flex-col gap-8 md:mt-48 md:!pb-44">
                <h1 className="text-center md:text-start flex flex-col text-lg font-medium gap-4">
                    Hello, I'm
                    <span className="text-4xl">Wachid</span>
                </h1>
                <p className="text-center md:text-start text-md text-white/60">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae consequatur dolores fugit,
                    impedit in itaque nihil, porro praesentium quaerat quas quibusdam quisquam temporibus, ut.
                </p>
            </div>
            <div className="h-[40rem] md:h-auto flex flex-col col-span-2 md:col-span-1 bg-blue/10">

            </div>
            <div className="mt-24 md:mt-16 lg:!mt-0 flex flex-col md:flex-row lg:flex-col col-span-2 lg:col-span-1
            gap-8 xs:gap-16 lg:!gap-6 justify-center">
                <div className="flex flex-col mx-auto md:mx-0 lg:ml-8 lg:mr-auto items-center md:self-end">
                    <IoT className="w-48 xs:w-64 md:!w-36"/>
                    <span className="px-4 py-1.5 mt-1 bg-blue-transparent text-blue text-center rounded-lg text-sm
                    font-medium">
                        IoT Developer
                    </span>
                </div>
                <div className="flex flex-col mx-auto md:mx-0 lg:ml-auto items-center md:self-end">
                    <Web className="w-56 xs:w-80 md:!w-44"/>
                    <span className="px-2.5 py-1.5 mt-3 bg-yellow-transparent text-yellow text-center rounded-lg text-sm
                    font-medium">
                        Web Developer
                    </span>
                </div>
                <div className="flex flex-col mx-auto md:mx-0 lg:ml-8 lg:mr-auto items-center md:self-end">
                    <Android className="w-56 xs:w-80 md:!w-44"/>
                    <span className="px-2.5 py-1.5 mt-4 bg-green-transparent text-green text-center rounded-lg text-sm
                    font-medium">
                        Android Developer
                    </span>
                </div>
            </div>
        </section>
    )
}

const IoT = ({className}: { className?: string }) => {
    const isExpanded = useRef<boolean>(false)
    const isAnimating = useRef<boolean>(false)
    const stack2 = useAnimationControls()
    const stack3 = useAnimationControls()
    const stack4 = useAnimationControls()
    const stack5 = useAnimationControls()
    const stack6 = useAnimationControls()
    const stack7 = useAnimationControls()
    const side1 = useAnimationControls()
    const side2 = useAnimationControls()
    const side3 = useAnimationControls()
    const container = useRef<HTMLDivElement>(null)

    const transition = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])
    const bottom = useCallback((p: number) => ({bottom: `${p}%`}), [])
    const opacity = useCallback((o: number) => ({opacity: o}), [])
    const scale = useCallback((s: number, o:number) => ({scale: s, opacity: o}), [])

    const expand = useCallback((delay: number = 0) => {
        isAnimating.current = true
        stack7.start(bottom(74), transition(delay)).then()
        stack6.start(bottom(62.6), transition(delay + 0.1)).then()
        stack5.start(bottom(52.1), transition(delay + 0.2)).then()
        stack4.start(bottom(42), transition(delay + 0.3)).then()
        stack3.start(bottom(32), transition(delay + 0.4)).then()
        stack2.start(opacity(1), transition(delay + 0.5)).then()
        side1.start(scale(1, 1), transition(delay + 0.55)).then()
        side2.start(scale(1, 1), transition(delay + 0.6)).then()
        side3.start(scale(1, 1), transition(delay + 0.65)).then(() => {
            isExpanded.current = true
            isAnimating.current = false
        })
    }, [])

    const collapse = useCallback((delay: number = 0) => {
        isAnimating.current = true
        side3.start(scale(0, 0), transition(delay)).then()
        side2.start(scale(0, 0), transition(delay + 0.05)).then()
        side1.start(scale(0, 0), transition(delay + 0.1)).then()
        stack2.start(opacity(0), transition(delay + 0.2)).then()
        stack3.start(bottom(26), transition(delay + 0.3)).then()
        stack4.start(bottom(27), transition(delay + 0.4)).then()
        stack5.start(bottom(28), transition(delay + 0.5)).then()
        stack6.start(bottom(29), transition(delay + 0.6)).then()
        stack7.start(bottom(30), transition(delay + 0.7)).then(() => {
            isExpanded.current = false
            isAnimating.current = false
            expand(1)
        })
    }, [])

    useEffect(() => {
        if (window.innerWidth >= 1024 || !container.current) {
            expand(0.2)
            return
        }
        const observer = new IntersectionObserver((ens) => {
            ens.forEach(e => {
                if (e.target === container.current && e.isIntersecting && !isExpanded.current) {
                    expand(0.2)
                }
            })
        }, {threshold: 0.7})
        observer.observe(container.current)

        return () => {
            if (container.current) {
                observer.unobserve(container.current)
            }
        }
    }, [])

    const initialBottom = (b: number) => ({x: '-50%', bottom: `${b}%`})

    return (
        <motion.div
            ref={container}
            className={`relative pt-[100%] cursor-pointer opacity-0 ${className}`}
            transition={transition(0.1)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            onClick={() => {
                if (isAnimating.current || !isExpanded.current) {
                    return
                }
                collapse()
            }}>
            <img
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full object-contain"
                src="/assets/images/about/iot/stack/iot_stack_1.png"
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[18%] w-[58%] object-contain opacity-0"
                src="/assets/images/about/iot/stack/iot_stack_2.png"
                initial={opacity(0)}
                animate={stack2}
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[26%] w-[35.88%] object-contain"
                src="/assets/images/about/iot/stack/iot_stack_3.png"
                initial={initialBottom(26)}
                animate={stack3} //32
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[27%] w-[35.88%] object-contain"
                src="/assets/images/about/iot/stack/iot_stack_4.png"
                initial={initialBottom(27)}
                animate={stack4} //42
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[28%] w-[35.88%] object-contain"
                src="/assets/images/about/iot/stack/iot_stack_5.png"
                initial={initialBottom(28)}
                animate={stack5} //52.1
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[29%] w-[35.88%] object-contain"
                src="/assets/images/about/iot/stack/iot_stack_6.png"
                initial={initialBottom(29)}
                animate={stack6} //62.6
                alt=""
            />
            <motion.img
                className="absolute left-1/2 -translate-x-1/2 bottom-[30%] w-[35.88%] object-contain"
                src="/assets/images/about/iot/stack/iot_stack_7.png"
                initial={initialBottom(30)}
                animate={stack7} //74
                alt=""
            />
            <motion.img
                className="absolute left-[7%] bottom-[7%] w-[21%] scale-0 opacity-0 object-contain"
                src="/assets/images/about/iot/side/iot_side_1.png"
                alt=""
                initial={scale(0, 0)}
                animate={side1}
            />
            <motion.img
                className="absolute left-[5%] bottom-[46%] w-[21%] scale-0 opacity-0 object-contain"
                src="/assets/images/about/iot/side/iot_side_2.png"
                alt=""
                initial={scale(0, 0)}
                animate={side2}
            />
            <motion.img
                className="absolute right-0 bottom-[46%] w-[21%] scale-0 opacity-0 object-contain"
                src="/assets/images/about/iot/side/iot_side_3.png"
                alt=""
                initial={scale(0, 0)}
                animate={side3}
            />
        </motion.div>
    )
}

const Web = ({className}: { className?: string }) => {
    const left1 = useAnimationControls()
    const left2 = useAnimationControls()
    const left3 = useAnimationControls()
    const left4 = useAnimationControls()
    const left5 = useAnimationControls()
    const left6 = useAnimationControls()
    const right1 = useAnimationControls()
    const right2 = useAnimationControls()
    const right3 = useAnimationControls()
    const right4 = useAnimationControls()
    const right5 = useAnimationControls()
    const right6 = useAnimationControls()
    const right7 = useAnimationControls()
    const isExpanded = useRef<boolean>(false)
    const isAnimating = useRef<boolean>(false)
    const container = useRef<HTMLDivElement>(null)

    const transition = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])
    const left = useCallback((l: number, opacity: number) => ({left: `${l}%`, opacity}), [])
    const right = useCallback((r: number, opacity: number) => ({right: `${r}%`, opacity}), [])
    const scale = useCallback((scale: number, opacity: number) => ({scale, opacity, originY: 1, originX: 0.5}), [])
    const rotate = useCallback((l: number, opacity: number) => ({left: `${l}%`, rotate: -360, opacity}), [])

    const expand = useCallback((delay: number = 0) => {
        isAnimating.current = true
        left1.start(left(12.18, 1), transition(delay)).then()
        left2.start(left(23.36, 1), transition(delay + 0.1)).then()
        left3.start(rotate(25.67, 1), transition(delay + 0.2)).then()
        left4.start(scale(1, 1), transition(delay + 0.3)).then()
        left5.start(left(44.56, 1), transition(delay + 0.4)).then()
        left6.start(left(8.58, 1), transition(delay + 0.5)).then()
        right1.start(right(4.96, 1), transition(delay)).then()
        right2.start(right(29.33, 1), transition(delay + 0.1)).then()
        right3.start(right(0, 1), transition(delay + 0.2)).then()
        right4.start(right(23, 1), transition(delay + 0.3)).then()
        right5.start(right(7.91, 1), transition(delay + 0.4)).then()
        right6.start(right(33.69, 1), transition(delay + 0.5)).then()
        right7.start(right(17.78, 1), transition(delay + 0.6)).then(() => {
            isExpanded.current = true
            isAnimating.current = false
        })
    }, [])

    const collapse = useCallback((delay: number = 0) => {
        isAnimating.current = true
        left6.start(left(-33.06, 0), transition(delay)).then()
        left5.start(left(-9.74, 0), transition(delay + 0.1)).then()
        left4.start(scale(0, 0), transition(delay + 0.2)).then()
        left3.start(rotate(-6.61, 0), transition(delay + 0.3)).then()
        left2.start(left(-25.57, 0), transition(delay + 0.4)).then()
        left1.start(left(-50.53, 0), transition(delay + 0.5)).then()
        right7.start(right(-12.66, 0), transition(delay)).then()
        right6.start(right(-8.46, 0), transition(delay + 0.1)).then()
        right5.start(right(-12.4, 0), transition(delay + 0.2)).then()
        right4.start(right(-10.47, 0), transition(delay + 0.3)).then()
        right3.start(right(-22.88, 0), transition(delay + 0.4)).then()
        right2.start(right(-29.33, 0), transition(delay + 0.5)).then()
        right1.start(right(-43.67, 0), transition(delay + 0.6)).then(() => {
            isExpanded.current = false
            isAnimating.current = false
            expand(1)
        })
    }, [])

    useEffect(() => {
        if (window.innerWidth >= 1024 || !container.current) {
            expand(0.4)
            return
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.target === container.current && e.isIntersecting && !isExpanded.current) {
                    expand(0.2)
                }
            })
        }, {threshold: 1})
        observer.observe(container.current)

        return () => {
            if (container.current) {
                observer.unobserve(container.current)
            }
        }
    }, [])

    const initialLeft = useCallback((l: number, b: number) => ({left: `${l}%`, bottom: `${b}%`, opacity: 0}), [])
    const initialRight = useCallback((r: number, b: number) => ({right: `${r}%`, bottom: `${b}%`, opacity: 0}), [])
    const initialScale = useCallback((scale: number, b: number) => ({
        scale,
        bottom: `${b}%`,
        opacity: 0,
        originY: 1,
        originX: 0.5
    }), [])

    return (
        <motion.div
            ref={container}
            className={`relative pt-[70.4%] cursor-pointer opacity-0 ${className}`}
            transition={transition(0.1)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            onClick={() => {
                if (isAnimating.current || !isExpanded.current) {
                    return
                }
                collapse()
            }}>
            <img
                className="absolute left-1/2 -translate-x-1/2 bottom-[4.49%] w-[65.35%] object-contain"
                src="/assets/images/about/web/web_mid.png"
                alt=""
            />
            <motion.img
                className="absolute -left-[50.53%] bottom-[17.85%] w-[50.53%] object-contain opacity-0"
                src="/assets/images/about/web/left/web_left_1.png"
                alt=""
                initial={initialLeft(-50.53, 17.85)}
                animate={left1}
            />
            <motion.img
                className="absolute -left-[25.57%] bottom-[86.87%] w-[25.57%] object-contain opacity-0"
                src="/assets/images/about/web/left/web_left_2.png"
                alt=""
                initial={initialLeft(-25.57, 86.87)}
                animate={left2}
            />
            <motion.img
                className="absolute -left-[6.61%] bottom-[4.26%] w-[6.61%] object-contain opacity-0"
                src="/assets/images/about/web/left/web_left_3.png"
                alt=""
                initial={initialLeft(-6.61, 4.26)}
                animate={left3}
            />
            <motion.img
                className="absolute left-0 bottom-0 w-[30.52%] scale-0 object-contain opacity-0"
                src="/assets/images/about/web/left/web_left_4.png"
                alt=""
                initial={initialScale(0, 0)}
                animate={left4}
            />
            <motion.img
                className="absolute -left-[9.74%] bottom-[76.5%] w-[9.74%] object-contain -z-10 opacity-0"
                src="/assets/images/about/web/left/web_left_5.png"
                alt=""
                initial={initialLeft(-9.74, 76.5)}
                animate={left5}
            />
            <motion.img
                className="absolute -left-[33.06%] bottom-[73.44%] w-[33.06%] object-contain opacity-0"
                src="/assets/images/about/web/left/web_left_6.png"
                alt=""
                initial={initialLeft(-33.06, 73.44)}
                animate={left6}
            />
            <motion.img
                className="absolute -right-[43.67%] bottom-[14.43%] w-[43.67%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_1.png"
                alt=""
                initial={initialRight(-43.67, 14.43)}
                animate={right1}
            />
            <motion.img
                className="absolute -right-[29.33%] bottom-[65.09%] w-[29.33%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_2.png"
                alt=""
                initial={initialRight(-29.33, 65.09)}
                animate={right2}
            />
            <motion.img
                className="absolute -right-[22.88%] bottom-[78.26%] w-[22.88%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_3.png"
                alt=""
                initial={initialRight(-22.88, 78.26)}
                animate={right3}
            />
            <motion.img
                className="absolute -right-[10.47%] bottom-[54.24%] w-[10.47%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_4.png"
                alt=""
                initial={initialRight(-10.47, 54.24)}
                animate={right4}
            />
            <motion.img
                className="absolute -right-[12.4%] bottom-[58.68%] w-[12.4%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_5.png"
                alt=""
                initial={initialRight(-12.4, 58.68)}
                animate={right5}
            />
            <motion.img
                className="absolute -right-[8.46%] bottom-[83.15%] w-[8.46%] object-contain opacity-0"
                src="/assets/images/about/web/right/web_right_6.png"
                alt=""
                initial={initialRight(-8.46, 83.15)}
                animate={right6}
            />
            <motion.img
                className="absolute -right-[12.66%] bottom-[80.14%] w-[12.66%] object-contain -z-10 opacity-0"
                src="/assets/images/about/web/right/web_right_7.png"
                alt=""
                initial={initialRight(-12.66, 80.14)}
                animate={right7}
            />
        </motion.div>
    )
}

const Android = ({className}: { className: string }) => {
    const isExpanded = useRef<boolean>(false)
    const isAnimating = useRef<boolean>(false)
    const scale1 = useAnimationControls()
    const scale2 = useAnimationControls()
    const scale3 = useAnimationControls()
    const scale4 = useAnimationControls()
    const scale5 = useAnimationControls()
    const scale6 = useAnimationControls()
    const scale7 = useAnimationControls()
    const container = useRef<HTMLDivElement>(null)

    const transition = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])
    const scale = useCallback((s: number, o: number) => ({scale: s, opacity: o}), [])

    const expand = useCallback((delay: number = 0) => {
        isAnimating.current = true
        scale1.start(scale(1, 1), transition(delay)).then()
        scale2.start(scale(1, 1), transition(delay + 0.1)).then()
        scale3.start(scale(1, 1), transition(delay + 0.2)).then()
        scale4.start(scale(1, 1), transition(delay + 0.3)).then()
        scale5.start(scale(1, 1), transition(delay + 0.4)).then()
        scale6.start(scale(1, 1), transition(delay + 0.5)).then()
        scale7.start(scale(1, 1), transition(delay + 0.6)).then(() => {
            isExpanded.current = true
            isAnimating.current = false
        })
    }, [])

    const collapse = useCallback((delay: number = 0) => {
        isAnimating.current = true
        scale7.start(scale(0, 0), transition(delay)).then()
        scale6.start(scale(0, 0), transition(delay + 0.1)).then()
        scale5.start(scale(0, 0), transition(delay + 0.2)).then()
        scale4.start(scale(0, 0), transition(delay + 0.3)).then()
        scale3.start(scale(0, 0), transition(delay + 0.4)).then()
        scale2.start(scale(0, 0), transition(delay + 0.5)).then()
        scale1.start(scale(0, 0), transition(delay + 0.6)).then(() => {
            isExpanded.current = false
            isAnimating.current = false
            expand(1)
        })
    }, [])

    useEffect(() => {
        if (window.innerWidth >= 1024 || !container.current) {
            expand(0.6)
            return
        }
        const observer = new IntersectionObserver((es) => {
            es.forEach(e => {
                if (e.target === container.current && e.isIntersecting && !isExpanded.current) {
                    expand(0.2)
                }
            })
        }, {threshold: 1})
        observer.observe(container.current)

        return () => {
            if (container.current) {
                observer.unobserve(container.current)
            }
        }
    }, [])

    const initialScale = {scale: 0, opacity: 0}

    return (
        <motion.div
            ref={container}
            className={`relative pt-[70.14%] cursor-pointer opacity-0 ${className}`}
            transition={transition(0.1)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            onClick={() => {
                if (isAnimating.current || !isExpanded.current) {
                    return
                }
                collapse()
            }}>
            <img
                className="absolute left-[17.3%] bottom-0 w-[73.02%] object-contain"
                src="/assets/images/about/android/android_mid.png"
                alt=""
            />
            <motion.img
                className="absolute left-[23.97%] bottom-[38.9%] w-[50.53%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_1.png"
                alt=""
                initial={initialScale}
                animate={scale1}
            />
            <motion.img
                className="absolute left-[3.78%] bottom-[61.2%] w-[23.97%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_2.png"
                alt=""
                initial={initialScale}
                animate={scale2}
            />
            <motion.img
                className="absolute right-[8.53%] bottom-[5.98%] w-[21.15%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_3.png"
                alt=""
                initial={initialScale}
                animate={scale3}
            />
            <motion.img
                className="absolute left-[2.67%] bottom-[6.68%] w-[27.96%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_4.png"
                alt=""
                initial={initialScale}
                animate={scale4}
            />
            <motion.img
                className="absolute right-0 top-0 w-[30.08%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_5.png"
                alt=""
                initial={initialScale}
                animate={scale5}
            />
            <motion.img
                className="absolute left-0 bottom-[33.4%] w-[23.97%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_6.png"
                alt=""
                initial={initialScale}
                animate={scale6}
            />
            <motion.img
                className="absolute left-[37.67%] bottom-[9.82%] w-[23.97%] object-contain scale-0 opacity-0"
                src="/assets/images/about/android/scale/android_scale_7.png"
                alt=""
                initial={initialScale}
                animate={scale7}
            />
        </motion.div>
    )
}

export default HeroAbout