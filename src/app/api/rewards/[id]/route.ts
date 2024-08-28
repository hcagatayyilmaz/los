import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export async function GET(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  const {id} = params

  // Handle your logic here (e.g., fetching data related to the ID, etc.)

  // Example: Redirect to a different URL
  return NextResponse.redirect("http://localhost:3000")
}
