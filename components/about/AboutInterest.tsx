
interface Props {
    className: string
}

const AboutInterest = ({className}: Props) => {
    return (
        <section className={`w-full max-w-container mx-auto flex flex-col gap-8 ${className}`}>
            <div className="flex gap-4 items-center">
                <img
                    className="h-8 object-contain"
                    src="/assets/images/about/interest_icon.png"
                    alt=""/>
                <h1 className="text-xl text-white/90 font-medium">Interests</h1>
            </div>
            <div className="grid grid-cols-2 gap-16 pt-4">
                <div className="p-8 flex flex-col rounded-xl bg-white/5">
                    <img
                        className="h-32 object-contain"
                        src="/assets/images/about/interest_technology.png"
                        alt=""/>
                    <p className="mt-8 text-md text-center text-white/60">In my spare time, i learn new technology, write article, create video, or just develop my own projects.</p>
                </div>
                <div className="p-8 flex flex-col rounded-xl bg-white/5">
                    <img
                        className="h-32 object-contain"
                        src="/assets/images/about/interest_beach.png"
                        alt=""/>
                    <p className="mt-8 text-md text-center text-white/60">When it is holiday, i'll definitely go to the beach. I love the beach so much, it's so relaxing.</p>
                </div>
            </div>
        </section>
    )
}

export default AboutInterest