import React from "react"
import Image from "next/image"

function Streak({completed, image}: {completed?: boolean; image: string}) {
  const opacity = completed ? "" : "opacity-40"
  return (
    <div className={`flex flex-col items-center flex-1 ${opacity}`}>
      <div className='relative w-full'>
        <Image
          src={image}
          alt='Holderlin Image'
          layout='responsive'
          width={16}
          height={9}
          objectFit='contain'
        />
      </div>
    </div>
  )
}

export default Streak
