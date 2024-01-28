'use client';
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {llmHackApi} from "@/client/api";

export default function Home() {

    const router = useRouter()

    useEffect(() => {
        if (typeof window === 'undefined') return
        handleUser().then()
    }, [])

    const handleUser = async function () {
        const userId = sessionStorage.getItem('AGIParty/userid')
        if (userId === null) {
            router.push('/auth/login')
        } else {
            const {data} = await llmHackApi.get(`/user/${userId}`)
            const {survey} = data[0]
            if (survey) {
                router.push('/dashboard')
            } else {
                router.push('/survey')
            }
        }
    }


    return (
        <div className={classNames('w-full', 'h-screen', 'flex', 'justify-center', 'items-center')}>
            <div
                className={classNames('animate-spin w-[72px] h-[72px]', 'justify-center', 'items-center', 'text-center')}>
                <svg width="73" height="72" viewBox="0 0 73 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M36.5 12V6C32.5603 6 28.6593 6.77597 25.0195 8.28361C21.3797 9.79126 18.0726 12.001 15.2868 14.7868C9.66071 20.4129 6.5 28.0435 6.5 36H12.5C12.5 29.6348 15.0286 23.5303 19.5294 19.0294C24.0303 14.5286 30.1348 12 36.5 12Z"
                        fill="#1570FF"/>
                </svg>
            </div>
        </div>
    );
}
