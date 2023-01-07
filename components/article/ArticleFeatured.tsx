import Link from 'next/link'
import { ArticleMeta } from '../../typings'

interface Props {
    className?: string
}

const featuredList: Array<ArticleMeta> = Array(3).fill(
    {
        id: 'article',
        title: 'How to use Servo in ESP32',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, aperiam.',
        author: 'Wachid Susilo',
        profilePictureUrl: '/assets/images/profile.jpg',
        imageUrl: '/assets/images/sample_programming.jpg',
        iconUrl: '/assets/images/lightning.png',
        reads: 324,
        comments: 10
    }
)

const ArticleFeatured = ({className}: Props) => {
    return (
        <section className={`w-full flex flex-col ${className}`}>
            <div className="grow flex mx-6">
                <div className="grow max-w-container mx-auto">
                    <h2 className="text-xl font-medium">Featured</h2>
                    <p className="mt-2 text-md text-white/40">Our top articles to get you started</p>
                </div>
            </div>
            <div className="w-full lg:my-8 py-12 pr-[calc(20%-2rem)] lg:pr-0 flex overflow-x-auto scrollbar-thin-purple-dark
            scrollbar-hide mask-image-r lg:mask-image-none">
                <div className="mx-auto px-8 grid grid-cols-[18rem_18rem_18rem] gap-8">
                    {
                        featuredList.map((article, index) => (
                            <div key={index} className={`relative w-72 px-8 pt-42 pb-12 flex flex-col justify-end bg-white/10
                                rounded-[10px] overflow-hidden ${index === 1 ? 'lg:scale-105' : 'lg:scale-95'}`}>
                                <div className="absolute inset-0 bottom-1/2 mask-image-vertical">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={article.imageUrl}
                                        alt=""/>
                                </div>
                                <h3 className="max-h-14 text-xl font-medium text-center line-clamp-2 z-10 overflow-hidden
                                text-shadow-lg">
                                    {article.title}
                                </h3>
                                <p
                                    className="mt-2 text-md text-white/40 text-center line-clamp-3 z-10 text-shadow-xl"
                                    style={{
                                        lineClamp: 2
                                    }}>
                                    {article.description}
                                </p>
                                <Link
                                    href="/pages"
                                    className="mx-auto mt-6 flex items-center justify-center text-white/60
                                    hover:text-white/80 transition z-10">

                                    <img
                                        className="w-5 h-5 rounded-full object-cover"
                                        src={article.profilePictureUrl}
                                        alt=""/>
                                    <span className="ml-3 text-sm font-medium text-shadow-lg">{article.author}</span>

                                </Link>
                                <Link
                                    href="/pages"
                                    className="mt-8 py-2.5 flex items-center justify-center bg-white/10 hover:bg-white/20 text-sm
                                    font-medium rounded-md transition z-10 shrink-on-click">
                                    
                                        Read Article
                                    
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default ArticleFeatured