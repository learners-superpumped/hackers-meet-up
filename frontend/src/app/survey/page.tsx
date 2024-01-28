'use client';
import classNames from "classnames";
import {surveyQuestions} from "@/constant/survey";
import {SurveyQuestionItem} from "@/app/survey/components/question";
import {useState} from "react";
import {SurveyQuestion} from "@/model/survey";
import {useRouter} from "next/navigation";
import LoadingIndicator from "@/constant/LoadingIndicator";

export default function SurveyPage() {

    const router = useRouter()

    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<{ question: SurveyQuestion, answer: string }[]>([])

    const submit = async () => {
        // Delay 2seconds
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined);
            }, 2000)
        })

        router.push('/dashboard')
    }

    return <div className={classNames('w-full', 'h-screen', 'py-7', 'px-5')}>

        <div className={classNames('w-full', 'h-3', 'bg-zinc-300', 'rounded-full')}>
            <div className={classNames('h-full', 'bg-blue-600', 'rounded-full')}
                 style={{width: `${(step / surveyQuestions.length) * 100}%`}}/>
        </div>

        <div className={classNames('flex', 'w-full', 'h-full', 'flex-col', 'text-center')}>
            {surveyQuestions.map((surveyQuestion, index) =>
                <SurveyQuestionItem
                    key={surveyQuestion}
                    className={classNames('flex', 'w-full', 'h-full', 'justify-center', 'items-center',
                        step == index ? 'visible' : 'hidden')}
                    question={{item: surveyQuestion}}
                    onAnswer={(question, answer) => {
                        setAnswers([...answers, {question, answer}])

                        if (step + 1 === surveyQuestions.length) {
                            submit()
                            setStep(step + 1)
                        } else {
                            setStep(step + 1)
                        }
                    }}
                />)}

            {step === surveyQuestions.length &&
                <div className={classNames('w-full', 'h-full', 'flex', 'justify-center', 'items-center')}>
                    <LoadingIndicator/>
                </div>
            }
        </div>
    </div>
}
