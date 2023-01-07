
interface Props {
    className: string | undefined,
    active?: boolean,
    onClick?: () => void
}

const Hamburger = ({className, active = false, onClick}: Props) => {
    return (
        <div className={`w-6 h-6 z-50 cursor-pointer ${className ? className : ""}`} onClick={onClick}>
            <div className={`relative w-full h-full rotate-0 transition duration-500 ${active && "rotate-180"}`}>
                <div className={`absolute w-full h-[1px] top-[15%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition bg-white ${active && "!top-[50%] -rotate-45"}`}></div>
                <div className={`absolute w-full h-[1px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition bg-white ${active && "!top-[50%] opacity-0"}`}></div>
                <div className={`absolute w-full h-[1px] top-[85%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition bg-white ${active && "!top-[50%] rotate-45"}`}></div>
            </div>
        </div>
    )
}

export default Hamburger