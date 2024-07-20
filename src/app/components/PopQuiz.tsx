import React, {useState} from "react"

const PopQuiz = () => {
    const [quizMessage, setQuizMessage] = useState<string | null>(null)

    const handlePopQuiz = (answer: string) => {
        // Handle the answer submission logic
        setQuizMessage(`Your answer "${answer}" has been submitted!`)
    }

    return (
        <div className='bg-pink-100 p-4 rounded-md flex flex-col items-center shadow-lg'>
            <div className='bg-pink-100 px-10 rounded-md w-full max-w-md'>
                <p className='text-black text-center mb-4'>How old is the tree in Park Bota?</p>
                <div className='grid grid-cols-2 gap-4 mb-2'>
                    <button
                        className='py-1 px-2 rounded-full bg-customYellow text-white font-semibold border'
                        onClick={() => handlePopQuiz("50 years")}
                    >
                        50 years
                    </button>
                    <button
                        className='py-2 px-4 rounded-full bg-customYellow text-white font-semibold border'
                        onClick={() => handlePopQuiz("100 years")}
                    >
                        100 years
                    </button>
                    <button
                        className='py-2 px-4 rounded-full bg-customYellow text-white font-semibold border'
                        onClick={() => handlePopQuiz("150 years")}
                    >
                        150 years
                    </button>
                    <button
                        className='py-2 px-4 rounded-full bg-customYellow text-white font-semibold border'
                        onClick={() => handlePopQuiz("250 years")}
                    >
                        250 years
                    </button>
                </div>
                {quizMessage && <p className='text-green-600 mt-4'>{quizMessage}</p>}
            </div>
        </div>
    )
}

export default PopQuiz
