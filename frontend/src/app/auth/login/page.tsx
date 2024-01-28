'use client'
import {useRouter} from 'next/navigation'

import {useMemo, useState} from "react";
import classNames from "classnames";
import Image from "next/image";
import {llmHackApi} from "@/client/api";
import LoadingIndicator from "@/component/LoadingIndicator";

export default function LoginPage() {

    const router = useRouter()

    // State
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [linkedInProfileLink, setLinkedInProfileLink] = useState('')
    const [loading, setLoading] = useState(false)

    // Memo
    const isEmailValid = useMemo(() => {
        const regex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
        if (email === '') return false
        return regex.test(email)
    }, [email])

    const signIn = async () => {
        if (!isEmailValid) return

        try {
            setLoading(true)
            const response = await llmHackApi.post('/login', {
                email: email,
                name: name,
                linkedInUrl: linkedInProfileLink
            })
            const {userId} = response.data
            sessionStorage.setItem('AGIParty/userid', userId)

            // Check User
            const {data: meData} = await llmHackApi.get(`/user/${userId}`)
            const {survey} = meData[0]
            if (survey) {
                router.push('/')
            } else {
                router.push('/survey')
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    return <div className={classNames('h-screen', 'flex', 'flex-col')}>
        <div className={classNames('w-full h-full flex flex-row')}>
            <Image
                className={classNames('w-1/2')}
                width={1792 / 2}
                height={1024 / 2}
                style={{objectFit: 'cover'}}
                src={'/auth_background.png'} alt={'background'}/>

            <div className="w-1/2 flex flex-col justify-center content-center">
                <div className="text-center">
                    <div className="flex-col justify-center items-center gap-10 inline-flex">
                        <div className="text-center text-black text-6xl font-semibold">Hacker Match</div>
                        <span>Find the best and worst match for you here.</span>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className={classNames('mt-6', 'w-full', 'border-b-2', 'py-0', 'text-[32px]')}>
                        </input>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            type="email"
                            className={classNames('mt-4', 'w-full', 'border-b-2', 'py-0', 'text-[32px]')}>
                        </input>

                        <input
                            onChange={(e) => setLinkedInProfileLink(e.target.value)}
                            placeholder="Linkedin Profile Link"
                            className={classNames('mt-4', 'w-full', 'border-b-2', 'py-0', 'text-[32px]')}>
                        </input>

                        {loading ? <div
                                className={classNames('w-[40rem]', 'text-center', 'flex', 'justify-center', 'items-center')}>
                                <LoadingIndicator/></div> :
                            <div
                                onClick={signIn}
                                className={classNames([
                                    "w-[40rem] h-[4.375rem] px-6 py-3 rounded-xl justify-center items-center cursor-pointer",
                                    isEmailValid ? 'bg-black' : 'bg-zinc-200'
                                ])}>
                                <span className="text-white text-[32px] font-semibold">↳ Enter</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
        <div className={classNames('p-4', 'bg-zinc-200')}>
        <span>
            Find your best and worst matches here.<br/>
Team Learners is built by the team that created Korea&apos;s top fintech company, Toss, and is backed by 2 million from investors including Goodwater. We are navigating B2C business opportunities and challenges in the age of AI.<br/>
We visited SF to deepen our understanding of the AI landscape in the US market. For anyone interested in GenAI adoption in the Asian market or our perspective, please feel free to contact me. (<a
            className={classNames('text-blue-500')}
            target="_blank"
            href="mailto:sj@learners.company">sj@learners.company</a>)
        </span>
        </div>
    </div>
}
