"use client"
// src/app/rewards/page.tsx
import React from "react"
import {getAllRewards} from "@/app/server/data"
import QRCode from "react-qr-code"

export default async function RewardsPage() {
    const rewards = await getAllRewards()

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md font-serif'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>All Rewards</h1>
            <div>
                {rewards.map((reward) => {
                    const meta = reward.meta as {description: string}
                    return (
                        <div key={reward.id} className='mb-6 p-4 bg-gray-100 rounded-lg'>
                            <h2 className='text-2xl font-semibold'>{reward.name}</h2>
                            <p>{meta.description}</p>
                            <div
                                className='mt-4'
                                style={{display: "flex", justifyContent: "center"}}
                            >
                                <QRCode
                                    value={`https://localhost:3000/rewards/confirm?rewardId=${reward.id}`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
