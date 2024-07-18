import React from "react"
import Image from "next/image"
import {FaCrosshairs} from "react-icons/fa"

function TotalPoints() {
    return (
        <div className='flex items-center px-1 bg-white rounded-full border-2 border-customYellow'>
            <FaCrosshairs className='text-md' />
            <span className='ml-1 text-xs'>30m</span>
        </div>
    )
}

export default TotalPoints
