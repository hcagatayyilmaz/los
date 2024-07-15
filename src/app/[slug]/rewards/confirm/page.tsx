"use client"

import React from "react"
import {useSearchParams} from "next/navigation"

function ConfirmRewards() {
    const searchParams = useSearchParams()
    const rewardIdQuery = searchParams.get("rewardId")

    return (
        <div>
            <h1>Confirm Page</h1>
            <p>{rewardIdQuery}</p>
        </div>
    )
}

export default ConfirmRewards
