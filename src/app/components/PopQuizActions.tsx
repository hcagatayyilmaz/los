"use client"
import React from "react"
import {submitQuiz} from "../server"
import {MuseoModerno} from "next/font/google"
import {toast} from "react-hot-toast"
import CustomToast from "./CustomToast" // Ensure correct path to the CustomToast component

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

const PopQuizActions = ({options, quizId}: {options: string[]; quizId: string}) => {
    const handlePopQuiz = async (answer: string) => {
        try {
            const response = await submitQuiz({quizId, submitted_answer: answer})
            toast.custom(<CustomToast message={response.message} type='success' />, {
                position: "top-center"
            })
        } catch (error: any) {
            toast.custom(<CustomToast message={error.message} type='error' />, {
                position: "top-center"
            })
        }
    }

    return (
        <div>
            <div className='grid grid-cols-2 gap-4 mb-2'>
                {options.map((option) => (
                    <button
                        key={option}
                        className={`py-1 px-2 rounded-full bg-black text-white text-sm  border `}
                        onClick={() => handlePopQuiz(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PopQuizActions
