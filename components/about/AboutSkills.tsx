interface Props {
    className?: string
}

const AboutSkills = ({className = ''}: Props) => {
    return (
        <section className={`w-full max-w-container mx-auto flex flex-col gap-8 ${className}`}>
            <div className="flex gap-4 items-center">
                <img
                    className="h-8 object-contain"
                    src="/assets/images/about/skill_icon.png"
                    alt=""/>
                <h1 className="text-xl text-white/90 font-medium">Skills & Experiences</h1>
            </div>
            <div className="w-full grid grid-cols-4 gap-8 rounded-xl">
                <SkillCard
                    title="Arduino"
                    description="I'm experienced in Arduino environment for at least 4 years."
                    imageUrl="/assets/images/framework_arduino.png"
                    small={true}/>
                <SkillCard
                    title="Android"
                    description="I'm developing Android app since 2018. I'm experienced with either Kotlin or Java."
                    imageUrl="/assets/images/framework_android.png"
                    small={true}/>
                <SkillCard
                    title="NextJS"
                    description="This website was developed using NextJS. So, you know what i'm capable of. &#x1F609;"
                    imageUrl="/assets/images/framework_next.png"/>
                <SkillCard
                    title="NodeJS"
                    description="I'm experienced with native NodeJS app and ExpressJS app. "
                    imageUrl="/assets/images/framework_node.png"/>
            </div>
        </section>
    )
}

interface SkillCardProps {
    title: string
    description: string
    imageUrl: string
    small?: boolean
}

const SkillCard = ({title, description, imageUrl, small = false}: SkillCardProps) => {
    return (
        <div className="w-full max-w-[400px] mx-auto flex flex-col rounded-xl bg-white/5 p-4">
            <img
                className={`h-16 object-contain ${small ? 'scale-75' : ''}`}
                src={imageUrl}
                alt=""/>
            <h2 className="mt-4 text-lg font-medium text-center">{title}</h2>
            <p className="mt-2 text-md text-white/60 text-center">{description}</p>
        </div>
    )
}

export default AboutSkills