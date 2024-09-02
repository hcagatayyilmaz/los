"use client"

import {CoinIcon} from "../lib/CustomIcons"
import QRCode from "./QRCode"
import React, {useState} from "react"
import {redeemReward} from "@/app/server/index"

export const RewardCard = ({reward}: any) => {
  const [showQRCode, setShowQRCode] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [message, setMessage] = useState("")

  const handleObtainClick = async () => {
    try {
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
        <div className='px-2 w-full'>
          <div className='flex justify-between items-center mt-4'>
            <h1 className={`font-bold text-xl  break-words whitespace-normal`}>
              {reward.name_en}
            </h1>
            <span className='inline-block'>
              <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                <CoinIcon className='w-4 h-4 text-white' />
                <span className='mt-1 ml-1 text-xs text-white'>
                  + {reward.points}
                </span>
              </div>
            </span>
          </div>
          <p className='text-gray-500 text-xs text-wrap my-2'>
            {reward.description_en}
          </p>
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
