// src/app/rewards/page.tsx
import React from "react"
import {getRewardsByCity} from "../../server/data"
import RewardCard from "../../components/RewardCard"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import MyRewards from "../../components/MyRewards"
import {RankingIcon} from "../../lib/CustomIcons"
import Navbar from "../../components/Navbar"
import {UIProvider} from "../../providers/UIProvider"
import Header from "../../components/Header"
import Image from "next/image"

const museumModerno = MuseoModerno({
  subsets: ["latin"]
})

type RewardsPageParams = {
  params: {
    slug: string
  }
}

const RewardsPage = async ({params}: RewardsPageParams) => {
  const {slug} = params
  const rewards = await getRewardsByCity(slug)

  return (
    <UIProvider>
      <div className='max-w-2xl mx-auto bg-white rounded-lg flex flex-col gap-2 border'>
        <div
          className={`flex flex-col items-center justify-center bg-white border-b `}
        >
          <Link href={"/tuebingen"}>
            <div
              className={`flex items-center bg-white px-4 py-1 text-center space-x-2 ${museumModerno.className}`}
              style={{border: "1px dashed white"}}
            >
              <div className='relative'>
                <Image
                  src='/logo-text-2.png'
                  alt='Los'
                  width={80}
                  height={60}
                  className={`text-black ${museumModerno.className}`}
                />
                <div className='absolute top-0 -right-8 bg-[#2cff05] text-black px-2 py-1 text-[8px] rounded-full'>
                  BETA
                </div>
              </div>
            </div>
          </Link>
        </div>

        <h1
          className={`text-4xl font-semibold my-2 px-6 ${museumModerno.className}`}
        >
          Rewards
        </h1>

        {/* <div className='flex item-center justify-center px-6'>
        <div className='flex flex-col justify-center items-center'>
          <RankingIcon number={2} />
          <span>You are level 2!</span>
          <span
            className={`${museumModerno.className} font-normal my-2 text-xl text-center`}
          >
            You can unlock rewards when you reach level 5!
          </span>
        </div>
      </div> */}

        <p className={`px-6 mb-2 ${museumModerno.className} `}>
          Use your points to get free experiences in your city! If there is no
          reward in market, use and support us to reach more rewards!
        </p>
        <div className='px-4'>
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>

        <div className=''>
          <MyRewards />
        </div>

        <Navbar slug={slug} />
      </div>
    </UIProvider>
  )
}

export default RewardsPage
