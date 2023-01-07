import useAuth from '../../hooks/UseAuth'
import { ArrowPathIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import ImageResizer from './ImageResizer'
import { filePicker, supportedImageTypes } from '../../utils/utils'
import useNotification from '../../hooks/UseNotification'

interface Props {
    className?: string
}

const AccountSetting = ({className}: Props) => {
    const [openResizer, setOpenResizer] = useState<boolean>(false)
    const [imageFile, setImageFile] = useState<File|null>(null)
    const nameRef = useRef<HTMLDivElement>(null)
    const bioRef = useRef<HTMLDivElement>(null)
    const phBio = useRef<string>('')
    const {user, updateUser} = useAuth()
    const {showNotification} = useNotification()

    useEffect(() => {
        const name = nameRef.current
        const bio = bioRef.current

        if (!name || !bio) {
            return
        }

        name.onblur = () => {
            if (!name.innerText) {
                name.replaceChildren(weirdNames[Math.round(Math.random() * (weirdNames.length - 1))])
            }
            document.getSelection()?.empty()
        }

        bio.onfocus = () => {
            if (phBio.current.length > 0) {
                phBio.current = ''
                bio.style.removeProperty('color')
                bio.replaceChildren()
            }
        }

        bio.onblur = () => {
            if (!bio.innerText) {
                phBio.current = 'Describe your self'
                bio.style.color = 'rgba(255,255,255,0.6)'
                bio.replaceChildren(phBio.current)
            }
            document.getSelection()?.empty()
        }

        const filterKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                return
            }

            if (e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                    case 'i':
                    case 'u':
                        e.preventDefault()
                        break
                }
            }
        }

        name.onkeydown = (e) => {
            if (name.innerText.length > 30 && e.key !== 'Backspace') {
                e.preventDefault()
                return
            }
            filterKey(e)

            if (!e.ctrlKey && e.key.length === 1 && !(/^[a-zA-Z.-]$/).test(e.key)) {
                e.preventDefault()
            }
        }

        bio.onkeydown = (e) => {
            if (bio.innerText.length > 200 && !e.ctrlKey && e.key !== 'Backspace') {
                e.preventDefault()
                return
            }
            filterKey(e)
        }
    }, [])

    useEffect(() => {
        const name = nameRef.current
        const bio = bioRef.current

        if (!name || !bio) {
            return
        }

        if (user && user.name) {
            name.replaceChildren(user.name)
        } else {
            name.replaceChildren(weirdNames[Math.round(Math.random() * (weirdNames.length - 1))])
        }

        if (user && user.bio) {
            bio.replaceChildren(user.bio)
        } else {
            phBio.current = 'Describe your self'
            bio.style.color = 'rgba(255,255,255,0.6)'
            bio.replaceChildren(phBio.current)
        }
    }, [user])

    return (
        <section className={`w-full max-w-container mx-auto px-8 pt-40 flex flex-col items-center justify-center ${className}`}>
            <div className="w-[calc(100%-1rem)] max-w-[256px] rounded-full overflow-hidden">
                <div className="relative pt-[100%]">
                    {
                        (user && user.profilePicture) ?
                            <img className="absolute top-0 bottom-0 left-0 right-0 object-cover"
                                 src={user.profilePicture}
                                 alt=""/>
                            :
                            <UserCircleIcon className="absolute top-0 bottom-0 left-0 right-0 text-blue/60"/>
                    }
                </div>
            </div>
            <div className="w-full max-w-[256px] mt-4 flex justify-between text-[14px]">
                <button className="p-2 rounded-md text-white/60 hover:text-white/80 flex gap-2 transition
                    justify-center"
                        onClick={() => {
                            showNotification(
                                'info',
                                'Account',
                                'Your profile picture has been changed',
                                10,
                                '/assets/images/sample_programming.jpg',
                                false
                            )
                        }}>
                    <TrashIcon className="s-5" />
                    Remove
                </button>
                <button className="p-2 rounded-md text-white/60 hover:text-white/80 flex gap-2 transition
                    justify-center"
                        onClick={() => {
                            filePicker(supportedImageTypes, false, (files) => {
                                setImageFile(files[0])
                                setOpenResizer(true)
                            })
                        }}>
                    <ArrowPathIcon className="s-5" />
                    Change
                </button>
            </div>
            <div ref={nameRef}
                 className="min-w-[200px] px-2 py-1 mt-12 text-white text-[24px] text-center focus:outline
                 focus:outline-blue rounded-md"
                 role="textbox"
                 spellCheck='false'
                 contentEditable={true}
                 onBlur={() => {
                     showNotification('info', 'Account', 'Your name has been changed successfully.', 5)
                 }}>
            </div>
            <div ref={bioRef}
                 className="min-w-[200px] max-w-[600px] px-2 py-1 mt-8 text-white/80 text-[18px] text-center
                 focus:outline focus:outline-blue rounded-md"
                 role="textbox"
                 spellCheck='false'
                 contentEditable={true}
                 onBlur={() => {
                     showNotification('info', 'Account', 'Your bio has been changed successfully.', 5)
                 }}>
            </div>
            <ImageResizer open={openResizer}
                          imageFile={imageFile}
                          onCancel={() => {
                              setImageFile(null)
                              setOpenResizer(false)
                          }}
                          onSave={(url) => {
                              // TODO Update User
                              setOpenResizer(false)
                          }} />
        </section>
    )
}

const weirdNames = [
    'The Enmempsin Apocrypha',
    'The Pnakotic Manuscripts',
    'The Ykrak Incunabulum',
    'The Celaeno Fragments',
    'The Folio of Kyne',
    'The Book of Shadows',
    'The Eltdown Shards',
    'The Enchiridion of Merkara',
    'The Vision of Cataclysm',
    'The Vision of Here',
    'The Nthlyu-Notho Esoterica',
    'The Compendium of Adin',
    'The Lexicon of the Arcane',
    'The Book of Amsur',
    'The Stone of Cybele',
    'The Mithotho Apocrypha',
    'The Enchiridion of Namzaru',
    'The Enochian Tablets',
    'The Compendium of Sumutu',
    'The Samsisu Esoterica'
]

export default AccountSetting