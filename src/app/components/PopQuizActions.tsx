"use client"
import React, {useState} from "react"
import {submitQuiz} from "../server"

const PopQuizActions = ({options, quizId}: {options: string[]; quizId: string}) => {
    const [quizMessage, setQuizMessage] = useState<string | null>(null)

    const handlePopQuiz = async (answer: string) => {
        const response = await submitQuiz({quizId, submitted_answer: answer})
        setQuizMessage(response.message)
    }

    return (
        <div>
            <div className='grid grid-cols-2 gap-4 mb-2'>
                {options.map((option) => (
                    <button
                        key={option}
                        className='py-2 px-4 rounded-full bg-customYellow text-white font-semibold border'
                        onClick={() => handlePopQuiz(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {quizMessage && <p className='text-green-600 mt-4'>{quizMessage}</p>}
        </div>
    )
}

export default PopQuizActions
