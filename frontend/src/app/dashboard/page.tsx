'use client';

import LoadingIndicator from "@/constant/LoadingIndicator";
import classNames from "classnames";
import ResultItem from "@/app/dashboard/components/result";

export default function DashboardPage() {
    const hasResult = true;

    return <>
        {hasResult ? <DashboardResult/> : <DashboardLoading/>}
    </>
}


const DashboardResult = () => {
    return <div className={classNames('flex', 'flex-col', 'px-6')}>
        <div className={classNames('flex', 'flex-col', 'gap-3', 'py-24')}>
            <div className="w-full h-fit justify-center items-center gap-4 inline-flex">
                <div
                    className="text-center text-black text-[32px] font-semibold leading-[44.80px] cursor-pointer">Best
                    Match
                </div>
                <div
                    className="text-center text-stone-300 text-[32px] font-semibold leading-[44.80px] cursor-pointer">Worst
                    Match
                </div>
            </div>
            <div
                className="text-center text-black text-[63.32px] font-semibold leading-[88.65px]">{'JINU'}</div>
            <div
                className="text-center text-black text-[32px] font-normal leading-[44.80px]">You
                should talk with them 🥳
            </div>
        </div>

        <div className={classNames('grid', 'grid-cols-4', 'gap-3')}>
            {new Array(10).fill(0).map((i) => <ResultItem/>)}
        </div>
    </div>
}

const DashboardLoading = () => {
    return <>
        <div className={classNames('w-full', 'h-screen', 'flex', 'justify-center', 'items-center')}>
            <div className="w-[309px] h-52 flex-col justify-center items-center gap-3 inline-flex">
                <LoadingIndicator/>
                <div
                    className="text-center text-black text-[28px] font-semibold font-['Pretendard Variable'] leading-[39.20px]">Doing
                    conversations<br/>with AGI House hackers
                </div>
                <div
                    className="text-center text-neutral-600 text-2xl font-normal font-['Pretendard Variable'] leading-[33.60px]">It
                    will take 5min average
                </div>

            </div>
        </div>
    </>
}
