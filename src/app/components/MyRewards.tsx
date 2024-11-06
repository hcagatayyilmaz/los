import React from "react"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {getMyRewards} from "@/app/server/data"
import MyRewardCard from "./MyRewardCard"
import {MuseoModerno} from "next/font/google"

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
})

async function MyRewards() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if (user) {
    const myRewards = await getMyRewards(user.id)
    return (
      <>
        <h1
          className={`text-4xl font-semibold my-2 px-6 ${museoModerno.className}`}
        >
          My Rewards
        </h1>
        <div className='max-w-2xl mx-auto bg-white rounded-lg flex flex-col gap-2 px-4 mt-2'>
          <div className=''>
            {myRewards.map((userReward: any) => (
              <MyRewardCard
                key={userReward.reward.id}
                reward={userReward.reward}
                isUsed={userReward.isUsed}
                userId={user.id}
              />
            ))}
          </div>
        </div>
      </>
    )
  } else {
    return <div></div>
  }
}

export default MyRewards
