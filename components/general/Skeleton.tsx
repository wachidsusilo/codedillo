
interface Props {
    className?: string
}

const Skeleton = ({className}: Props) => {
    return (
        <div className={`flex items-center h-[58px] px-[15px] rounded-md ${className}`}>
            <div className="w-5.5 h-5.5 mr-[15px] bg-white/[0.15] rounded-[5px]"></div>
            <div className="flex flex-col flex-grow text-xsm flex">
                <span className="mb-1.5 mr-auto flex-shrink flex-grow-0 bg-white/[0.15] text-transparent rounded-[3px]
                whitespace-nowrap leading-[1rem]">
                    SkeletonSkeletonSkeletonSkeletonSkeleton
                </span>
                <span className="bg-white/[0.15] mr-auto flex-shrink flex-grow-0 text-transparent rounded-[3px] whitespace-nowrap
                overflow-hidden leading-[1rem]">
                    SkeletonSkeletonSkeletonSkeletonSkeletonSkeletonSkeleton
                </span>
            </div>
        </div>
    )
}

export default Skeleton