import React from "react"

import HideAndSeek from "@/app/components/HideAndSeek"
import ObtainBadge from "@/app/components/ObtainBadge"
import PopQuiz from "@/app/components/PopQuiz"
import {CoinIcon} from "@/app/lib/CustomIcons"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {getPopQuiz, getHideAndSeek} from "../../server/data"
import AddLocation from "../../components/AddLocation"
import Theme from "../../components/Theme"

type QuestsPageParams = {
    params: {
        slug: string
    }
}

const mockBadges = [
    {
        id: "1",
        name: "Coffee Addict",
        description:
            "If you already checked in 3 cool kaffee places you can obtain this reward and get points!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/badge2.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2JhZGdlMi53ZWJwIiwiaWF0IjoxNzIxNDg3MjExLCJleHAiOjE3NTMwMjMyMTF9.DzqrrvOfQe9L2PWr1cejocv6y-MA6TFi-aKmm1ORW1o&t=2024-07-20T14%3A53%3A32.016Z"
    },
    {
        id: "2",
        name: "Explorer",
        description: "Check in at 5 different places to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/badge3.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2JhZGdlMy53ZWJwIiwiaWF0IjoxNzIxNDg3NDk1LCJleHAiOjE3NTMwMjM0OTV9.Y9xvC14kJe4gvfFi7VHVsPbpAa4VirHgvnNRUNluX5k&t=2024-07-20T14%3A58%3A15.954Z"
    },
    {
        id: "3",
        name: "Night Owl",
        description: "Check in at 3 different night clubs to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2JhZGdlLndlYnAiLCJpYXQiOjE3MjExMzY0MjUsImV4cCI6MTc1MjY3MjQyNX0.PfpwxK0uPhvEWIA0JyJTqgDPdyAmrrOd1VnTu5qyTPQ&t=2024-07-16T13%3A27%3A05.477Z"
    }
]

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

async function QuestsPage({params}: QuestsPageParams) {
    const quiz = await getPopQuiz()
    const hideAndSeek = await getHideAndSeek()

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
                <Theme />
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
