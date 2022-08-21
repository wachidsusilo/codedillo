import { CheckIcon } from '@heroicons/react/outline'

interface Props {
    className: string
}

const AboutWork = ({className}: Props) => {
    return (
        <section className={`w-full max-w-container mx-auto flex flex-col gap-8 ${className}`}>
            <div className="flex gap-4 items-center">
                <img
                    className="h-8 object-contain"
                    src="/assets/images/about/job_icon.png"
                    alt=""/>
                <h1 className="text-xl text-white/90 font-medium">What I Do</h1>
            </div>
            <ul className="flex flex-col gap-4 pl-12">
                <li className="flex gap-4">
                    <CheckIcon className="s-6 text-green" />
                    <p className="text-md text-white/60">Develop IoT devices</p>
                </li>
                <li className="flex gap-4">
                    <CheckIcon className="s-6 text-green" />
                    <p className="text-md text-white/60">Develop Web application</p>
                </li>
                <li className="flex gap-4">
                    <CheckIcon className="s-6 text-green" />
                    <p className="text-md text-white/60">Develop Android application</p>
                </li>
            </ul>
        </section>
    )
}

export default AboutWork