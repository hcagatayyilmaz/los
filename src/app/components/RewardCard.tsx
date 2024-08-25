"use client"

import {CoinIcon} from "../lib/CustomIcons"
import QRCode from "./QRCode"
import React, {useState} from "react"
import {redeemReward} from "@/app/server/index"

export const RewardCard = ({reward}: any) => {
    const [showQRCode, setShowQRCode] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [message, setMessage] = useState("")
    console.log("Reward:", reward)

    const handleObtainClick = async () => {
        try {
            console.log("Redeeming reward:", reward.id)
            const response = await redeemReward(reward.id)
            setMessage(response.message)
            if (response.success) {
                setClaimed(true)
                setShowQRCode(!showQRCode)
            } else {
                console.error("Failed to claim reward")
            }
        } catch (error: any) {
            console.error("Error claiming reward:", error)
            setMessage(error.message)
        }
    }

    return (
        <div className='w-full  bg-white rounded-xl shadow-xl p-4 flex flex-col border border-gray-300 mb-4'>
            <div className='flex'>
                <div className='w-full px-2'>
                    <div className='flex items-center justify-between mb-2'>
                        <h2 className='text-md font-bold text-wrap'>{reward.name_en}</h2>
                        <div className='flex items-center'>
                            <div className='relative flex items-center justify-center  text-customYellow text-md font-bold py-1 px-2 rounded-full'>
                                <span className='flex items-center justify-center'>
                                    {reward.points}
                                </span>
                                <CoinIcon className='w-5 h-5 text-customYellow absolute right-[-1px] top-0 transform translate-x-1/2 -translate-y-1/2' />
                            </div>
                        </div>
                    </div>
                    <p className='text-gray-500 text-xs text-wrap'>{reward.description_en}</p>
                </div>
            </div>
            <div className='w-full my-2 flex flex-col items-end gap-1'>
                {message && (
                    <div
                        className={`w-full text-sm ${
                            claimed ? "text-customYellow px-2" : "text-[#e20000] px-2"
                        }`}
                    >
                        {message}
                    </div>
                )}
                <button
                    className={`bg-black w-full text-white py-1 px-2 rounded-full text-sm font-semibold ${
                        claimed ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleObtainClick}
                    disabled={claimed}
                >
                    {claimed ? "Reward Claimed" : "Claim the Reward!"}
                </button>
            </div>
            {showQRCode && (
                <div className='mt-4 flex justify-center'>
                    <QRCode id={reward.id} />
                </div>
            )}
        </div>
    )
}

export default RewardCard
