import Link from 'next/link'
import { motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect } from 'react'

const HeroProject = () => {
    return (
        <section className="w-full flex flex-col max-w isolate overflow-hidden">
            <div
                className="relative w-full mx-auto pt-18"
                style={{
                    backgroundImage: 'url(/assets/images/project/project_hero_bg.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'clamp(720px, calc(100vw + 500px), 1950px)',
                    backgroundPosition: 'top center'
                }}>
                <motion.div
                    className="mx-auto mt-24 sm:mt-24 md:mt-40 flex flex-col max-w-[250px] sm:max-w-full opacity-0"
                    initial={{opacity:0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.7, delay: 0.3}}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center">Projects</h1>
                    <p className="mt-5 text-md sm:text-lg md:text-xl lg:text-2xl text-white/60 text-center">Make your dream project come true</p>
                    <Link href="/pages">
                        <a className="mx-auto mt-10 px-8 py-2.5 sm:mt-12 sm:px-10 sm:py-3 md:mt-14 lg:mt-16 bg-white/90
                        hover:bg-white transition text-button-fg font-medium text-md sm:text-lg md:text-xl lg:text-2xl
                        rounded-2xl shadow-[0_0_0_3px_rgba(255,255,255,0.3)] shrink-on-click">
                            Get Started
                        </a>
                    </Link>
                </motion.div>
                <div
                    className="relative left-1/2 -translate-x-1/2 w-full max-w-[1052px] min-w-[700px] h-auto -mt-28 sm:-mt-32 md:-mt-40
                    px-8 -z-10 mask-image-radial-half-top-cloud">
                    <Rocket className="w-full" />
                </div>
            </div>
        </section>
    )
}

const Rocket = ({className}: {className?: string}) => {
    const rocket = useAnimationControls()
    const cloud1 = useAnimationControls()
    const cloud2 = useAnimationControls()
    const cloud3 = useAnimationControls()

    const bottomLeft = useCallback((b: number, l: number, o: number) => ({
        bottom: `${b}%`,
        left: `${l}%`,
        opacity: o
    }), [])

    const bottomRight = useCallback((b: number, r: number, o: number) => ({
        bottom: `${b}%`,
        right: `${r}%`,
        opacity: o
    }), [])

    const spring = useCallback((delay: number = 0.15) => ({type: 'spring', delay}), [])
    const linear = useCallback((duration: number, delay: number = 0.15) => ({duration, delay}), [])

    const expandRocket = useCallback((duration: number, delay: number) => {
        rocket.start(bottomLeft(29.19,27.01, 1), linear(duration, delay)).then(() => {
            collapseRocket(0)
        })
    }, [])

    const collapseRocket = useCallback((delay: number) => {
        rocket.start(bottomLeft(25,27.01, 1), linear(3, delay)).then(() => {
            expandRocket(3, 0)
        })
    }, [])

    const expand = useCallback((delay: number) => {
        cloud1.start(bottomLeft(0, 0, 1), spring(delay)).then()
        cloud2.start(bottomLeft(0, 0, 1), spring(delay + 0.1)).then()
        cloud3.start(bottomRight(0, 0, 1), spring(delay + 0.2)).then()
        rocket.start(bottomLeft(-15, 27.01, 1), linear(0.1, delay + 0.3)).then(() => {
            expandRocket(3,0)
        })
    }, [])

    useEffect(() => {
        expand(0.2)
    }, [])

    return (
        <div className={`relative pt-[50%] ${className}`}>
            <motion.img
                className="absolute right-0 bottom-0 w-full object-contain opacity-0"
                src="/assets/images/project/cloud/cloud_3.png"
                alt=""
                initial={bottomRight(-5,-5, 0)}
                animate={cloud3}
            />
            <motion.img
                className="absolute left-0 bottom-0 w-full object-contain opacity-0"
                src="/assets/images/project/cloud/cloud_2.png"
                alt=""
                initial={bottomLeft(-5,-5, 0)}
                animate={cloud2}
            />
            <motion.img
                className="absolute left-[27.01%] bottom-[29.19%] w-[7.61%] object-contain opacity-0"
                src="/assets/images/project/rocket/rocket.png"
                alt=""
                initial={bottomLeft(-15,27.01, 0)}
                animate={rocket}
            />
            <motion.img
                className="absolute left-0 bottom-0 w-full object-contain opacity-0"
                src="/assets/images/project/cloud/cloud_1.png"
                alt=""
                initial={bottomLeft(-5,0, 0)}
                animate={cloud1}
            />
        </div>
    )
}

export default HeroProject