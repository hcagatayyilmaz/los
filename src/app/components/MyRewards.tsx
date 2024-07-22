import React from "react"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {getMyRewards} from "@/app/server/data"
import MyRewardCard from "./MyRewardCard"

async function MyRewards() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (user) {
        const myRewards = await getMyRewards(user.id)
        return (
            <div className='max-w-2xl mx-auto bg-white rounded-lg flex flex-col gap-2'>
                <div className=''>
                    {myRewards.map((userReward: any) => (
                        <MyRewardCard
                            key={userReward.reward.id}
                            reward={userReward.reward}
                            isUsed={userReward.isUsed}
                        />
                    ))}
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default MyRewards
