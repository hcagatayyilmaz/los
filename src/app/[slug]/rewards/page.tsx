"use client"

import React, {useEffect, useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import QRCode from "qrcode.react"
import {checkReward} from "@/app/server/index"

function RewardsPage() {
    const [rewardExists, setRewardExists] = useState<boolean | null>(null)
    const searchParams = useSearchParams()
    const rewardId = searchParams.get("rewardId")

    useEffect(() => {
        const fetchReward = async () => {
            if (rewardId) {
                try {
                    const reward = await checkReward({rewardId})
                    if (reward) {
                        setRewardExists(true)
                    }
                } catch (error) {
                    setRewardExists(false)
                }
            }
        }

        fetchReward()
    }, [rewardId])

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md font-serif'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>Rewards Page</h1>
            {rewardId ? (
                rewardExists === null ? (
                    <p>Checking reward...</p>
                ) : rewardExists ? (
                    <div>
                        <QRCode value={`https://your-domain.com/rewards?rewardId=${rewardId}`} />
                        <p>Reward ID: {rewardId} exists!</p>
                    </div>
                ) : (
                    <p>Reward not found.</p>
                )
            ) : (
                <p>No reward ID provided in the query parameter.</p>
            )}
        </div>
    )
}

export default RewardsPage
