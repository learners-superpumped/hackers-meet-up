'use client';

import LoadingIndicator from "@/component/LoadingIndicator";
import classNames from "classnames";
import ResultItem from "@/app/dashboard/components/result";
import {useEffect, useState} from "react";
import {llmHackApi} from "@/client/api";

export default function DashboardPage() {
    const [hasResult, setHasResult] = useState<boolean | undefined>(undefined);
    const [results, setResults] = useState<any[]>([])

    useEffect(() => {
        initializeClientSide().then()
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (hasResult !== undefined) await initializeClientSide()
        }, 1000 * 10);

        return () => clearInterval(intervalId);
    }, [hasResult]);


    const initializeClientSide = async () => {
        if (typeof window === 'undefined') return
        const userId = sessionStorage.getItem('AGIParty/userid')
        if (userId === null) return

        const {data} = await llmHackApi.get(`/user/${userId}/result`)

        const hasResult = data !== null && data.length > 0
        setHasResult(hasResult)
        setResults(data)
    }

    if (hasResult === undefined) return <></>
    return <>{hasResult ? <DashboardResult results={[...results]}/> : <DashboardLoading/>}</>
}


const DashboardResult = ({results}: { results: any[] }) => {
    const [order, setOrder] = useState<'scoreASC' | 'scoreDESC'>('scoreDESC')
    const [selectedResult, setSelectedResult] = useState<any>(undefined)

    const orderedResults = [...results].sort((a, b) => {
        switch (order) {
            case "scoreASC":
                return a.result.matchingScore - b.result.matchingScore;
            case 'scoreDESC':
                return b.result.matchingScore - a.result.matchingScore;
        }
    })

    const orderAppliedTarget = orderedResults[0]

    return <>
        <div className={classNames('bg-gray-50', 'flex', 'flex-col', 'px-6', 'pb-24', 'min-h-screen')}>
            <div className={classNames('flex', 'flex-col', 'gap-3', 'py-24')}>
                <div className="w-full h-fit justify-center items-center gap-4 inline-flex">
                    <div
                        onClick={() => setOrder('scoreDESC')}
                        className={classNames(
                            "text-center text-[32px] font-semibold leading-[44.80px] cursor-pointer",
                            order === 'scoreDESC' ? 'text-black' : 'text-stone-300'
                        )}>Best
                        Match
                    </div>
                    <div
                        onClick={() => setOrder('scoreASC')}
                        className={classNames("text-center text-[32px] font-semibold leading-[44.80px] cursor-pointer",
                            order === 'scoreASC' ? 'text-black' : 'text-stone-300'
                        )}>Worst
                        Match
                    </div>
                </div>
                <div
                    className="text-center text-black text-[63.32px] font-semibold leading-[88.65px]">{orderAppliedTarget.user?.name}</div>
                <div
                    className="text-center text-black text-[32px] font-normal leading-[44.80px]">
                    {order === 'scoreDESC' ? 'The person you must talk to! 🥳' : 'Maybe later…? 😦'}
                </div>
            </div>

            <div className={classNames('grid', 'grid-cols-4', 'gap-3')}>
                {orderedResults.map((result) => <ResultItem
                    key={result.user.id}
                    selected={selectedResult?.user?.id === result.user.id}
                    onSelect={(item) => setSelectedResult(item)}
                    result={result}/>
                )}
            </div>
        </div>

        {/* Page Dimmed Overlay Right Side Chat List Container */}
        {selectedResult &&
            <div
                onClick={() => setSelectedResult(undefined)}
                className={classNames('w-full', 'bg-black', 'bg-opacity-60', 'fixed', 'top-0', 'bottom-0', 'left-0', 'right-0')}>
                <div className={classNames('flex', 'flex-row-reverse')}>
                    <div className={classNames('w-[432px]', 'bg-white', 'h-screen', 'overflow-y-scroll', 'p-6')}>
                        <div
                            className="text-black text-4xl font-semibold leading-[50.40px]">Chat
                        </div>

                        {selectedResult.result.conversations.map((conversation: any, index: number) =>
                            <div
                                key={JSON.stringify(conversation)}
                                className={classNames(index % 2 === 0 ? undefined : 'bg-sky-100')}>
                                <div
                                    className="w-full h-fit p-5 bg-white rounded-xl flex-col justify-start items-start gap-4 inline-flex">
                                    <div className="self-stretch justify-start items-start gap-1 inline-flex">
                                        <div
                                            className="grow shrink basis-0 text-black text-xl font-semibold leading-7">{conversation.persona}</div>
                                    </div>
                                    <div className="self-stretch h-fit flex-col justify-start items-start gap-1 flex">
                                        <div
                                            className="self-stretch text-black text-base font-normal leading-normal">{conversation.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        }
    </>
}

const DashboardLoading = () => {
    return <>
        <div className={classNames('w-full', 'h-screen', 'flex', 'justify-center', 'items-center')}>
            <div className="w-fit h-52 flex-col justify-center items-center gap-3 inline-flex">
                <LoadingIndicator/>
                <div
                    className="text-center text-black text-[28px] font-semibold leading-[39.20px]">Finding your best and
                    worst match...
                </div>
                <div
                    className="text-center text-neutral-600 text-2xl font-normal leading-[33.60px]">
                    Your clone is having a conversation with others.<br/>
                    This will take about 5 minutes.
                </div>

            </div>
        </div>
    </>
}
