
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
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-8 rounded-xl">
                <div className="w-72 h-80 bg-green/10"></div>
                <div className="flex flex-col gap-8 items-center sm:items-start">
                    <div className="flex flex-col items-center sm:items-start">
                        <h2 className="text-lg font-medium text-center sm:text-start">Bachelor of Education in Physics Education</h2>
                        <p className="mt-2 text-md text-white/60 text-center sm:text-start">Faculty of Science and Mathematics</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">Universitas Kristen Satya Wacana</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">Salatiga, Indonesia</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">2022</p>
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <h2 className="text-lg font-medium text-center sm:text-start">Bachelor of Science in Physics</h2>
                        <p className="mt-2 text-md text-white/60 text-center sm:text-start">Faculty of Science and Mathematics</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">Universitas Kristen Satya Wacana</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">Salatiga, Indonesia</p>
                        <p className="mt-0.5 text-md text-white/60 text-center sm:text-start">2022</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutEducation