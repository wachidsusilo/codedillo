import { getCellTypeName } from '../utils'
import CellTypeIcon from './CellTypeIcon'
import { CellType, cellTypes, FilterType } from '../../../typings'

interface Props {
    className?: string
    open: boolean
    filterType: FilterType

    onSelected?(lang: CellType): void
}

const CellTypeSelector = ({className = '', open, filterType, onSelected}: Props) => {

    if (filterType !== 'all') {
        return null
    }

    return (
        <div
            className={`absolute top-7 -right-[1px] flex flex-col bg-[#1e1b26] rounded-lg overflow-hidden 
            transition-[height,box-shadow] z-[9999] ${open ? 'shadow-[0_0_0_1px_#36363a,0_1px_2px_0_rgba(0,0,0,0.05)]' : ''} 
            ${className}`}
            style={{
                height: open ? `${cellTypes.length * 24 + 16}px` : '0px'
            }}>
            <div style={{height: `${cellTypes.length * 24 + 16}px`}}>
                {
                    cellTypes.map((value, index) => (
                        <div key={index} className="px-3 h-[24px] flex items-center gap-2 cursor-pointer text-white/80
                        text-[13px] hover:bg-white/10 first:mt-2 last:mb-2 select-none shadow-sm"
                             onClick={(e) => {
                                 e.stopPropagation()
                                 if (onSelected) {
                                     onSelected(value)
                                 }
                             }}>
                            <CellTypeIcon className="s-4" type={value}/>
                            {getCellTypeName(value)}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CellTypeSelector