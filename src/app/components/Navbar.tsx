"use client"
import {CiMap, CiBoxList, CiGift} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"
import {IoGiftOutline} from "react-icons/io5"
import {usePathname} from "next/navigation"
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs"

export default function Navbar() {
    const currentPath = usePathname() // Get the current path

    return (
        <div className='flex justify-around items-center py-2 px-2 bg-transparent  '>
            <Link href={""}>
                <div className='flex items-center text-muted-foreground bg-white px-2 py-1 rounded border-black border-2 '>
                    <CiMap className='w-8 h-8 font-bold ' />
                    <span>Map</span>
                </div>
            </Link>
            <Link href={`${currentPath}/quests`}>
                <div className='flex  items-center text-muted-foreground bg-white px-2 py-1 rounded hover:text-neonGreen'>
                    <MapIcon className='w-8 h-8' />
                    <span>Quests</span>
                </div>
            </Link>
            <Link href={`${currentPath}/rewards`}>
                <div className=' flex items-center text-muted-foreground bg-white px-2 py-1 rounded hover:text-neonGreen'>
                    <IoGiftOutline className='w-8 h-8 font-xs' />
                    <span>Rewards</span>
                </div>
            </Link>
            <LoginLink>
                <div className='flex items-center text-muted-foreground bg-white px-2 py-1 rounded hover:text-neonGreen'>
                    <RiAccountCircleLine className='w-8 h-8' />
                    <span>Login</span>
                </div>
            </LoginLink>
        </div>
    )
}
