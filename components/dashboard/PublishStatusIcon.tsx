import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import Tooltip from '../general/Tooltip'

interface Props {
    className?: string,
    published: boolean
}

const PublishStatusIcon = ({className = '', published}: Props) => {
    return (
        <div className={`rounded-md flex items-center ${className}`}>
            <Tooltip className="!shadow-[0_0_0_1px_#36363a] !z-20"
                     content={
                         <div className="whitespace-nowrap text-white/80 p-0.5 text-[13px]">
                             {published ? 'Published' : 'Not published'}
                         </div>
                     }>
                {
                    published ?
                        <ShieldCheckIcon className="s-5 text-green"/>
                        :
                        <ShieldExclamationIcon className="s-5 text-red"/>
                }
            </Tooltip>
        </div>
    )
}

export default PublishStatusIcon