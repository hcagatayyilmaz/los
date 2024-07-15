"use client"

import React, {useState} from "react"
import {useUserLocation} from "@/app/providers/useUserLocation"
import HideAndSeek from "@/app/components/HideAndSeek"
import ObtainBadge from "@/app/components/ObtainBadge"
import PopQuiz from "@/app/components/PopQuiz"
import Header from "../../components/Header"

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
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/coffee-badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2NvZmZlZS1iYWRnZS53ZWJwIiwiaWF0IjoxNzIxMDUxNTY4LCJleHAiOjE3NTI1ODc1Njh9.k8qzr9A82dt6nvk6tNe8uJ0BYcBtXvIV1szc6_MUlUg&t=2024-07-15T13%3A52%3A49.065Z"
    },
    {
        id: "2",
        name: "Explorer",
        description: "Check in at 5 different places to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/coffee-badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2NvZmZlZS1iYWRnZS53ZWJwIiwiaWF0IjoxNzIxMDUxNTY4LCJleHAiOjE3NTI1ODc1Njh9.k8qzr9A82dt6nvk6tNe8uJ0BYcBtXvIV1szc6_MUlUg&t=2024-07-15T13%3A52%3A49.065Z"
    },
    {
        id: "3",
        name: "Night Owl",
        description: "Check in at 3 different night clubs to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/coffee-badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2NvZmZlZS1iYWRnZS53ZWJwIiwiaWF0IjoxNzIxMDUxNTY4LCJleHAiOjE3NTI1ODc1Njh9.k8qzr9A82dt6nvk6tNe8uJ0BYcBtXvIV1szc6_MUlUg&t=2024-07-15T13%3A52%3A49.065Z"
    },
    {
        id: "3",
        name: "Night Owl",
        description: "Check in at 3 different night clubs to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/coffee-badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2NvZmZlZS1iYWRnZS53ZWJwIiwiaWF0IjoxNzIxMDUxNTY4LCJleHAiOjE3NTI1ODc1Njh9.k8qzr9A82dt6nvk6tNe8uJ0BYcBtXvIV1szc6_MUlUg&t=2024-07-15T13%3A52%3A49.065Z"
    },
    {
        id: "3",
        name: "Night Owl",
        description: "Check in at 3 different night clubs to earn this badge!",
        image: "https://tcggkqkumgamaeqkyxvg.supabase.co/storage/v1/object/sign/los_images/coffee-badge.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb3NfaW1hZ2VzL2NvZmZlZS1iYWRnZS53ZWJwIiwiaWF0IjoxNzIxMDUxNTY4LCJleHAiOjE3NTI1ODc1Njh9.k8qzr9A82dt6nvk6tNe8uJ0BYcBtXvIV1szc6_MUlUg&t=2024-07-15T13%3A52%3A49.065Z"
    }
]

function QuestsPage({params}: QuestsPageParams) {
    const [message, setMessage] = useState<string | null>(null)
    const {userLocation} = useUserLocation()

    return (
        <div className='max-w-xl mx-auto p-6  font-sans border border-black rounded-lg'>
            <Header />
            <hr className='border-customYellow mb-4' />
            <div>
                <h1 className='text-center font-bold text-xl'>Badges</h1>
                <p className='mb-6'>Click the badge to learn how to obtain!</p>
                <div className='grid grid-cols-3 gap-4 justify-center '>
                    {mockBadges.map((badge) => (
                        <ObtainBadge
                            key={badge.id}
                            name={badge.name}
                            description={badge.description}
                            image={badge.image}
                        />
                    ))}
                </div>
                <hr className='border-customYellow my-4' />
                <HideAndSeek
                    userLocation={userLocation}
                    setMessage={setMessage}
                    message={message}
                />
                <hr className='border-customYellow my-4' />
                <PopQuiz />
            </div>
        </div>
    )
}

export default QuestsPage
