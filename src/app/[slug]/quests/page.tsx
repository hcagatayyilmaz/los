import React from "react"

import HideAndSeek from "@/app/components/HideAndSeek"
import ObtainBadge from "@/app/components/ObtainBadge"
import PopQuiz from "@/app/components/PopQuiz"
import {CoinIcon} from "@/app/lib/CustomIcons"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {getPopQuiz, getHideAndSeek, getBadge} from "../../server/data"
import AddLocation from "../../components/AddLocation"
import Theme from "../../components/Theme"

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

            <div>
                {/* THEME COMPONENT */}
                <Theme badge={badge} />
                {/* THEME COMPONENT */}

                {/* POP QUIZ COMPONENT */}
                {quiz && <PopQuiz quiz={quiz} />}
                {/* POP QUIZ COMPONENT */}

                {/* HIDE & SEEK COMPONENT */}
                {hideAndSeek && <HideAndSeek quest={hideAndSeek} />}
                {/* HIDE & SEEK COMPONENT */}

                {/* ADD PLACE COMPONENT */}
                <AddLocation />
                {/* ADD PLACE COMPONENT */}
            </div>
        </div>
    )
}

export default QuestsPage
