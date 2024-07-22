import React from "react"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {getMyRewards} from "@/app/server/data"
import RewardCard from "./RewardCard"

async function MyRewards() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (user) {
        const myRewards = await getMyRewards(user.id)
        return <div>MyRewards</div>
    } else {
        return <div></div>
    }
}

export default MyRewards
