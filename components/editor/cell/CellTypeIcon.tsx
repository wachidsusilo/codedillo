import {
    Bars2Icon, Bars3Icon,
    CodeBracketIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    ListBulletIcon, PhotoIcon, StarIcon
} from '@heroicons/react/20/solid'
import { CellType } from '../../../typings'

interface Props {
    className?: string
    type: CellType
}

const CellTypeIcon = ({className, type}: Props) => {
    switch (type) {
        case 'title':
        case 'subtitle-1':
        case 'subtitle-2':
            return <Bars2Icon className={className} />
        case 'paragraph':
            return <Bars3Icon className={className} />
        case 'tips':
            return <StarIcon className={className} />
        case 'warning':
            return <ExclamationTriangleIcon className={className} />
        case 'important':
            return <ExclamationCircleIcon className={className} />
        case 'image':
            return <PhotoIcon className={className} />
        case 'list-number':
            return <ListBulletIcon className={className} />
        case 'list-bullet':
            return <ListBulletIcon className={className} />
        case 'code-files':
            return <CodeBracketIcon className={className} />
        case 'code':
            return <CodeBracketIcon className={className} />
        default:
            return <div className={className}></div>
    }
}

export default CellTypeIcon