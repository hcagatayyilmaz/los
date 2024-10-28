import React from "react"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import {getPopQuiz, getHideAndSeek, getBadge} from "../../server/data"
import Badge from "../../components/Badge"
import {getRewardsByCity} from "../../server/data"
import RewardCard from "../../components/RewardCard"
import MyRewards from "../../components/MyRewards"
import {RankingIcon} from "../../lib/CustomIcons"
import {UIProvider} from "../../providers/UIProvider"
import HideAndSeek from "@/app/components/HideAndSeek"
import PopQuiz from "@/app/components/PopQuiz"
import {CoinIcon} from "@/app/lib/CustomIcons"
import AddLocation from "../../components/AddLocation"
import Image from "next/image"
import CityBadge from "../../components/CityBadge"
import {getCityBadgeByCityName} from "@/app/server/data"
import Navbar from "../../components/Navbar"

type QuestsPageParams = {
  params: {
    slug: string
  }
}

const museumModerno = MuseoModerno({
  subsets: ["latin"]
})

async function QuestsPage({params}: QuestsPageParams) {
  const {slug} = params

  const hideAndSeek = await getHideAndSeek({slug})

  const quiz = await getPopQuiz({slug})
  const cityBadge = await getCityBadgeByCityName(slug)
  const badge = await getBadge({slug})
  const rewards = await getRewardsByCity(slug)

  return (
    <UIProvider>
      <div className='max-w-xl mx-auto pt-2  font-sans border rounded-lg'>
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
          className={`text-4xl  font-medium my-4 underline underline-offset-6 px-4 ${museumModerno.className}`}
        >
          Quests
        </h1>
        <div className='px-4 my-2'>
          <p className={`my-1 text-sm ${museumModerno.className} mb-1`}>
            Choose any quests to earn points while having fun and experience
            more in your city. Start ranking in the city to get some rewards!
          </p>
        </div>

        <div>
          {cityBadge && (
            <CityBadge
              name={cityBadge.name}
              description={cityBadge.description_en}
              image={cityBadge.pinName ?? ""}
              numberOfCheckIn={cityBadge.totalCheckIns}
              points={cityBadge.points}
            />
          )}
          {badge && <Badge data={badge} />}

          {quiz && <PopQuiz quiz={quiz} />}

          {hideAndSeek && <HideAndSeek quest={hideAndSeek} />}

          <AddLocation />
        </div>

        {/**
       *    <div>
        <h1
          className={`text-4xl font-semibold my-2  px-6 underline underline-offset-6 ${museumModerno.className}`}
        >
          Rewards
        </h1>

        <div className='flex item-center justify-center px-6'>
          <div className='flex flex-col justify-center items-center'>
            <RankingIcon number={2} />
            <span>You are level 4!</span>
            <span className='text-customYellow font-bold'>120/250</span>
            <span
              className={`${museumModerno.className} font-normal mb-4 text-xl text-center`}
            >
              You can unlock rewards when you reach level 5!
            </span>
          </div>
        </div>

        <p className={`px-6 mb-2 ${museumModerno.className} `}>
          Use your points to get free experiences in your city! If there is no
          reward in market, use and support us to reach more rewards!
        </p>
        <div className='px-4'>
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>

        <div className='px-4'>
          <MyRewards />
        </div>
      </div>
       */}
        <Navbar slug={slug} />
      </div>
    </UIProvider>
  )
}

export default QuestsPage
