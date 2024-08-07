// src/app/rewards/page.tsx
import React from "react"
import {getAllRewards} from "../../server/data"
import RewardCard from "../../components/RewardCard"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"
import MyRewards from "../../components/MyRewards"
import {RankingIcon} from "../../lib/CustomIcons"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const RewardsPage = async () => {
    const rewards = await getAllRewards()
    console.log("Rewards:", rewards)

    return (
        <div className='max-w-2xl mx-auto bg-white rounded-lg flex flex-col gap-2'>
            <div className={`flex items-center justify-center bg-white border-b `}>
                <Link href={"/tuebingen"}>
                    <div
                        className={`flex items-center bg-white px-4 py-1 text-center space-x-2 ${museumModerno.className}`}
                        style={{border: "1px dashed white"}}
                    >
                        <h1 className='text-3xl flex items-end font-medium text-center'>
                            <span className={`text-black ${museumModerno.className}`}>Los</span>
                            <div className='w-[12px] h-[12px] bg-customYellow border border-white border-dashed rounded-full ml-[2px] mb-2'></div>
                        </h1>
                        <div className='flex items-end justify-end mt-2'>
                            <h2 className='text-md font-semibold text-customYellow'>Tübingen</h2>
                        </div>
                    </div>
                </Link>
            </div>

            <div className='flex item-center justify-center px-6'>
                <div className='flex flex-col justify-center items-center'>
                    <RankingIcon number={31} />
                    <span>Your ranking!</span>
                </div>
            </div>

            <p className={`px-6 mb-2 ${museumModerno.className} `}>
                Use your points to get free experiences in your city! If there is no reward in
                market, use and support us to reach more rewards!
            </p>
            <div className='px-4'>
                {rewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} />
                ))}
            </div>
            <h1 className={`text-4xl font-semibold my-2 px-6 ${museumModerno.className}`}>
                My Rewards
            </h1>
            <div className='px-4'>
                <MyRewards />
            </div>
        </div>
    )
}

export default RewardsPage
