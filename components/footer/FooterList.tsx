
interface Props {
    className?: string
    title?: string
    list?: Array<string>
}

const FooterList = ({className, title, list}: Props) => {
    return (
        <ul className={`flex flex-col ${className}`}>
            <li className="text-lg font-medium mb-2">{title}</li>
            {
                list?.map((value, index) => (
                    <li key={index} className="text-md text-white/60">{value}</li>
                ))
            }
        </ul>
    )
}

export default FooterList