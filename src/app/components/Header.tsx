"use client"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {CoinIcon} from "../lib/CustomIcons"
import Image from "next/image"

const museumModerno = MuseoModerno({
  subsets: ["latin"]
})

interface LogoProps {
  name?: string
  user?: any
  isMap?: boolean
}

export default function Header({name, user, isMap}: LogoProps) {
  return (
    <div
      className={`px-2 py-1 flex items-center justify-center bg-white border rounded-b -xl shadow-xl rounded-b-full`}
    >
      <Link href={"/"}>
        <div
          className={`flex items-center bg-white px-4  text-center space-x-2 ${museumModerno.className}`}
          style={{border: "1px dashed white"}}
        >
          <Image
            src='/logo-text-2.png'
            alt='Los'
            width={100}
            height={80}
            className={`text-black ${museumModerno.className}`}
          />
          <div className='flex items-end justify-end mt-2'>
            {/* {!isMap && (
              <h2 className='text-md font-semibold text-customYellow'>
                {name}
              </h2>
            )} */}
          </div>
        </div>
      </Link>
    </div>
  )
}
