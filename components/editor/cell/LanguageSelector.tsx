
import { getLanguageName } from '../utils'
import { LangType, langTypes } from '../../../typings'

interface Props {
    className?: string
    open: boolean

    onSelected?(lang: LangType): void
}

const LanguageSelector = ({className = '', open, onSelected}: Props) => {
    return (
        <div
            className={`absolute bottom-8 right-4 flex flex-col bg-bg rounded-lg overflow-hidden transition-[height] ${className}`}
            style={{
                height: open ? `${langTypes.length * 22 + 16}px` : '0px'
            }}>
            <div style={{height: `${langTypes.length * 22 + 16}px`}}>
                {
                    langTypes.map((value, index) => (
                        <div key={index} className="px-3 h-[22px] flex items-center cursor-pointer
                                        hover:bg-white/10 first:mt-2 last:mb-2 select-none"
                             onClick={(e) => {
                                 e.stopPropagation()
                                 if (onSelected) {
                                     onSelected(value)
                                 }
                             }}>
                            {getLanguageName(value)}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LanguageSelector