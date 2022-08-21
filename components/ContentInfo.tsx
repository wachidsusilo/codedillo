
interface InfoProps {
    iconUrl: string
    description: string
    referenceUrl: string
    cite: string
}

const ContentInfo = ({iconUrl, description, referenceUrl, cite}: InfoProps) => {
    return (
        <div className="w-screen max-w-[400px] p-4 flex gap-6 items-center">
            <img className="s-18 object-contain" src={iconUrl} alt=""/>
            <figure className="flex flex-col">
                <blockquote
                    className="flex text-sm text-white/80"
                    cite={referenceUrl}>
                    {description}
                </blockquote>
                <figcaption className="mt-3">
                    <cite>
                        <a href={referenceUrl} target="_blank" className="text-blue-500 text-sm hover:underline">{cite}</a>
                    </cite>
                </figcaption>
            </figure>
        </div>
    )
}

export default ContentInfo