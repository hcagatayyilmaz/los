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
}

export default function Header({name, user}: LogoProps) {
    return (
        <div className={`px-2 py-1 flex items-center justify-center bg-white border shadow-xl`}>
            <Link href={"/"}>
                <div
                    className={`flex items-center bg-white px-4 py-1 text-center space-x-2 ${museumModerno.className}`}
                    style={{border: "1px dashed white"}}
                >
                    <h1 className='text-3xl flex items-end font-medium text-center'>
                        <span className={`text-black ${museumModerno.className}`}>Los</span>
                        <div className='ml-[2px] mb-2 '>
                            <Image src='/logo.png' alt='Logo' width={12} height={12} />
                        </div>
                    </h1>
                    <div className='flex items-end justify-end mt-2'>
                        <h2 className='text-md font-semibold text-customYellow'>{name}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}
