import Tooltip from '../../general/Tooltip'
import { ReactNode } from 'react'

interface Props {
    className?: string
    text: string
    children: ReactNode
}

const CellTooltip = ({className = '', text, children}: Props) => {
    return (
        <Tooltip className={`!shadow-[0_0_0_1px_#36363a] !z-20 ${className}`}
                 content={
                     <div className="whitespace-nowrap text-white/60 p-0.5 text-[13px]">
                         {text}
                     </div>
                 }>
            {children}
        </Tooltip>
    )
}

export default CellTooltip