import Image from "next/image"
import {MuseoModerno} from "next/font/google"
import {getBadgeStatus} from "../server/data"
import BadgeButton from "./BadgeButton"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Badge({data}: {data: any}) {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    // const badge = getBadgeStatus(data.attractions.map((attraction: any) => attraction.attractionId))
    // console.log("Badge:", badge)

    return (
        <div className='w-full flex flex-col gap-4'>
            <h1 className={`px-6 mt-2 text-xl font-bold ${museoModerno.className}`}>{data.name}</h1>
            <div className='flex gap-4'>
                {data.attractions.map((attraction: any, index: number) => (
                    <div key={index} className='w-1/3 flex flex-col items-center'>
                        <div className={`flex flex-col items-center flex-1 `}>
                            <div className='relative w-full'>
                                <Image
                                    src='/tree.png'
                                    alt='Holderlin Image'
                                    layout='responsive'
                                    width={16}
                                    height={9}
                                    objectFit='contain'
                                />
                            </div>
                        </div>
                        <div className={`text-center text-xs mt-2 ${museoModerno.className}`}>
                            {attraction.attraction.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className='px-4 py-1'>
                <BadgeButton id={data.id} />
            </div>
        </div>
    )
}

export default Badge
