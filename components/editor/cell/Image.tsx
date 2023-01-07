
import { useEffect, useRef, useState } from 'react'
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'
import SlideShow from '../../general/SlideShow'
import TextBox from './TextBox'
import {
    getAriaRole,
    getFontWeightClass,
    getTextAlignmentClass,
    getTextColorClass,
    getTextSizeClass,
    getTextSpacingClass
} from '../utils'
import { filePicker, isValidImage, supportedImageTypes } from '../../../utils/utils'
import { CellData, CellType } from '../../../typings'

/**
 * An interface to be used by {@link Image} as it's props.
 * @author Wachid Susilo
 */
interface Props {
    /** A CSS class name for this component. */
    className?: string

    /** Tells whether this cell is editable. */
    editable: boolean

    /** A placeholder to be displayed if the description is empty. (only shown if {@link editable} is set to true).*/
    placeholder?: string

    /** The cell type. */
    type: CellType

    /**
     * The data of images to be displayed.
     * The [url] and [text] property must be defined in each {@link CellData}.
     * The [text] property is used as the description of the image.
     * */
    data: Array<CellData>

    /** A callback to be called when this cell is getting focus. */
    onFocus?(): void

    /** A callback to be called when this cell is losing focus (blurred). */
    onBlur?(data: Array<CellData>): void
}

/**
 * @author Wachid Susilo
 * A {@link Component} to display an image in the editor.
 */
const Image = ({className = '', editable, data, type, placeholder, onFocus, onBlur}: Props) => {
    const [images, setImages] = useState<Array<CellData>>([...data])
    const [position, setPosition] = useState<number>(0)
    const [dragging, setDragging] = useState<boolean>(false)
    const dragCounter = useRef<number>(0)

    const handleUpload = (files: FileList) => {
        const newImages: Array<CellData> = [...images]
        for (let i = 0; i < files.length; i++) {
            newImages.push({
                url: URL.createObjectURL(files[i])
            })
        }
        setImages(newImages)
        if (onBlur) {
            onBlur(newImages)
        }
    }

    useEffect(() => {
        setImages([...data])
    }, [data])

    if (images.length === 0) {
        if (!editable) {
            return null
        }

        return (
            <div className={`relative w-full p-4 flex justify-center overflow-hidden ${className}`}>
                <div className="w-full h-60 flex flex-col items-center gap-2 justify-center cursor-pointer"
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='${dragging ? 'rgb(87,193,255)' : 'rgba(255,255,255,0.2)'}' stroke-width='8' stroke-dasharray='21' stroke-dashoffset='50' stroke-linecap='square'/%3e%3c/svg%3e")`,
                         borderRadius: '22px'
                     }}
                     onDragOver={(e) => e.preventDefault()}
                     onDragEnter={(e) => {
                         dragCounter.current++
                         if (isValidImage(e.dataTransfer.files)) {
                             setDragging(true)
                         }
                     }}
                     onDragLeave={() => {
                         dragCounter.current--
                         if (dragCounter.current === 0) {
                             setDragging(false)
                         }
                     }}
                     onDrop={(e) => {
                         e.preventDefault()
                         e.stopPropagation()
                         dragCounter.current = 0
                         setDragging(false)
                         handleUpload(e.dataTransfer.files)
                     }}
                     onClick={() => {
                         filePicker(
                             supportedImageTypes,
                             true,
                             (files) => {
                                 handleUpload(files)
                             })
                     }}>
                    <PhotoIcon className={`s-16 ${dragging ? 'text-blue' : 'text-white/30'}`}/>
                    <div className={dragging ? 'text-blue' : 'text-white/40'}>
                        Drop image here
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative w-full overflow-hidden ${className}`}
             onDragOver={(e) => e.preventDefault()}
             onDragEnter={(e) => {
                 dragCounter.current++
                 if (isValidImage(e.dataTransfer.files)) {
                     setDragging(true)
                 }
             }}
             onDragLeave={() => {
                 dragCounter.current--
                 if (dragCounter.current === 0) {
                     setDragging(false)
                 }
             }}
             onDrop={(e) => {
                 e.preventDefault()
                 e.stopPropagation()
                 dragCounter.current = 0
                 setDragging(false)
                 handleUpload(e.dataTransfer.files)
             }}>
            <div className={`w-full ${dragging ? 'hidden' : ''}`}>
                <SlideShow className={images.length > 1 ? 'pt-[calc(56.25%+1.5rem)]' : 'pt-[56.25%] select-none'}
                           frameClassName="top-0 bottom-0"
                           imageClassName="!object-contain"
                           imageUrls={images.map(v => v.url ?? '')}
                           onChange={position => setPosition(position)}/>
            </div>
            <TextBox
                className={`w-full mt-4 italic ${getFontWeightClass(type)} ${getTextSizeClass(type)} 
                    ${getTextSpacingClass(type)} ${dragging ? 'text-transparent' : getTextColorClass(type)} 
                    ${getTextAlignmentClass('center')}`}
                editable={editable}
                role={getAriaRole(type)}
                value={images[position]?.text}
                placeholder={placeholder}
                title={type}
                onFocus={onFocus}
                onBlur={(text) => {
                    if (onBlur) {
                        images[position].text = text
                        onBlur(images)
                    }
                }}/>
            {
                editable && (
                    <>
                        <div className={`relative ${images.length > 1 ? 'pt-[calc(56.25%+1.5rem)]' : 'pt-[56.25%]'} 
                        ${dragging ? '' : 'hidden'}`}></div>
                        <div className={`absolute inset-0 p-4 ${dragging ? '' : 'hidden'}`}>
                            <div className="w-full h-full flex flex-col items-center gap-2 justify-center cursor-pointer"
                                 style={{
                                     backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='22' ry='22' stroke='rgb(87,193,255)' stroke-width='8' stroke-dasharray='21' stroke-dashoffset='50' stroke-linecap='square'/%3e%3c/svg%3e")`,
                                     borderRadius: '22px'
                                 }}>
                                <PhotoIcon className={`s-16 ${dragging ? 'text-blue' : 'text-white/30'}`}/>
                                <div className={dragging ? 'text-blue' : 'text-white/40'}>
                                    Drop image here
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                editable && !dragging &&
                <div className={`absolute top-2 right-2 flex gap-4 ${getTextSizeClass(type)}`}>
                    <button className="px-2 py-1 flex items-center gap-2 rounded-md bg-black/20
                    shadow-[0_0_0_2px_rgba(255,255,255,0.2),0_2px_4px_2px_rgba(0,0,0,0.2)] text-white/80 z-10"
                            onClick={() => {
                                setImages(images.filter((v, i) => i !== position))
                                if (onBlur) {
                                    onBlur(images)
                                }
                            }}>
                        <TrashIcon className="s-5"/>
                        Remove
                    </button>
                    <button className="px-2 py-1 flex items-center gap-2 rounded-md bg-black/20
                    shadow-[0_0_0_2px_rgba(255,255,255,0.2),0_2px_4px_2px_rgba(0,0,0,0.2)] text-white/80 z-10"
                            onClick={() => {
                                filePicker(
                                    supportedImageTypes,
                                    true,
                                    (files) => {
                                        handleUpload(files)
                                    })
                            }}>
                        <PhotoIcon className="s-5"/>
                        Add Image
                    </button>
                </div>
            }
        </div>
    )
}

export default Image