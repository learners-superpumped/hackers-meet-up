import Image from "next/image";
import classNames from "classnames";

export default function ResultItem({result, selected, onSelect}: {
    result: any,
    selected: boolean,
    onSelect: (result: any) => void
}) {

    const matchingScore = result?.result?.matchingScore ?? 0
    const colorText = matchingScore > 80 ? 'text-lime-700' : matchingScore > 60 ? 'text-orange-500' : 'text-yellow-400';
    const colorBorder = matchingScore > 80 ? 'border-lime-700' : matchingScore > 60 ? 'border-orange-500' : 'border-yellow-400';

    return <div
        onClick={() => onSelect(result)}
        className={classNames(
            "w-full h-fit p-5 bg-white rounded-xl border-4 flex-col justify-start items-start gap-4 inline-flex",
            selected ? colorBorder : 'border-transparent'
        )}>
        <div className="self-stretch justify-start items-start gap-1 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div
                    className="self-stretch text-black text-[28px] font-semibold leading-[39.20px]">{result?.user?.name}</div>
            </div>
        </div>
        <div className="flex-col justify-start items-start gap-1 flex">
            <div className="text-black text-base font-bold leading-none">Matching Score</div>
            <div
                className={classNames(
                    "text-[28px] font-semibold leading-[39.20px]",
                    colorText
                )}>{matchingScore.toString()}
            </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
            <div
                className="self-stretch text-black text-base font-bold leading-none">Why?
            </div>
            <div
                className="self-stretch text-black text-base font-normal leading-normal">
                <p className={classNames('whitespace-pre-wrap')}>
                    {result?.result?.reasoning?.join('\n')?.toString()}
                </p>
            </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-1 flex">
            <div
                className="self-stretch text-black text-base font-bold leading-none">Topic Suggestion
            </div>
            <div
                className="self-stretch text-black text-base font-normal leading-normal">
                <p className={classNames('whitespace-pre-wrap')}>
                    {result?.result?.topicSuggestion?.join('\n')?.toString()}
                </p>
            </div>
        </div>
        <div className="self-stretch justify-between items-center inline-flex">
            {result?.user?.linkedInUrl ?
                <div
                    onClick={() => window.open(result?.user?.linkedInUrl, '_blank')}
                    className="w-10 h-10 relative">
                    <Image
                        width={40}
                        height={40}
                        src="/linkedin.svg" alt="linkedin"/>
                </div>
                : <div className={classNames('relative')}/>}
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
