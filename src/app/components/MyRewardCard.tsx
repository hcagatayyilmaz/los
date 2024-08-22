"use client"

import {CoinIcon} from "../lib/CustomIcons"
import QRCode from "./QRCode"
import React from "react"

export const MyRewardCard = ({reward, isUsed}: any) => {
    return (
        <div className='w-full  bg-white rounded-xl shadow-xl p-4 flex flex-col border border-gray-300 mb-4'>
            <div className='flex'>
                <div className='w-full px-2'>
                    <div className='flex items-center justify-between mb-2'>
                        <h2 className='text-md font-bold text-wrap'>{reward.name}</h2>
                        <div className='flex items-center'>
                            {isUsed ? (
                                <span className='text-white bg-black text-md font-bold'>Used</span>
                            ) : (
                                <span className='text-white bg-black  px-2 py-1 rounded text-sm font-bold'>
                                    Not Used
                                </span>
                            )}
                        </div>
                    </div>
                    <p className='text-gray-500 text-xs text-wrap'>{reward.description_en}</p>
                </div>
            </div>
            <div className='mt-1 flex justify-center'>
                <QRCode id={reward.id} />
            </div>
        </div>
    )
}

export default MyRewardCard
