
interface Props {
    className?: string
    title?: string
    list?: Array<string>
}

const FooterList = ({className, title, list}: Props) => {
    return (
        <ul className={`flex flex-col ${className}`}>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            {
                list?.map((value, index) => (
                    <li key={index} className="text-md text-white/60">{value}</li>
                ))
            }
        </ul>
    )
}

export default FooterList