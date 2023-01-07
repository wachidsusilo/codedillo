import Link from 'next/link'
import { ArrowRightIcon, BeakerIcon } from '@heroicons/react/24/outline'

const Hero = () => {
    return (
        <section className="relative w-full block">
            <div className="absolute max-w-full top-0 left-0 right-0 flex justify-center -z-10 !overflow-hidden">
                <img
                    className="mx-auto -mt-32 min-w-[1000px] max-w-[1500px] w-full object-contain"
                    alt=""
                    src="/assets/images/splash.png"/>
            </div>
            <div className="w-full max-w-container px-6 md:px-8 m-auto flex flex-col items-center">
                <div className="relative w-full mt-32 md:mt-40 lg:mt-60 flex">
                    <div className="w-full lg:w-[60%] pt-[calc(70%+3rem)] sm:pt-[calc(60%+4rem)]  md:pt-[calc(40%+4rem)]
                    lg:pt-0 md:px-11 flex flex-col items-center lg:items-start">
                        <h1 className="text-2.5xl md:text-4xl lg:mt-[7%] font-medium">Hey, I'm Wachid.</h1>
                        <p className="text-white/60 text-mxl md:text-xl mt-6 lg:mt-8 leading-8 text-center lg:text-start">
                            A software developer from Semarang, Indonesia. I create Arduino based IoT device with full
                            support of Web and Android App.
                        </p>
                        <Link
                            href="/projects"
                            className="px-5 py-3 mx-auto lg:ml-0 lg:mr-auto mt-8 lg:mt-10 border border-blue bg-blue-transparent
                            rounded-full hover:bg-blue/30 cursor-pointer shrink-on-click font-medium text-sm md:text-md">
                                My Projects
                        </Link>
                    </div>
                    <div className="absolute pt-[70%] w-[70%] sm:pt-[60%] sm:w-[60%] md:pt-[40%] md:w-[40%] lg:pt-[30%]
                    lg:w-[30%] left-0 right-0 mx-auto lg:mx-0 lg:left-auto lg:right-24 rounded-full lg:rounded-3xl bg-gradient-blue">
                        <div className="absolute top-2 left-2 right-2 bottom-2 md:top-3 md:left-3 md:right-3 md:bottom-3
                        lg:top-6 lg:left-6 lg:-right-6 lg:-bottom-6 rounded-full lg:rounded-3xl overflow-hidden">
                            <img
                                className="w-full h-full object-cover object-top"
                                alt=""
                                src="/assets/images/profile.jpg"/>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-[25%] sm:mt-[15%] lg:mt-[25%] flex items-center justify-center flex flex-col">
                    <h2 className="flex items-center justify-center text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                        Recent&nbsp;
                        <span className="text-blue">Projects&nbsp;</span>
                        <BeakerIcon
                        className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-blue"/>
                    </h2>
                    <p className="text-md md:text-lg lg:text-xl text-white/60 text-center mt-2 md:mt-3 lg:mt-4">
                        Check out our latest projects!
                    </p>
                </div>
                <div className="w-full mt-12 md:mt-16 lg:mt-18 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {
                        Array(3).fill(0).map((value, index) => (
                            <div key={index} className="w-full h-auto bg-white/5 rounded-xl p-8 flex flex-col">
                                <div className="w-16 h-16 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-2xl
                                border border-white/5 flex items-center justify-center">
                                    <img
                                        className="w-7 h-7 object-contain"
                                        src={'/assets/images/lightning.png'}
                                        alt=""/>
                                </div>
                                <h3 className="mt-8 text-2xl font-medium">
                                    {'Title'}
                                </h3>
                                <p className="mt-3 text-white/60 text-md">
                                    {'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolores ducimus minima neque rem vitae.'}
                                </p>
                                <Link href={'/'} className="mt-auto pt-8 flex">

                                    <div className="mx-auto mb-4 py-2 px-4 justify-self-end flex items-center justify-center bg-blue-transparent
                                    text-sm text-blue rounded-lg cursor-pointer hover:bg-blue/20 group shrink-on-click">
                                        <span className="mr-1.5 flex whitespace-nowrap">View Project</span>
                                        <ArrowRightIcon className="w-4 h-4 transition duration-300 group-hover:translate-x-1/4"/>
                                    </div>

                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="min-w-full max-w-[1000px] mt-14 sm:mt-18 lg:mt-24 p-0.5 md:p-1 rounded-xl
                bg-gradient-yellow-magenta">
                    <div
                        className="flex items-center px-5 py-5 md:p-10 bg-black/80 border border-solid border-white/10 rounded-xl">
                        <div className="flex-grow">
                            <h3 className="text-xl text-white hidden font-semibold sm:flex">
                                Say hello to our clients
                            </h3>
                            <p className="text-white/80 sm:mt-2">
                                Hear stories from our clients about their cool projects. See how we deliver their
                                elegant products in timely fashion.
                            </p>
                        </div>
                        <Link
                            href="/clients-stories"
                            className="ml-4 py-2 px-2 md:px-4 flex items-center justify-center bg-transparent md:bg-magenta-transparent
                            text-sm text-magenta rounded-lg cursor-pointer md:hover:bg-magenta/20 group shrink-on-click">

                            <span className="mr-1.5 hidden md:flex whitespace-nowrap">
                                View Stories
                            </span>
                            <ArrowRightIcon
                                className="w-4 h-4 transition duration-300 md:group-hover:translate-x-1/4"/>

                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero