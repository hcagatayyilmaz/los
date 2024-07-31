import PopQuizActions from "./PopQuizActions"
import {MuseoModerno} from "next/font/google"
import {CoinIcon} from "@/app/lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const PopQuiz = ({quiz}: {quiz: any}) => {
    return (
        <>
            <div className='mt-2 pt-1 px-6 bg-pink-100'>
                <div className='flex justify-between items-center mt-4'>
                    <h1
                        className={`font-bold text-xl ${museumModerno.className} break-words whitespace-normal`}
                    >
                        Pop Quiz
                    </h1>
                    <span className='inline-block'>
                        <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                            <CoinIcon className='w-4 h-4 text-white' />
                            <span className='mt-1 ml-1 text-xs text-white'>+ {40}</span>
                        </div>
                    </span>
                </div>

                <p className={`pt-1 text-sm ${museumModerno.className}`}>
                    Easy points while learning cool things about the Tübingen.
                </p>
            </div>
            <div className='bg-pink-100 px-4 py-2 rounded-md flex flex-col items-center shadow-lg'>
                <div className='bg-pink-100 px-10 rounded-md w-full max-w-md'>
                    <p className={`text-black text-center mb-4 ${museumModerno.className}`}>
                        {quiz?.meta?.question || "No question available"}
                    </p>
                </div>
                <PopQuizActions options={quiz?.meta?.options || []} quizId={quiz?.id} />
            </div>
        </>
    )
}

export default PopQuiz
