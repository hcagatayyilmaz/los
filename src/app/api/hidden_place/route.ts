import {NextResponse} from "next/server"
import {getHideAndSeek} from "@/app/server/data"
import {foundHideAndSeek} from "@/app/server/index"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({error: "Slug is required"}, {status: 400})
  }

  const hideAndSeek = await getHideAndSeek({slug})
  return NextResponse.json(hideAndSeek)
}

export async function POST(request: Request) {
  const {hideAndSeekId, userLat, userLng} = await request.json()
  const result = await foundHideAndSeek({hideAndSeekId, userLat, userLng})
  return NextResponse.json(result)
}
