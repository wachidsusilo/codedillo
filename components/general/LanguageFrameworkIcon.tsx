import { FrameworkType, LangType } from '../../typings'

interface Props {
    className?: string
    type: FrameworkType | LangType
}

const LanguageFrameworkIcon = ({className = '', type}: Props) => {

    return (
        <div className={`bg-white rounded-full ${className}`}>
            <img className="w-full h-full object-contain p-1"
                 src={getImageSrc(type)}
                 alt="" />
        </div>
    )
}

/**
 * Get an image based on {@link FrameworkType} or {@link LangType}.
 * @return A {@link string} url that can be used as an image source.
 */
const getImageSrc = (type: FrameworkType | LangType) => {
    switch (type) {
        case 'cpp':
            return "/assets/images/language_cpp.png"
        case 'kt':
            return "/assets/images/language_kt.png"
        case 'ts':
            return "/assets/images/language_ts.png"
        case 'android':
            return "/assets/images/framework_android.png"
        case 'arduino':
            return "/assets/images/framework_arduino.png"
        case 'next':
            return "/assets/images/framework_next.png"
        case 'react':
            return "/assets/images/framework_react.png"
        default:
            return ""
    }
}

export default LanguageFrameworkIcon