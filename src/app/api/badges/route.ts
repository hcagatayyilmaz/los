import {NextResponse} from "next/server"
import {getBadge, getBadgeStatus} from "@/app/server/data"
import {obtainBadge} from "@/app/server/index"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const slug = searchParams.get("slug")
  const attractionIds = searchParams.get("attractionIds")?.split(",")

  if (slug) {
    const badge = await getBadge({slug})
    return NextResponse.json(badge)
  } else if (attractionIds) {
    const status = await getBadgeStatus(attractionIds)
    return NextResponse.json(status)
  }

  return NextResponse.json({error: "Invalid request"}, {status: 400})
}

export async function POST(request: Request) {
  const {badgeId} = await request.json()
  const result = await obtainBadge(badgeId)
  return NextResponse.json(result)
}
