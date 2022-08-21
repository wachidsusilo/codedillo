
interface Props {
    className?: string
}

const AboutEducation = ({className = ""}: Props) => {
    return (
        <section className={`w-full max-w-container mx-auto flex flex-col gap-8 ${className}`}>
            <div className="flex gap-4 items-center">
                <img
                    className="h-8 object-contain"
                    src="/assets/images/about/education_icon.png"
                    alt=""/>
                <h1 className="text-xl text-white/90 font-medium">Education</h1>
            </div>
            <div className="w-full flex gap-8 rounded-xl">
                <div className="w-72 h-80 bg-green/10"></div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-medium">Bachelor of Education in Physics Education</h2>
                        <p className="mt-2 text-md text-white/60">Faculty of Science and Mathematics</p>
                        <p className="mt-0.5 text-md text-white/60">Universitas Kristen Satya Wacana</p>
                        <p className="mt-0.5 text-md text-white/60">Salatiga, Indonesia</p>
                        <p className="mt-0.5 text-md text-white/60">2022</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-medium">Bachelor of Science in Physics</h2>
                        <p className="mt-2 text-md text-white/60">Faculty of Science and Mathematics</p>
                        <p className="mt-0.5 text-md text-white/60">Universitas Kristen Satya Wacana</p>
                        <p className="mt-0.5 text-md text-white/60">Salatiga, Indonesia</p>
                        <p className="mt-0.5 text-md text-white/60">2022</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutEducation