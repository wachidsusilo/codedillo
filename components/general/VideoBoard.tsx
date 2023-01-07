import { FilmIcon } from '@heroicons/react/24/outline'
import VideoCard from './VideoCard'

interface Props {
    className?: string
}

const VideoBoard = ({className}: Props) => {
    return (
        <div className={`w-full max-w-container mx-auto flex flex-col px-8 ${className}`}>
            <div className="w-full flex items-center justify-center flex flex-col">
                <h2 className="flex items-center justify-center text-2.5xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    Recent&nbsp;
                    <span className="text-red">Videos&nbsp;</span>
                    <FilmIcon className="w-5.5 h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-red"/>
                </h2>
                <p className="text-md md:text-lg lg:text-xl text-white/60 text-center mt-2 md:mt-3 lg:mt-4">
                    Check out our channel on YouTube!
                </p>
            </div>
            <div className="w-full mt-12 md:mt-16 lg:mt-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[2rem] gap-4">
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_8]"
                    layout='vertical'
                    buttonColor='red'
                    maxLineHead={2}
                    maxLineDesc={3} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_8] lg:row-end-[span_6]"
                    layout='vertical'
                    buttonColor='yellow'
                    maxLineHead={2}
                    maxLineDesc={2} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_8]"
                    layout='vertical'
                    buttonColor='green'
                    maxLineHead={2}
                    maxLineDesc={3} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_11]"
                    layout='vertical'
                    buttonColor='purple'
                    maxLineHead={2}
                    maxLineDesc={6} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_12]"
                    layout='vertical'
                    buttonColor='magenta'
                    maxLineHead={2}
                    maxLineDesc={7} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_12]"
                    layout='vertical'
                    buttonColor='blue'
                    maxLineHead={2}
                    maxLineDesc={7} />
                <VideoCard
                    className="row-end-[span_3] md:row-end-[span_3]"
                    layout='branding' />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_16] lg:row-end-[span_10] md:col-end-[span_2] lg:col-end-[span_3]"
                    layout='horizontal'
                    buttonColor='yellow'
                    maxLineHead={2}
                    maxLineDesc={5} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_6] md:col-end-[span_2]"
                    layout='horizontal'
                    buttonColor='green'
                    maxLineHead={2}
                    maxLineDesc={2} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_14] lg:row-end-[span_13]"
                    layout='vertical'
                    buttonColor='purple'
                    maxLineHead={2}
                    maxLineDesc={8} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_7]"
                    layout='vertical'
                    buttonColor='magenta'
                    maxLineHead={2}
                    maxLineDesc={3} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_7]"
                    layout='vertical'
                    buttonColor='purple'
                    maxLineHead={2}
                    maxLineDesc={3} />
                <VideoCard
                    className="row-end-[span_8] md:row-end-[span_16] lg:row-end-[span_10] md:col-end-[span_2] lg:col-end-[span_3]"
                    layout='horizontal-reverse'
                    buttonColor='blue'
                    maxLineHead={2}
                    maxLineDesc={5} />
            </div>
        </div>
    )
}

export default VideoBoard