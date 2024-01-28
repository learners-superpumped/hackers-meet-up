'use client'

import {SurveyQuestion} from "@/model/survey";
import React, {useMemo, useState} from "react";
import classNames from "classnames";

export interface SurveyQuestionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    question: SurveyQuestion;
    onAnswer: (question: SurveyQuestion, answer: string) => void;
}

export function SurveyQuestionItem({question, onAnswer, ...props}: SurveyQuestionItemProps) {

    const [answer, setAnswer] = useState<string>()
    const isValid = useMemo(() => answer, [answer])

    return <div{...props}>
        <div className={classNames('w-[860px]', 'text-start', 'flex', 'flex-col')}>

            <span className={classNames('font-semibold', 'text-black', 'text-[40px]')}>
                {question.item}
            </span>

            <input
                autoFocus
                onKeyDown={(event) => {
                    // Enter 입력시 setAnswer
                    if (event.keyCode === 13 && answer) onAnswer(question, answer)
                }}
                placeholder="Type Answer"
                onChange={(e) => setAnswer(e.target.value)}
                className={classNames('mt-6', 'w-full', 'border-b-2', 'py-6', 'text-[32px]')}>

            </input>

            <div
                onClick={() => answer && onAnswer(question, answer)}
                className={classNames('w-fit h-[4.375rem] px-6 py-3 rounded-xl justify-center items-center cursor-pointer', 'mt-6',
                    isValid ? 'bg-black' : 'bg-zinc-200')}>
                <span className="text-white text-[32px] font-semibold">↳ Enter</span>
            </div>
        </div>
    </div>
}
