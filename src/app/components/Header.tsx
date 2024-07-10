"use client"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs"

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
            className={`${museumModerno.className} px-2 mt-2 pb-5 flex justify-between border-b-2`}
        >
            <Link href={"/"}>
                <div className='flex items-center space-x-2'>
                    <h1 className='text-4xl font-semibold'>
                        <span className='text-black '>Los</span>
                        <span className='text-customYellow text-4xl'>.</span>
                    </h1>
                    <div className='relative'>
                        <h2 className='text-lg font-semibold text-customYellow absolute top-3 -left-4'>
                            {name}
                        </h2>
                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-blue-500'></div>
                    </div>
                </div>
            </Link>
            {user ? (
                <div className='bg-black text-white rounded p-2'>
                    <LogoutLink>Logout</LogoutLink>
                </div>
            ) : (
                <div className='bg-black text-white rounded p-2'>
                    <LoginLink>Login</LoginLink>
                </div>
            )}
        </div>
    )
}
