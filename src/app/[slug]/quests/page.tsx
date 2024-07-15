"use client"

import React, {useState} from "react"
import {useUserLocation} from "@/app/providers/useUserLocation"
import HideAndSeek from "@/app/components/HideAndSeek"
import ObtainBadge from "@/app/components/ObtainBadge"
import PopQuiz from "@/app/components/PopQuiz"

type QuestsPageParams = {
    params: {
        slug: string
    }
}

function QuestsPage({params}: QuestsPageParams) {
    const [message, setMessage] = useState<string | null>(null)
    const {userLocation} = useUserLocation()

    return (
        <div className='max-w-xl mx-auto p-6 bg-pink-100 font-sans border border-black rounded-lg'>
            <h1 className='text-4xl text-blue-700 text-center mb-6'>Quests</h1>
            <hr className='border-blue-700 mb-6' />
            <div>
                <ObtainBadge />

                <HideAndSeek
                    userLocation={userLocation}
                    setMessage={setMessage}
                    message={message}
                />

                <PopQuiz />
            </div>
        </div>
    )
}

export default QuestsPage
