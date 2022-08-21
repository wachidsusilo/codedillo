import Link from 'next/link'
import useArticle from '../../hooks/UseArticle'
import { animationControls, AnimationControls, motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

const HeroArticle = () => {
    const {setSearchModalOpen} = useArticle()

    return (
        <section className="w-full flex flex-col isolate">
            <motion.div
                className="relative w-full mx-auto pt-18 pb-64 overflow-hidden opacity-0"
                transition={{type: 'spring', delay: 0.1}}
                initial={{
                    opacity: 0,
                    clipPath: 'circle(50% at top)'
                }}
                animate={{
                    opacity: 1,
                    clipPath: 'circle(100% at top)'
                }}
                style={{
                    backgroundImage: 'url(/assets/images/article/article_hero_bg.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'clamp(720px, calc(100vw + 500px), 1650px)',
                    backgroundPosition: 'top center',
                    clipPath: 'circle(50% at top)'
                }}>
                <div
                    className="relative left-1/2 -translate-x-1/2 w-full min-w-[300px] h-auto px-8 flex justify-center
                    mask-image-radial-half-top">
                    <div
                        className="w-full xl:w-[550px] max-w-[450px] xl:max-w-full min-w-[300px] mt-2 sm:mt-6 xl:mt-12 mb-20">
                        <LanguageFramework className="w-full"/>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="w-full max-w-[650px] px-6 sm:px-16 mx-auto -mt-72 md:-mt-[19rem] xl:-mt-64 flex flex-col
                items-center opacity-0"
                transition={{type: 'spring', delay: 0.2}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}>
                <h1 className="text-4xl sm:text-5xl xl:text-7xl font-medium">
                    <WaveText text="Articles" />
                </h1>
                <figure className="mt-8 xl:mt-10 text-xl xl:text-2xl text-shadow-md text-white/40">
                    <motion.blockquote
                        className="text-center"
                        cite={'https://www.goodreads.com/quotes/408441-a-reader-lives-a-thousand-lives-before-he-dies-said'}
                        transition={{duration: 0.7, delay: 0.3}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}>
                        “We read to know we're not alone.”
                    </motion.blockquote>
                    <motion.figcaption
                        className="mt-4 xl:mt-6 font-semibold text-sm sm:text-md xl:text-lg text-center"
                        transition={{duration: 0.7, delay: 0.3}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}>
                        <cite>
                            ―&nbsp;
                            <Link href={'https://en.wikipedia.org/wiki/William_Nicholson_(writer)'}>
                                <a className="hover:underline">William Nicholson</a>
                            </Link>
                            ,&nbsp;
                            <Link href={'https://en.wikipedia.org/wiki/Shadowlands_(1993_film)'}>
                                <a className="hover:underline">Shadowlands</a>
                            </Link>
                        </cite>
                    </motion.figcaption>
                </figure>
                <div
                    className="w-full mx-16 lg:mx-9 mt-10 p-4 flex items-center rounded-2xl bg-white/5 border border-white/10 cursor-text z-10"
                    onClick={() => {
                        setSearchModalOpen(true)
                    }}>
                    <input
                        className="flex-grow text-sm sm:text-md text-white/40 bg-transparent outline-none cursor-text"
                        type="text"
                        disabled={true}
                        placeholder="Search articles..."/>
                    <span
                        className="px-1.5 py-0.5 hidden lg:flex rounded-md bg-white/10 text-sm scale text-white/60">CTRL</span>
                    <span
                        className="ml-1.5 px-1.5 py-0.5 hidden lg:flex rounded-md bg-white/10 text-sm text-white/60">S</span>
                </div>
            </motion.div>
        </section>
    )
}

const LanguageFramework = ({className}: { className?: string }) => {
    const lang1 = useAnimationControls()
    const lang2 = useAnimationControls()
    const lang3 = useAnimationControls()
    const lang4 = useAnimationControls()
    const lang5 = useAnimationControls()
    const lang6 = useAnimationControls()
    const lang7 = useAnimationControls()
    const framework1 = useAnimationControls()
    const framework2 = useAnimationControls()
    const framework3 = useAnimationControls()
    const framework4 = useAnimationControls()
    const framework5 = useAnimationControls()

    const topLeft = useCallback((t: number, l: number, o: number, s: number) => ({
        top: `${t}%`,
        left: `${l}%`,
        opacity: o,
        scale: s
    }), [])

    const topRight = useCallback((t: number, r: number, o: number, s: number) => ({
        top: `${t}%`,
        right: `${r}%`,
        opacity: o,
        scale: s
    }), [])

    const bottomLeft = useCallback((b: number, l: number, o: number, s: number) => ({
        bottom: `${b}%`,
        left: `${l}%`,
        opacity: o,
        scale: s
    }), [])

    const bottomRight = useCallback((b: number, r: number, o: number, s: number) => ({
        bottom: `${b}%`,
        right: `${r}%`,
        opacity: o,
        scale: s
    }), [])

    const top = useCallback((t: number, o: number, s: number) => ({top: `${t}%`, opacity: o, scale: s}), [])
    const bottom = useCallback((b: number, o: number, s: number) => ({bottom: `${b}%`, opacity: o, scale: s}), [])
    const left = useCallback((l: number, o: number, s: number) => ({left: `${l}%`, opacity: o, scale: s}), [])
    const right = useCallback((r: number, o: number, s: number) => ({right: `${r}%`, opacity: o, scale: s}), [])
    const scale = useCallback((s: number, o: number) => ({opacity: o, scale: s}), [])
    const transition = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])

    const expand = (delay: number) => {
        lang1.start(topLeft(0, 0, 1, 1), transition(delay)).then()
        lang2.start(top(3.68, 1, 1), transition(delay)).then()
        lang3.start(top(3.68, 1, 1), transition(delay)).then()
        lang4.start(topRight(0, 0, 1, 1), transition(delay)).then()
        lang5.start(left(2.77, 1, 1), transition(delay)).then()
        lang6.start(bottomRight(0, 12.5, 1, 1), transition(delay)).then()
        lang7.start(bottomLeft(4.44, 14.72, 1, 1), transition(delay)).then()
        framework1.start(scale(1, 1), transition(delay)).then()
        framework2.start(bottom(3.02, 1, 1), transition(delay)).then()
        framework3.start(scale(1, 1), transition(delay)).then()
        framework4.start(scale(1, 1), transition(delay)).then()
        framework5.start(right(3.99, 1, 1), transition(delay)).then()
    }

    useEffect(() => {
        expand(0.3)
    }, [])

    return (
        <div className={`relative pt-[73.77%] ${className}`}>
            <motion.img
                className="absolute -left-[17.26%] -top-[17.26%] w-[17.26%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_1.png"
                alt=""
                initial={topLeft(-17.26, -17.26, 0, 1.25)}
                animate={lang1}
            />
            <motion.img
                className="absolute left-[30.04%] -top-[13.13%] w-[13.13%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_2.png"
                alt=""
                initial={top(-13.13, 0, 1.25)}
                animate={lang2}
            />
            <motion.img
                className="absolute right-[28.7%] -top-[13.13%] w-[13.13%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_3.png"
                alt=""
                initial={top(-13.13, 0, 1.25)}
                animate={lang3}
            />
            <motion.img
                className="absolute -right-[17.26%] -top-[17.26%] w-[17.26%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_4.png"
                alt=""
                initial={topRight(-17.26, -17.26, 0, 1.25)}
                animate={lang4}
            />
            <motion.img
                className="absolute -left-[15.36%] top-[45.35%] w-[15.36%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_5.png"
                alt=""
                initial={left(-15.36, 0, 1.25)}
                animate={lang5}
            />
            <motion.img
                className="absolute -right-[16.12%] -bottom-[16.12] w-[16.12%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_6.png"
                alt=""
                initial={bottomRight(-16.12, -16.12, 0, 1.25)}
                animate={lang6}
            />
            <motion.img
                className="absolute -left-[13.73%] -bottom-[13.73%] w-[13.73%] object-contain scale-125 opacity-0"
                src="/assets/images/article/language/lang_7.png"
                alt=""
                initial={bottomLeft(-13.73, -13.73, 0, 1.25)}
                animate={lang7}
            />
            <motion.img
                className="absolute right-[25.83%] top-[33.53%] w-[18.49%] object-contain scale-0 opacity-0"
                src="/assets/images/article/framework/framework_1.png"
                alt=""
                initial={scale(0, 0)}
                animate={framework1}
            />
            <motion.img
                className="absolute left-[40.8%] -bottom-[19.25%] w-[19.25%] object-contain scale-125 opacity-0"
                src="/assets/images/article/framework/framework_2.png"
                alt=""
                initial={bottom(-19.25, 0, 1.25)}
                animate={framework2}
            />
            <motion.img
                className="absolute left-[35.8%] bottom-[25.3%] w-[28.7%] object-contain scale-125 opacity-0"
                src="/assets/images/article/framework/framework_3.png"
                alt=""
                initial={scale(1.25, 0)}
                animate={framework3}
            />
            <motion.img
                className="absolute left-[19.59%] top-[28.52%] w-[29.54%] object-contain scale-0 opacity-0"
                src="/assets/images/article/framework/framework_4.png"
                alt=""
                initial={scale(0, 0)}
                animate={framework4}
            />
            <motion.img
                className="absolute -right-[14.86%] top-[39.51%] w-[14.86%] object-contain scale-125 opacity-0"
                src="/assets/images/article/framework/framework_5.png"
                alt=""
                initial={right(-14.86, 0, 1.25)}
                animate={framework5}
            />
        </div>
    )
}

const WaveText = ({text}: {text: string}) => {
    const controls = useRef<Array<AnimationControls>>([])
    const lastText = useRef('')

    const linear = useCallback((delay: number = 0.15) => ({duration: 0.3, delay}), [])
    const spring = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])
    const top = useCallback((t: number) => ({top: `${t}px`}), [])

    if (lastText.current !== text) {
        lastText.current = text
        controls.current = []
        for (let i = 0; i < text.length; i++) {
            controls.current.push(animationControls())
        }
        console.log('rerender')
    }

    useEffect(() => {
        const w = window.innerWidth
        const t = w >= 640 ? -13 : w > 1280 ? -16 : -10
        controls.current.forEach((control, index) => {
            control.mount()
            control.start(top(t), linear(0.1 + index * 0.1)).then(() => {
                control.start(top(0), spring(0)).then()
            })
        })
    }, [controls])

    return (
        <>
            {
                text.split('').map((value, index) => (
                    <motion.span
                        key={index}
                        className="relative top-0"
                        initial={{top: '0px'}}
                        animate={controls.current[index] ?? {}}>
                        {value}
                    </motion.span>
                ))
            }
        </>
    )
}

export default HeroArticle