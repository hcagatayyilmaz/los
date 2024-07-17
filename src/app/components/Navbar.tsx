"use client"
import {CiMap, CiBoxList, CiGift} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"
import {IoGiftOutline} from "react-icons/io5"
import {usePathname} from "next/navigation"
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"

export default function Navbar() {
    const currentPath = usePathname() // Get the current path
    const {isAuthenticated} = useKindeBrowserClient()

    return (
        <div className='flex justify-around items-center bg-transparent  '>
            <Link href={""}>
                <div className='flex items-center text-muted-foreground bg-white px-2 py-1 rounded border-black border-2 '>
                    <CiMap className='w-5 h-5 font-bold ' />
                    <span>Map</span>
                </div>
            </Link>
            <Link href={`${currentPath}/quests`}>
                <div className='flex  items-center text-muted-foreground bg-white px-2 py-1 rounded border border-black hover:text-customYellow'>
                    <MapIcon className='w-5 h-5' />
                    <span>Quests</span>
                </div>
            </Link>
            <Link href={`${currentPath}/rewards`}>
                <div className=' flex items-center text-muted-foreground bg-white px-2 py-1 rounded border border-black hover:text-customYellow'>
                    <IoGiftOutline className='w-5 h-5 font-xs' />
                    <span>Rewards</span>
                </div>
            </Link>
            {isAuthenticated ? (
                <LogoutLink>
                    <div className='flex items-center text-muted-foreground bg-white px-2 py-1 rounded border border-black hover:text-customYellow'>
                        <RiAccountCircleLine className='w-5 h-5' />
                        <span className='text-xs'>Logout</span>
                    </div>
                </LogoutLink>
            ) : (
                <LoginLink>
                    <div className='flex items-center text-muted-foreground bg-white px-2 py-1 rounded border border-black hover:text-customYellow'>
                        <RiAccountCircleLine className='w-5 h-5' />
                        <span>Login</span>
                    </div>
                </LoginLink>
            )}
        </div>
    )
}

export function Navbar2() {
    return <p>Navbar</p>
}
