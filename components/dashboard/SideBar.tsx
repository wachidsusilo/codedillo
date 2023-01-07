import {
    BeakerIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    DocumentTextIcon, FlagIcon,
    UserCircleIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/UseAuth'
import { useRouter } from 'next/router'
import { parseNumber } from '../../utils/utils'

const boardTypes = ['projects', 'articles', 'comments', 'activities', 'users'] as const
export type BoardType = typeof boardTypes[number]

export const isBoardType = (obj: any): obj is BoardType => {
    return typeof obj === 'string' && boardTypes.includes(obj as BoardType)
}

const getBoardType = (obj: any) => {
    if (isBoardType(obj)) {
        return obj
    }
    return undefined
}

interface Props {
    className?: string
}

const SideBar = ({className = ''}: Props) => {
    const {query: {board, page, ...queries}, push, replace} = useRouter()
    const [currentBoard, setCurrentBoard] = useState<BoardType>(getBoardType(board) ?? 'projects')
    const {user, role} = useAuth()
    const lastPage = useRef<{project: number, article: number}>({project: 1, article: 1})

    if (isBoardType(board) && board === 'projects') {
        lastPage.current.project = parseNumber(page, 1)
    }

    if (isBoardType(board) && board === 'articles') {
        lastPage.current.article = parseNumber(page, 1)
    }

    const setBoardType = (type: BoardType) => {
        if (currentBoard !== type) {
            switch (type) {
                case 'projects':
                    push({query: {board: type, page: lastPage.current.project, ...queries}}).then()
                    break
                case 'articles':
                    push({query: {board: type, page: lastPage.current.article, ...queries}}).then()
                    break
                default:
                    push({query: {board: type, ...queries}}).then()
            }
        }
    }

    useEffect(() => {
        if (isBoardType(board)) {
            setCurrentBoard(board)
        } else {
            replace({query: {board: currentBoard, page, ...queries}}).then()
        }
    }, [board])

    return (
        <div className={`fixed md:static left-0 bottom-0 w-full md:w-[250px] md:px-4 md:py-8 grid 
        md:flex md:flex-col md:gap-4 md:rounded-2xl md:border-2 md:border-white/20 z-50 md:z-auto ${className}`}
             style={{
                 gridTemplateColumns: `repeat(${role === 'admin' ? boardTypes.length : boardTypes.length - 1}, 1fr)`
             }}>
            <div className="relative w-full mb-4 hidden md:flex flex-col items-center">
                {
                    user ?
                        <img className="s-[120px] object-cover rounded-full"
                             src={user.profilePicture}
                             alt=""/>
                        :
                        <UserCircleIcon className="s-[120px] text-blue/80" />
                }
                <div className="mt-6 text-[16px]">{user?.name ?? 'Anonymous'}</div>
                <div className="mt-1 text-[14px] text-white/60">{role}</div>
            </div>
            {
                boardTypes.map((type, index) => (
                    type !== 'users' || role === 'admin' ?
                        <div key={index}
                             className={`w-full mx-auto md:mx-0 px-2 md:px-4 py-2 flex flex-col md:flex-row items-center 
                             md:items-start gap-1 md:gap-4 md:rounded-full text-[10px] md:text-[14px] cursor-pointer 
                             ${currentBoard === type ? 'bg-[#560936]' : 'bg-[#1e1b26] md:bg-transparent hover:bg-[#37343d] transition'}`}
                             onClick={() => {
                                 setBoardType(type)
                             }}>
                            {getBoardIcon(type)}
                            {getBoardTypeName(type)}
                        </div>
                        : null
                ))
            }
        </div>
    )
}

const getBoardTypeName = (type: BoardType) => {
    switch (type) {
        case 'projects':
            return 'Projects'
        case 'articles':
            return 'Articles'
        case 'comments':
            return 'Comments'
        case 'activities':
            return 'Activities'
        case 'users':
            return 'Users'
        default:
            return ''
    }
}

const getBoardIcon = (type: BoardType) => {
    switch (type) {
        case 'projects':
            return <BeakerIcon className="s-5"/>
        case 'articles':
            return <DocumentTextIcon className="s-5"/>
        case 'comments':
            return <ChatBubbleOvalLeftEllipsisIcon className="s-5"/>
        case 'activities':
            return <FlagIcon className="s-5"/>
        case 'users':
            return <UserIcon className="s-5"/>
        default:
            return null
    }
}

export default SideBar