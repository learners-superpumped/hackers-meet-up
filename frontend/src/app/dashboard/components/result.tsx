import Image from "next/image";

export default function ResultItem() {
    return <div
        className="w-full h-fit p-5 bg-white rounded-xl border-4 border-lime-700 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch justify-start items-start gap-1 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div
                    className="self-stretch text-black text-[28px] font-semibold leading-[39.20px]">{'Name'}</div>
            </div>
        </div>
        <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-black text-base font-bold leading-none">Match Score</div>
            <div className="text-lime-700 text-[28px] font-semibold leading-[39.20px]">82
            </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
            <div
                className="self-stretch text-black text-base font-bold leading-none">Why?
            </div>
            <div
                className="self-stretch text-black text-base font-normal leading-normal">I'm
                passionate about technology and innovation, particularly in AI and machine learning. Let's connect to
                exchange ideas and explore opportunities in this exciting field
            </div>
        </div>
        <div className="self-stretch justify-between items-center inline-flex">
            <div className="w-10 h-10 relative">
                <Image
                    width={40}
                    height={40}
                    src="/linkedin.svg" alt="linkedin"/>
            </div>
            <div
                className="self-stretch px-4 py-1 rounded-3xl border border-zinc-200 justify-start items-center gap-1 flex">
                <div className="w-6 h-6 relative">
                    <Image
                        width={24}
                        height={24}
                        src="/message-chat-circle.svg" alt="chat"/>
                </div>
                <div className="text-neutral-800 text-base font-bold leading-normal">Chat history</div>
            </div>
        </div>
    </div>
}
