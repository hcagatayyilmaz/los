"use client"

import React, {useState} from "react"
import {obtainBadge} from "@/app/server/index"

function ObtainBadge() {
    const [message, setMessage] = useState<string | null>(null)

    const handleObtainBadge = async () => {
        try {
            const response = await obtainBadge({badgeId: "clyk4su0c00004qxzqb064tl8"})
            setMessage(response.message)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(error.message)
            } else {
                setMessage("An unknown error occurred.")
            }
        }
    }

    return (
        <div className='bg-yellow-200 p-4 rounded-md mb-4'>
            <h2 className='text-lg font-bold cursor-pointer'>Badges</h2>
            <div className='bg-yellow-100 p-4 rounded-md'>
                <p className='text-blue-800'>
                    Coffee Addict - If you already checked in 3 cool kaffee places you can obtain
                    this rewards and get points!
                </p>
                <button
                    className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200'
                    onClick={handleObtainBadge}
                >
                    Click here to obtain the badge
                </button>
                {message && <p className='text-green-600 mt-4'>{message}</p>}
            </div>
        </div>
    )
}

export default ObtainBadge
