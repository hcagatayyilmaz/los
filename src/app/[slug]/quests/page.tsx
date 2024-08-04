import React from "react"

import HideAndSeek from "@/app/components/HideAndSeek"

import PopQuiz from "@/app/components/PopQuiz"
import {CoinIcon} from "@/app/lib/CustomIcons"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {getPopQuiz, getHideAndSeek, getBadge} from "../../server/data"
import AddLocation from "../../components/AddLocation"

import Badge from "../../components/Badge"
import StreakParent from "../../components/StreakParent"

type QuestsPageParams = {
    params: {
        slug: string
    }
}

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

async function QuestsPage({params}: QuestsPageParams) {
    const quiz = await getPopQuiz()
    const hideAndSeek = await getHideAndSeek()
    const badge = await getBadge()

    return (
        <div className='max-w-xl mx-auto py-2  font-sans border rounded-lg'>
            <div className={`flex items-center justify-center bg-white border-b `}>
                <Link href={"/tuebingen"}>
                    <div
                        className={`flex items-center bg-white px-4 py-1 text-center space-x-2 ${museumModerno.className}`}
                        style={{border: "1px dashed white"}}
                    >
                        <h1 className='text-3xl flex items-end font-medium text-center'>
                            <span className={`text-black ${museumModerno.className}`}>Los</span>
                            <div className='w-[12px] h-[12px] bg-customYellow border border-white border-dashed rounded-full ml-[2px] mb-2'></div>
                        </h1>
                        <div className='flex items-end justify-end mt-2'>
                            <h2 className='text-md font-semibold text-customYellow'>Tübingen</h2>
                        </div>
                    </div>
                </Link>
            </div>

            <div className='px-6 mt-6'>
                <p className={`my-1 text-sm ${museumModerno.className} mb-1`}>
                    Complete the get points and rewards. Choose any quest to start.
                </p>
            </div>

            <div>
                {/* BADGE COMPONENT */}
                {badge && <Badge data={badge} />}
                {/* BADGE COMPONENT */}
                {/* STREAK COMPONENT */}
                <AddLocation />
                {/* ADD PLACE COMPONENT */}
                {/* <StreakParent /> */}
                {/* STREAK COMPONENT */}
                {/* POP QUIZ COMPONENT */}
                {quiz && <PopQuiz quiz={quiz} />}
                {/* POP QUIZ COMPONENT */}
                {/* HIDE & SEEK COMPONENT */}
                {hideAndSeek && <HideAndSeek quest={hideAndSeek} />}
                {/* HIDE & SEEK COMPONENT */}
                {/* ADD PLACE COMPONENT */}
            </div>
        </div>
    )
}

export default QuestsPage
