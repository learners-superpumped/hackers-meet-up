'use client'
import {useRouter} from 'next/navigation'

import {useMemo, useState} from "react";
import classNames from "classnames";
import Image from "next/image";

export default function LoginPage() {

    const router = useRouter()

    // State
    const [email, setEmail] = useState('')

    // Memo
    const isEmailValid = useMemo(() => {
        const regex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
        if (email === '') return false
        return regex.test(email)
    }, [email])

    const signIn = () => {
        if (!isEmailValid) return
        router.push('/survey')
    }

    return <div className={classNames('w-full h-screen flex flex-row')}>
        <Image
            className={classNames('w-1/2')}
            width={1792 / 2}
            height={1024 / 2}
            style={{objectFit: 'cover'}}
            src={'/auth_background.png'} alt={'background'}/>

        <div className="w-1/2 flex flex-col justify-center content-center">
            <div className="text-center">
                <div className="flex-col justify-center items-center gap-10 inline-flex">
                    <div className="text-center text-black text-6xl font-semibold">AGI Party</div>
                    <input
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) signIn()
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        type="email"
                        className={classNames('mt-6', 'w-full', 'border-b-2', 'py-6', 'text-[32px]')}>
                    </input>
                    <div
                        onClick={signIn}
                        className={classNames([
                            "w-[40rem] h-[4.375rem] px-6 py-3 rounded-xl justify-center items-center cursor-pointer",
                            isEmailValid ? 'bg-black' : 'bg-zinc-200'
                        ])}>
                        <span className="text-white text-[32px] font-semibold">↳ Enter</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
