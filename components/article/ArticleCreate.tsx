import { PencilAltIcon } from '@heroicons/react/outline'
import Link from 'next/link'

interface Props {
    className: string
}

const ArticleCreate = ({className}: Props) => {
    return (
        <section className={`w-full flex justify-center ${className}`}>
            <div className="grow mx-6 max-w-container grid grid-cols-1 lg:grid-cols-[33rem_auto]
            bg-gradient-magenta-blue rounded-xl">
                <div className="w-full p-8 md:p-10 lg:p-16 flex flex-col">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10
                    bg-gradient-radial from-transparent via-white/10 to-white/30">
                        <PencilAltIcon className="w-7 h-6"/>
                    </div>
                    <h2 className="mt-6 text-xl text-shadow-md font-semibold">Write your own article</h2>
                    <p className="mt-4 text-lg text-white/80 text-shadow-md">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto deserunt error nemo
                        quaerat rerum totam vel voluptatem.
                    </p>
                    <p className="mt-4 text-lg text-white/80 text-shadow-md">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto deserunt error nemo
                        quaerat rerum totam vel voluptatem.
                    </p>
                    <Link href="/articles/create">
                        <a className="mr-auto mt-6 px-6 py-3 flex bg-white/[0.15] hover:bg-white/20 transition rounded-lg
                        text-md border border-white/30 shrink-on-click">
                            Get Started
                        </a>
                    </Link>
                </div>
                <div className="w-full h-full p-8 md:p-10 lg:p-16 flex">
                    <div className="w-full h-70% mask-image-br rounded-xl overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="/assets/images/sample_programming.jpg"
                            alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArticleCreate