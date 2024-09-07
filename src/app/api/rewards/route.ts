import {NextResponse} from "next/server"
import {checkReward, redeemReward, confirmRewardUsage} from "@/app/server/index"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const rewardId = searchParams.get("rewardId")

  if (!rewardId) {
    return NextResponse.json({error: "Reward ID is required"}, {status: 400})
  }

  const reward = await checkReward({rewardId})
  return NextResponse.json(reward)
}

export async function POST(request: Request) {
  const {rewardId} = await request.json()
  const result = await redeemReward(rewardId)
  return NextResponse.json(result)
}

export async function PUT(request: Request) {
  const formData = await request.formData()
  const result = await confirmRewardUsage(formData)
  return NextResponse.json(result)
}
