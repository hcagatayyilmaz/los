"use client"
import {CiMap, CiBoxList, CiGift} from "react-icons/ci"
import {RiAccountCircleLine} from "react-icons/ri"
import {MapIcon, QuestIcon, RewardsIcon} from "../lib/CustomIcons"
import Link from "next/link"
import {MdOutlineLeaderboard} from "react-icons/md"
import {usePathname} from "next/navigation"
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"

// I am not sure whether should we have border color or not. TO BE DISCUSSED

export default function Navbar({isMapPage}: {isMapPage: boolean}) {
  const currentPath = usePathname() // Get the current path
  const {isAuthenticated} = useKindeBrowserClient()

  return (
    <div className='flex justify-between px-2 items-center bg-transparent mt-1 text-sm'>
      {isMapPage ? (
        <Link href={"/leaderboard"}>
          <div className='flex gap-2 items-center text-muted-foreground bg-white px-2 py-1 rounded border text-sm border-gray-300 shadow-md'>
            <MdOutlineLeaderboard className='w-5 h-5 ' />
            <span>Leaderboard</span>
          </div>
        </Link>
      ) : (
        <Link href={""}>
          <div className='flex gap-2 items-center text-muted-foreground bg-white px-2 py-1 rounded border text-sm border-gray-300 shadow-md'>
            <CiMap className='w-5 h-5 ' />
            <span>Map</span>
          </div>
        </Link>
      )}
      <Link href={`${currentPath}/quests`}>
        <div className='flex gap-2  items-center text-muted-foreground bg-white px-2 py-1 rounded border hover:text-customYellow border-gray-300 shadow-md text-sm'>
          <MapIcon className='w-5 h-5' />
          <span>Quests & Rewards</span>
        </div>
      </Link>

      {isAuthenticated ? (
        <LogoutLink>
          <div className='flex gap-2  items-center text-muted-foreground bg-white px-2 py-1 rounded border hover:text-customYellow border-gray-300 shadow-md text-sm'>
            <RiAccountCircleLine className='w-5 h-5' />
            <span>Logout</span>
          </div>
        </LogoutLink>
      ) : (
        <LoginLink>
          <div className='flex gap-2 items-center text-muted-foreground bg-white px-2 py-1 rounded border  hover:text-customYellow border-gray-300 shadow-md'>
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
