"use client"
import {CoinIcon} from "../lib/CustomIcons"
import QRCode from "./QRCode"
import React, {useState} from "react"

export const RewardCard = ({reward}: any) => {
    const [showQRCode, setShowQRCode] = useState(false)

    const handleObtainClick = () => {
        setShowQRCode(!showQRCode)
    }

    return (
        <div className='w-full max-w-md bg-white rounded-xl shadow-xl p-4 flex flex-col border border-gray-300 mb-4'>
            <div className='flex'>
                <div className='w-full px-2'>
                    <div className='flex items-center justify-between mb-2'>
                        <h2 className='text-md font-bold text-wrap'>{reward.name}</h2>
                        <div className='flex items-center'>
                            <div className='relative flex items-center justify-center  text-customYellow text-md font-bold py-1 px-2 rounded-full'>
                                <span className='flex items-center justify-center'>
                                    {reward.points}
                                </span>
                                <CoinIcon className='w-5 h-5 text-customYellow absolute right-[-1px] top-0 transform translate-x-1/2 -translate-y-1/2' />
                            </div>
                        </div>
                    </div>
                    <p className='text-gray-500 text-xs text-wrap'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ad aliquid
                        voluptas.
                    </p>
                </div>
            </div>
            <div className='w-full mt-4 flex items-center justify-end gap-1'>
                <button
                    className='bg-black w-full text-white py-1 px-2 rounded-full text-sm font-semibold'
                    onClick={handleObtainClick}
                >
                    Claim the Reward!
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
