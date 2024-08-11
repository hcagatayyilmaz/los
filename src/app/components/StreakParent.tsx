import Streak from "./Streak"
import React from "react"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function StreakParent() {
    return (
        <div className='w-full flex flex-col gap-4'>
            <h1 className={`px-6 mt-2 text-xl font-bold ${museoModerno.className}`}>Streak!</h1>
            <p className={`px-6 ${museoModerno.className} text-sm`}>
                Visit places with tree icon on the map to get rewards!
            </p>
            <div className='flex flex-row flex-wrap gap-4 px-4'>
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
