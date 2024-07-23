import PopQuizActions from "./PopQuizActions"

const PopQuiz = ({quiz}: {quiz: any}) => {
    return (
        <div className='bg-pink-100 p-4 rounded-md flex flex-col items-center shadow-lg'>
            <div className='bg-pink-100 px-10 rounded-md w-full max-w-md'>
                <p className='text-black text-center mb-4'>
                    {quiz?.meta?.question || "No question available"}
                </p>
            </div>
            <PopQuizActions options={quiz?.meta?.options || []} quizId={quiz?.id} />
        </div>
    )
}

export default PopQuiz
