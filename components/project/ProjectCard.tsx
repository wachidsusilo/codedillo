import Link from 'next/link'
import Tooltip from '../general/Tooltip'
import ContentInfo from '../ContentInfo'
import useProject from '../../hooks/UseProject'
import { ProjectMeta } from '../../typings'
import SlideShow from '../general/SlideShow'

interface Props {
    content: ProjectMeta
}

const ProjectCard = ({content}: Props) => {
    const {getLanguageById, getFrameworkById} = useProject()

    return (
        <div className="flex-1 flex flex-col bg-white/10 rounded-xl">
            <SlideShow
                className="w-full h-80 rounded-tl-xl rounded-tr-xl overflow-hidden"
                imageUrls={content.imageUrls}/>
            <div className="w-full p-8 pt-4 flex flex-col">
                <h3 className="text-xl font-medium">
                    {content.title}
                </h3>
                <p className="mt-2 text-md text-white/40 line-clamp-5">
                    {content.description}
                </p>
                <Link href={'/'}>
                    <a className="mt-3 mr-auto flex items-center justify-center text-md text-blue-500 hover:underline">
                        View Project
                    </a>
                </Link>
                <div className="w-full mt-4 flex gap-4 text-sm z-10">
                    <span className="text-white/60">Language:</span>
                    <ul className="flex flex-wrap items-center gap-x-2.5">
                        {
                            content.languages.map((langId, index) => {
                                const lang = getLanguageById(langId)
                                if (!lang) {
                                    return null
                                }
                                return (
                                    <Tooltip
                                        key={lang.id}
                                        content={
                                            <ContentInfo
                                                iconUrl={lang.iconUrl}
                                                description={lang.description}
                                                referenceUrl={lang.referenceUrl}
                                                cite={lang.cite}
                                            />
                                        }>
                                        <span
                                            className="hover:underline text-blue cursor-pointer">
                                            {`${lang.name}${index === content.languages.length - 1 ? '' : ','}`}
                                        </span>
                                    </Tooltip>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="w-full mt-2 xxs:mt-1 flex gap-4 text-sm z-10">
                    <span className="text-white/60">Technology:</span>
                    <ul className="flex flex-wrap items-center gap-x-2.5">
                        {
                            content.frameworks.map((frameworkId, index) => {
                                const framework = getFrameworkById(frameworkId)
                                if (!framework) {
                                    return null
                                }
                                return (
                                    <Tooltip
                                        key={framework.id}
                                        content={
                                            <ContentInfo
                                                iconUrl={framework.iconUrl}
                                                description={framework.description}
                                                referenceUrl={framework.referenceUrl}
                                                cite={framework.cite}
                                            />
                                        }>
                                        <span
                                            className="hover:underline text-blue cursor-pointer">
                                            {`${framework.name}${index === content.frameworks.length - 1 ? '' : ','}`}
                                        </span>
                                    </Tooltip>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard