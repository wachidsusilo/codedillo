import { XMarkIcon } from '@heroicons/react/24/outline'
import useNotification from '../hooks/UseNotification'
import { motion, AnimatePresence } from 'framer-motion'

const Snackbar = () => {
    const {notifications, removeNotification} = useNotification()

    return (
        <div className="fixed bottom-0 right-0 w-0 pb-4 overflow-visible z-50 flex flex-col items-end justify-end gap-2">
            <AnimatePresence mode='popLayout'>
                {
                    notifications.map((value) => (
                        <motion.div key={value.id}
                                    className="relative w-[calc(100vw-2rem)] md:w-[400px] mx-4 p-4 bg-[#121017] rounded-lg flex flex-col gap-2 shadow-md"
                                    initial={{opacity: 0, x: 400}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity:0, scale: 0.5}}
                                    transition={{type: 'spring', damping: 20, stiffness: 200}}
                                    layout={true}>
                            <div className="w-full flex text-[16px] text-white font-semibold">
                                <div className="grow text-blue">
                                    {value.title}
                                </div>
                                <button className="s-5 flex items-center justify-center text-white/80 hover:text-white transition"
                                        onClick={() => {
                                            removeNotification(value.id)
                                        }}>
                                    <XMarkIcon className="s-5" />
                                </button>
                            </div>
                            <div className="text-[14px] text-white/80 flex gap-2">
                                <div className="grow">{value.description}</div>
                                {
                                    value.imageUrl && (
                                        <img className={`shrink-0 object-contain rounded-md mr-2 
                                        ${value.imagePortrait ? 'w-[60px]' : 'h-[60px]'}`}
                                             src={value.imageUrl}
                                             alt="" />
                                    )
                                }
                            </div>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    )
}

export default Snackbar