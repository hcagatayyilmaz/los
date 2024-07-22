import React from "react"
import Image from "next/image"

function TotalPoints({points}: {points: number}) {
    return (
        <div className='flex items-center px-4 bg-white rounded-full border-2 border-customYellow'>
            <Image src='/coin.png' alt='Coin' width={18} height={18} />
            <span className='ml-2 text-xs'>{points}</span>
        </div>
    )
}

export default TotalPoints
