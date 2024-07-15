"use client"

import React, {useState} from "react"
import {submitQuiz} from "@/app/server/index"

function PopQuiz() {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [quizMessage, setQuizMessage] = useState<string | null>(null)

    const handlePopQuiz = async () => {
        if (!selectedAnswer) {
            alert("Please select an answer.")
            return
        }
        try {
            const response = await submitQuiz({
                quizId: "clylkf5ty000059kyi68merg8",
                submitted_answer: selectedAnswer
            })
            setQuizMessage(response.message)
        } catch (error) {
            if (error instanceof Error) {
                setQuizMessage(error.message)
            } else {
                setQuizMessage("An unknown error occurred.")
            }
        }
    }

    return (
        <div className='bg-yellow-200 p-4 rounded-md'>
            <h2 className='text-2xl cursor-pointer'>Question of the day!</h2>
            <div className='bg-yellow-100 p-4 rounded-md'>
                <p className='text-blue-800'>How old is the tree in Park Bota?</p>
                <div className='mb-4'>
                    <label className='block'>
                        <input
                            type='radio'
                            name='quiz'
                            value='50 years'
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className='mr-2'
                        />
                        50 years
                    </label>
                    <label className='block'>
                        <input
                            type='radio'
                            name='quiz'
                            value='100 years'
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className='mr-2'
                        />
                        100 years
                    </label>
                    <label className='block'>
                        <input
                            type='radio'
                            name='quiz'
                            value='150 years'
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className='mr-2'
                        />
                        150 years
                    </label>
                    <label className='block'>
                        <input
                            type='radio'
                            name='quiz'
                            value='250 years'
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className='mr-2'
                        />
                        250 years
                    </label>
                </div>
                <button
                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200'
                    onClick={handlePopQuiz}
                >
                    Submit Answer
                </button>
                {quizMessage && <p className='text-green-600 mt-4'>{quizMessage}</p>}
            </div>
        </div>
    )
}

export default PopQuiz
