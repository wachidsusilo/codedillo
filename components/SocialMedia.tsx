import Link from 'next/link'

interface Props {
    className?: string,
    title?: string
}

const SocialMedia = ({className, title = ''}: Props) => {
    return (
        <div className={`w-full mx-auto max-w-container-lg px-8 flex flex-col ${className}`}>
            <h2 className={`${title ? 'flex' : 'hidden'} items-center justify-center text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-medium`}>
                {title}
            </h2>
            <div className="w-full mt-12 md:mt-16 lg:mt-18 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                    href="/"
                    className="w-full p-12 flex flex-col rounded-xl bg-gradient-blue">

                    <img
                        className="w-8 h-8"
                        src="/assets/images/lightning.png"
                        alt=""/>
                    <h4 className="text-lg font-medium mt-6">
                        Lorem ipsum dolor sit.
                    </h4>
                    <p className="text-md text-white/60 mt-2.5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At error illo nesciunt, quaerat reiciendis tenetur voluptatum.
                    </p>

                </Link>
                <Link href="/" className="w-full p-12 flex flex-col rounded-xl bg-gradient-red">

                    <img
                        className="w-8 h-8"
                        src="/assets/images/lightning.png"
                        alt=""/>
                    <h4 className="text-lg font-medium mt-6">
                        Lorem ipsum dolor sit.
                    </h4>
                    <p className="text-md text-white/60 mt-2.5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At error illo nesciunt, quaerat reiciendis tenetur voluptatum.
                    </p>

                </Link>
            </div>
        </div>
    );
}

export default SocialMedia