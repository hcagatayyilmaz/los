import PopQuizActions from "./PopQuizActions"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const PopQuiz = ({quiz}: {quiz: any}) => {
    return (
        <>
            <div className='px-6'>
                <div className='flex justify-between items-center mt-4'>
                    <h1
                        className={`font-bold text-xl ${museumModerno.className} break-words whitespace-normal`}
                    >
                        Question of the day
                    </h1>
                    <span className='inline-block'>
                        <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                            <CoinIcon className='w-4 h-4 text-white' />
                            <span className='mt-1 ml-1 text-xs text-white'>+ {40}</span>
                        </div>
                    </span>
                </div>

                <p className={`my-1 text-sm ${museumModerno.className}`}>
                    Learn more about your city with daily quizzes.
                </p>
            </div>
            <div className='bg-pink-100 p-4 rounded-md flex flex-col items-center shadow-lg'>
                <div className='bg-pink-100 px-10 rounded-md w-full max-w-md'>
                    <p className='text-black text-center mb-4'>
                        {quiz?.meta?.question || "No question available"}
                    </p>
                </div>
                <PopQuizActions options={quiz?.meta?.options || []} quizId={quiz?.id} />
            </div>
        </>
    )
}

export default PopQuiz
