
interface Props {
    className: string
}

const ArticleEditor = ({className}: Props) => {
    return (
        <div className={`mx-auto w-full max-w-container flex flex-col ${className}`}>
        </div>
    )
}

export default ArticleEditor