
interface Props {
    className?: string
}

const ProjectEditor = ({className}: Props) => {
    return (
        <div className={`mx-auto w-full max-w-container flex flex-col ${className} `}>
            Project Editor
        </div>
    )
}

export default ProjectEditor