// src/app/rewards/page.tsx
import React from "react"
import {getAllRewards} from "../../server/data"
import RewardCard from "../../components/RewardCard"
import {MuseoModerno} from "next/font/google"
import Link from "next/link"

const museumModerno = MuseoModerno({
    subsets: ["latin"]
})

const RewardsPage = async () => {
    const rewards = await getAllRewards()

    return (
        <div className='max-w-2xl mx-auto bg-white rounded-lg flex flex-col gap-2'>
            <div className={`flex items-center justify-center bg-white border-b `}>
                <Link href={"/"}>
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
            <h1 className={`text-4xl font-semibold my-2 px-6 ${museumModerno.className}`}>
                Rewards
            </h1>
            <p className='px-6 mb-2'>Use your points to get free experiences in your city!</p>
            <div className='px-4'>
                {rewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} />
                ))}
            </div>
        </div>
    )
}

export default RewardsPage
