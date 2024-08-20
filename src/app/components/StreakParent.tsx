import Streak from "./Streak"
import React from "react"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function StreakParent() {
    return (
        <div className='w-full flex flex-col gap-2'>
            <h1 className={`px-4 mt-2 text-xl font-bold ${museoModerno.className}`}>
                Tübingen City Badge
            </h1>
            <p className={`px-4 ${museoModerno.className} text-sm`}>
                Check in at 5 locations to earn a limited city badge, available to the first 100
                people, unlocking exclusive offers just for badge holders and get 5 free event
                tickets for your city.
            </p>
            <div className='flex mt-2 flex-row flex-wrap gap-4 px-4'>
                <Streak completed={true} />
                <Streak completed={true} />
                <Streak completed={true} />
                <Streak />
                <Streak />
            </div>
        </div>
    )
}

export default StreakParent
