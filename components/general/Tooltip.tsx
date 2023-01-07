import { ReactNode, useEffect, useRef, useState } from 'react'

type Placement = 'top' | 'bottom'

interface Props {
    className?: string
    content: string | ReactNode
    placement?: Placement
    children: ReactNode
}

const Tooltip = ({className = '', children, content, placement = 'top'}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) {
            return
        }

        let isMouseOver = false
        const onMouseEnter = () => {
            isMouseOver = false
            setOpen(true)
        }

        const onMouseLeave = () => {
            const tooltip = tooltipRef.current
            if (tooltip) {
                tooltip.onmouseenter = () => {
                    isMouseOver = true
                }
                tooltip.onmouseleave = () => {
                    isMouseOver = false
                    setOpen(false)
                }
                setTimeout(() => {
                    if (!isMouseOver) {
                        tooltip.ontransitionend = () => {
                            setOpen(false)
                        }
                        tooltip.style.opacity = '0'
                        if (placement === 'top') {
                            tooltip.style.marginBottom = '6px'
                        } else {
                            tooltip.style.marginTop = '6px'
                        }
                    }
                }, 100)
            }
        }

        container.addEventListener('mouseenter', onMouseEnter)
        container.addEventListener('mouseleave', onMouseLeave)

        return () => {
            container.removeEventListener('mouseenter', onMouseEnter)
            container.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    useEffect(() => {
        const tooltip = tooltipRef.current
        if (open && tooltip) {
            setTimeout(() => {
                tooltip.style.opacity = '1'
                if (placement === 'top') {
                    tooltip.style.marginBottom = '10px'
                } else {
                    tooltip.style.marginTop = '10px'
                }
            }, 100)
        }
    }, [open, placement])

    return (
        <div ref={containerRef} className="relative flex">
            {
                open && (
                    <div
                        key={'tooltip'}
                        ref={tooltipRef}
                        className={`absolute left-1/2 px-2 py-0.5 flex text-sm bg-bg-200 text-white rounded-xl 
                        -translate-x-1/2 opacity-0 transition-[margin,opacity] shadow-2xl cursor-default 
                        ${placement === 'top' ? 'bottom-full' : 'top-full'} ${className}`}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}>
                        <div className="relative overflow-hidden">
                            {content}
                            <span className={`absolute w-2.5 h-2.5 bg-bg-200 left-1/2 -translate-x-1/2 rotate-45 -z-10
                            ${placement === 'top' ? 'bottom-0 translate-y-1/2' : 'top-0 -translate-y-1/2'}`}></span>
                        </div>
                    </div>
                )
            }
            {children}
        </div>
    )
}

export default Tooltip