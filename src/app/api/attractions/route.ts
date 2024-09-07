import {NextResponse} from "next/server"
import {getAttractions, getPlaceDetails} from "@/app/server/data"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const cityId = searchParams.get("cityId")
  const filter = JSON.parse(searchParams.get("filter") || "{}")

  if (!cityId) {
    return NextResponse.json({error: "City ID is required"}, {status: 400})
  }

  const attractions = await getAttractions(cityId, filter)
  return NextResponse.json(attractions)
}

export async function POST(request: Request) {
  const {placeId} = await request.json()
  const place = await getPlaceDetails(placeId)
  return NextResponse.json(place)
}
