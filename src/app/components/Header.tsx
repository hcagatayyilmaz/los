"use client"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {CoinIcon} from "../lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

interface LogoProps {
    name?: string
    user?: any
}

export default function Header({name, user}: LogoProps) {
    return (
        <div className={`px-2 mt-2 pb-4 flex items-center justify-center bg-transparent`}>
            <Link href={"/"}>
                <div
                    className={`flex items-center bg-white px-4 py-1 rounded-3xl text-center space-x-2 ${museumModerno.className}`}
                >
                    <h1 className='text-3xl flex items-end font-medium text-center'>
                        <span className='text-black '>los</span>
                        <div className='w-[10px] h-[10px] bg-customYellow border-2 border-black rounded-full ml-[2px] mb-2'></div>
                    </h1>
                    <div className='flex items-center justify-end'>
                        <h2 className='text-md font-semibold text-customYellow'>{name}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}
