import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { isValidEmail } from '../../utils/utils'
import Link from 'next/link'

interface Props {
    className?: string
}

const LoginCard = ({className = ''}: Props) => {
    const [revealPassword, setRevealPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const email = useRef<string>('')
    const password = useRef<string>('')

    return (
        <div className={`w-full max-w-[320px] px-6 py-8 rounded-2xl bg-[#120e19] flex flex-col items-center ${className}`}>
            <img className="h-16 m-6 object-contain" src="/assets/images/app_icon.png" alt="codedillo_logo" />
            <div className="w-full mt-6 flex items-center gap-2 text-[14px]">
                <div className="w-10 h-10 shrink-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-lg
                                border border-white/5 flex items-center justify-center">
                    <EnvelopeIcon className="s-6" />
                </div>
                <input className="grow min-w-0 h-10 pl-2 border-b-[1px] border-b-white/10 autofill:bg-[#120e19]"
                       type="email"
                       spellCheck="false"
                       placeholder="Email"
                       onInput={(e) => email.current = e.currentTarget.value} />
            </div>
            <div className="relative w-full mt-6 flex items-center gap-2 text-[14px]">
                <div className="w-10 h-10 shrink-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-lg
                                border border-white/5 flex items-center justify-center">
                    <KeyIcon className="s-6" />
                </div>
                <input className="grow min-w-0 h-10 pl-2 pr-9 shadow-[0_1px_0_0_rgba(255,255,255,0.15)]"
                       type={revealPassword ? "text" : "password"}
                       spellCheck="false"
                       placeholder="Password"
                       onInput={(e) => password.current = e.currentTarget.value} />
                {
                    revealPassword ?
                        <EyeSlashIcon className="absolute s-9 right-0 px-2 cursor-pointer text-white/80 hover:text-white/100 transition"
                                      onClick={() => setRevealPassword(!revealPassword)} />
                        :
                        <EyeIcon className="absolute s-9 right-0 px-2 cursor-pointer text-white/80 hover:text-white/100 transition"
                                 onClick={() => setRevealPassword(!revealPassword)} />
                }
            </div>
            {
                error.length > 0 && (
                    <p className="w-full text-[13px] mt-6 text-red">
                        {error}
                    </p>
                )
            }
            <button className="w-full h-10 mx-auto lg:ml-0 lg:mr-auto mt-10 flex items-center justify-center
            border border-white/40 bg-white/10 rounded-full hover:bg-white/15 cursor-pointer shrink-on-click font-medium text-[14px]"
                    onClick={() => {
                        if (loading) {
                            // TODO remove setLoading
                            setLoading(false)
                            return
                        }

                        if (email.current.length === 0) {
                            setError('Email cannot be empty')
                            return
                        }

                        if (!isValidEmail(email.current)) {
                            setError('Invalid email address')
                            return
                        }

                        if (password.current.length === 0) {
                            setError('Password cannot be empty')
                            return
                        }

                        setError('')
                        setLoading(true)
                        // TODO Sign in
                    }}>
                {
                    loading ?
                        <div className="s-5 rounded-full border-2 border-white/80 border-t-transparent animate-spin"></div>
                        :
                        'Login'
                }
            </button>
            <Link href={'/login'} className="mt-4 pr-2 self-end hover:underline text-blue cursor-pointer text-[13px]">
                I need help
            </Link>
        </div>
    )
}

export default LoginCard