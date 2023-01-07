import { useCallback, useEffect, useRef } from 'react'

interface Selection {
    left: boolean
    right: boolean
    top: boolean
    bottom: boolean
    inside: boolean
}

interface Rect {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
}

interface Point {
    x: number
    y: number
}

interface Circle extends Point {
    radius: number
}

interface Props {
    open: boolean
    imageFile: File | null

    onSave?(base64: string): void

    onCancel?(): void
}

const ImageResizer = ({open, onSave, onCancel, imageFile}: Props) => {
    const imageRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const circle = useRef<Circle>({x: 0, y: 0, radius: 0})
    const handleTop = useRef<Point>({x: 0, y: 0})
    const handleBottom = useRef<Point>({x: 0, y: 0})
    const handleLeft = useRef<Point>({x: 0, y: 0})
    const handleRight = useRef<Point>({x: 0, y: 0})
    const handleWidth = useRef<number>(8)
    const overlayClick = useRef<boolean>(false)
    const selection = useRef<Selection | null>(null)
    const cursorOrigin = useRef<Point>({x: 0, y: 0})
    const circleOrigin = useRef<Circle>({x: 0, y: 0, radius: 0})
    const boundary = useRef<Rect>({left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0})
    const lastFile = useRef<File|null>(null)
    const imageUrl = useRef<string>('')

    if (lastFile.current !== imageFile) {
        lastFile.current = imageFile
        imageUrl.current = imageFile ? URL.createObjectURL(imageFile) : ''
    }

    const drawSelection = useCallback(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context) {
            return
        }

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath()
        context.rect(0, 0, canvas.width, canvas.height)
        context.arc(
            circle.current.x * canvas.width, circle.current.y * canvas.height,
            circle.current.radius * canvas.width, 0,
            Math.PI * 2,
            true
        )
        context.fillStyle = 'rgba(0,0,0,0.7)'
        context.fill()
        context.fillStyle = 'rgba(59,130,246,1)'
        context.fillRect(handleLeft.current.x * canvas.width, handleLeft.current.y * canvas.height, handleWidth.current, handleWidth.current)
        context.fillRect(handleRight.current.x * canvas.width, handleRight.current.y * canvas.height, handleWidth.current, handleWidth.current)
        context.fillRect(handleTop.current.x * canvas.width, handleTop.current.y * canvas.height, handleWidth.current, handleWidth.current)
        context.fillRect(handleBottom.current.x * canvas.width, handleBottom.current.y * canvas.height, handleWidth.current, handleWidth.current)
    }, [])

    const getImageBoundary = useCallback((image: HTMLImageElement) => {
        const imageRatio = image.naturalWidth / image.naturalHeight
        const width = imageRatio < 1 ? image.width * imageRatio : image.width
        const height = imageRatio > 1 ? image.height / imageRatio : image.height
        const left = (image.width - width) / 2
        const top = (image.height - height) / 2

        return {
            width: width / image.width,
            height: height / image.height,
            left: left / image.width,
            top: top / image.height,
            right: (width + left) / image.width,
            bottom: (height + top) / image.height
        }
    }, [])

    const isHaveSpace = useCallback((dir: 'left' | 'right' | 'top' | 'bottom') => {
        switch (dir) {
            case 'left':
                return circle.current.x - circle.current.radius > boundary.current.left
            case 'right':
                return circle.current.x + circle.current.radius < boundary.current.right
            case 'top':
                return circle.current.y - circle.current.radius > boundary.current.top
            case 'bottom':
                return circle.current.y + circle.current.radius < boundary.current.bottom
        }
    }, [])

    const checkRadius = useCallback(() => {
        if (circle.current.radius < 0.1) {
            circle.current.radius = 0.1
        }

        if (circle.current.x - circle.current.radius < boundary.current.left) {
            if (isHaveSpace('right')) {
                const dx = circle.current.radius - (circle.current.x - boundary.current.left)
                circle.current.x += dx
            } else {
                circle.current.radius = circle.current.x - boundary.current.left
            }
        }

        if (circle.current.x + circle.current.radius > boundary.current.right) {
            if (isHaveSpace('left')) {
                const dx = circle.current.radius - (boundary.current.right - circle.current.x)
                circle.current.x -= dx
            } else {
                circle.current.radius = boundary.current.right - circle.current.x
            }
        }

        if (circle.current.y - circle.current.radius < boundary.current.top) {
            if (isHaveSpace('bottom')) {
                const dy = circle.current.radius - (circle.current.y - boundary.current.top)
                circle.current.y += dy
            } else {
                circle.current.radius = circle.current.y - boundary.current.top
            }
        }

        if (circle.current.y + circle.current.radius > boundary.current.bottom) {
            if (isHaveSpace('top')) {
                const dy = circle.current.radius - (boundary.current.bottom - circle.current.y)
                circle.current.y -= dy
            } else {
                circle.current.radius = boundary.current.bottom - circle.current.y
            }
        }

        if (circle.current.radius > 0.5) {
            circle.current.radius = 0.5
        }
    }, [])

    const checkPosition = useCallback(() => {
        if (circle.current.x - circle.current.radius < boundary.current.left) {
            circle.current.x = boundary.current.left + circle.current.radius
        }

        if (circle.current.x + circle.current.radius > boundary.current.right) {
            circle.current.x = boundary.current.right - circle.current.radius
        }

        if (circle.current.y - circle.current.radius < boundary.current.top) {
            circle.current.y = boundary.current.top + circle.current.radius
        }

        if (circle.current.y + circle.current.radius > boundary.current.bottom) {
            circle.current.y = boundary.current.bottom - circle.current.radius
        }
    }, [])

    useEffect(() => {
        const image = imageRef.current
        const canvas = canvasRef.current

        if (!image || !canvas) {
            return
        }

        const context = canvas.getContext('2d')
        if (!context) {
            return
        }

        image.onload = () => {
            circle.current.x = 0.5
            circle.current.y = 0.5
            circle.current.radius = 0.25

            boundary.current = getImageBoundary(image)
            checkRadius()
            calculateHandle()
            drawSelection()
        }

        const calculateHandle = () => {
            const radius = (handleWidth.current / 2) / canvas.width
            handleTop.current.x = circle.current.x - radius
            handleTop.current.y = circle.current.y - circle.current.radius - radius

            handleBottom.current.x = circle.current.x - radius
            handleBottom.current.y = circle.current.y + circle.current.radius - radius

            handleLeft.current.x = circle.current.x - circle.current.radius - radius
            handleLeft.current.y = circle.current.y - radius

            handleRight.current.x = circle.current.x + circle.current.radius - radius
            handleRight.current.y = circle.current.y - radius
        }

        canvas.width = image.width
        canvas.height = image.height

        calculateHandle()

        const isInsideCircle = (point: Point, circle: Circle) => {
            return (point.x - circle.x) * (point.x - circle.x) + (point.y - circle.y) * (point.y - circle.y) < circle.radius * circle.radius
        }

        const isInsideRect = (point: Point, target: Point, size: number) => {
            return (point.x > target.x - size) && (point.x < target.x + 2 * size) && (point.y > target.y - size) && (point.y < target.y + 2 * size)
        }

        const getMousePosition = (x: number, y: number) => {
            const point = {x: x / canvas.width, y: y / canvas.height}
            const size = handleWidth.current / canvas.width

            return {
                inside: isInsideCircle(point, circle.current),
                top: isInsideRect(point, handleTop.current, size),
                bottom: isInsideRect(point, handleBottom.current, size),
                left: isInsideRect(point, handleLeft.current, size),
                right: isInsideRect(point, handleRight.current, size)
            }
        }

        canvas.onmousedown = (e) => {
            e.stopPropagation()
            const rect = canvas.getBoundingClientRect()
            const x = Math.round(e.x - rect.x)
            const y = Math.round(e.y - rect.y)

            selection.current = getMousePosition(x, y)

            cursorOrigin.current.x = x
            cursorOrigin.current.y = y

            circleOrigin.current.x = circle.current.x
            circleOrigin.current.y = circle.current.y
            circleOrigin.current.radius = circle.current.radius
        }

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()

            const x = Math.round(e.x - rect.x)
            const y = Math.round(e.y - rect.y)

            if (!selection.current) {
                const pos = getMousePosition(x, y)

                if (pos.top || pos.bottom) {
                    canvas.style.cursor = 'ns-resize'
                } else if (pos.left || pos.right) {
                    canvas.style.cursor = 'ew-resize'
                } else if (pos.inside) {
                    canvas.style.cursor = 'move'
                } else {
                    canvas.style.cursor = 'default'
                }

                return
            }

            const dx = (x - cursorOrigin.current.x) / canvas.width
            const dy = (y - cursorOrigin.current.y) / canvas.height

            if (selection.current.top) {
                circle.current.radius = circleOrigin.current.radius - dy
                checkRadius()
            } else if (selection.current.bottom) {
                circle.current.radius = circleOrigin.current.radius + dy
                checkRadius()
            } else if (selection.current.left) {
                circle.current.radius = circleOrigin.current.radius - dx
                checkRadius()
            } else if (selection.current.right) {
                circle.current.radius = circleOrigin.current.radius + dx
                checkRadius()
            } else if (selection.current.inside) {
                circle.current.x = circleOrigin.current.x + dx
                circle.current.y = circleOrigin.current.y + dy
                checkPosition()
            }

            calculateHandle()
            drawSelection()
        }

        const onMouseup = () => {
            if (selection.current) {
                selection.current = null
            }
        }

        const onResize = () => {
            canvas.width = image.width
            canvas.height = image.height
            drawSelection()
        }

        drawSelection()

        window.addEventListener('resize', onResize)
        window.addEventListener('mouseup', onMouseup)
        window.addEventListener('mousemove', onMouseMove)

        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mouseup', onMouseup)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] overflow-hidden cursor-pointer
         ${open ? 'h-screen' : 'h-0'}`}
             onMouseDown={() => {
                 overlayClick.current = true
             }}
             onClick={() => {
                 if (onCancel && overlayClick.current) {
                     onCancel()
                 }
                 overlayClick.current = false
             }}>
            <div
                className="absolute w-[calc(100%-1rem)] max-w-[500px] rounded-lg bg-[#1e1b26] overflow-hidden cursor-default"
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div className="relative w-full pt-[100%]">
                    <div className="absolute inset-0 p-4 flex flex-col">
                        <div className="relative grow rounded-md bg-[#110d17] overflow-hidden">
                            <img ref={imageRef}
                                 className="w-full h-full object-contain"
                                 src={imageUrl.current}
                                 alt=""/>
                            <canvas ref={canvasRef} className="absolute inset-0"></canvas>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 pb-4 shrink-0 flex items-center justify-end gap-4 text-[14px]">
                    <p className="grow px-2 overflow-hidden text-ellipsis whitespace-nowrap text-white/60 text-[13px]">
                        {imageFile ? imageFile.name : ''}
                    </p>
                    <button className="px-4 py-1 shrink-0 rounded-md bg-red/15 hover:bg-red/20 text-red
                            transition shrink-on-click"
                            onClick={() => {
                                if (onCancel) {
                                    onCancel()
                                }
                            }}>
                        Cancel
                    </button>
                    <button className="px-4 py-1 shrink-0 rounded-md bg-blue/15 hover:bg-blue/20 text-blue
                            transition shrink-on-click"
                            onClick={() => {
                                const image = imageRef.current
                                if (!image) {
                                    return
                                }

                                const canvas = document.createElement('canvas')
                                const context = canvas.getContext('2d')
                                if (!context) {
                                    return
                                }

                                canvas.width = 256
                                canvas.height = 256

                                const cx = circle.current.x
                                const cy = circle.current.y
                                const cr = circle.current.radius

                                const bl = boundary.current.left
                                const bt = boundary.current.top
                                const bw = boundary.current.width
                                const bh = boundary.current.height

                                const imWidth = image.naturalWidth
                                const imHeight = image.naturalHeight
                                const imSize = imWidth > imHeight ? imWidth : imHeight

                                const x = Math.min(Math.max(Math.round(((cx - cr - bl) / bw) * imWidth), 0), imWidth)
                                const y = Math.min(Math.max(Math.round(((cy - cr - bt) / bh) * imHeight), 0), imHeight)
                                const s = Math.min(Math.max(Math.round(2 * cr * imSize), 0), imSize)

                                context.drawImage(image, x, y, s, s, 0, 0, 256, 256)

                                if (onSave) {
                                    onSave(canvas.toDataURL(imageFile?.type, 0.95))
                                }
                            }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageResizer