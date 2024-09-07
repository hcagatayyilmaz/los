import {NextResponse} from "next/server"
import {checkIn, checkInSyntheticLocation} from "@/app/server/index"

export async function POST(request: Request) {
  const {placeId, userLat, userLng, isSynthetic} = await request.json()

  if (isSynthetic) {
    const result = await checkInSyntheticLocation({placeId, userLat, userLng})
    return NextResponse.json(result)
  } else {
    const result = await checkIn({placeId, userLat, userLng})
    return NextResponse.json(result)
  }
}
