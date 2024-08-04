import React from "react"
import {getRewardsById} from "../../server/data"

async function ConfirmRewards({searchParams}: any) {
    const reward = await getRewardsById(searchParams.rewardId)

    return (
        <div>
            <h1>Confirm Page</h1>
            <p>{reward?.name_en}</p>
            <p>{reward?.description_en}</p>
        </div>
    )
}

export default ConfirmRewards
