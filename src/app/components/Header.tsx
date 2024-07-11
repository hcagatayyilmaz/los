"use client"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {CoinIcon} from "../lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

interface LogoProps {
    name: string
    user: any
}

export default function Header({name, user}: LogoProps) {
    return (
        <div
            className={`px-2 mt-2 pb-4 flex justify-between border-b-2 border-black bg-transparent`}
        >
            <Link href={"/"}>
                <div
                    className={`flex items-center bg-white px-4 py-2 rounded-3xl space-x-2 ${museumModerno.className}`}
                >
                    <h1 className='text-4xl font-semibold'>
                        <span className='text-black '>Los</span>
                        <span className='text-customYellow text-4xl'>.</span>
                    </h1>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-lg font-semibold text-customYellow  top-3 -left-4'>
                            {name}
                        </h2>
                    </div>
                </div>
            </Link>

            <div className='flex items-center justify-center bg-pink-100 text-customYellow rounded-full px-4'>
                <CoinIcon className={"text-customYellow"} />
                <span className='text-sm'>+40</span>
            </div>
        </div>
    )
}
