import Image from "next/image"
import {MuseoModerno} from "next/font/google"
import {getBadgeStatus} from "../server/data"
import BadgeButton from "./BadgeButton"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {CoinIcon} from "../lib/CustomIcons"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Badge({data}: {data: any}) {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    console.log("Badge:", data)

    return (
        <div className='w-full flex flex-col gap-2 mt-4'>
            <div className='flex justify-between px-4'>
                <h1 className={` mt-2 text-xl font-bold ${museoModerno.className}`}>{data.name}</h1>
                {data.points && (
                    <span className='inline-block'>
                        <div className='flex items-center justify-center bg-customYellow rounded-md px-2 pb-[2px]'>
                            <CoinIcon className='w-4 h-4 text-white' />
                            <span className='mt-1 ml-1 text-xs text-white'>+ {data.points}</span>
                        </div>
                    </span>
                )}
            </div>
            <p className={`px-4 text-md ${museoModerno.className}`}>{data.description_en}</p>
            <div className='flex gap-4'>
                {data.attractions.map((attraction: any, index: number) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center flex-1 ${
                            attraction.checkedIn ? "opacity-100" : "opacity-40"
                        }`}
                    >
                        <div className='relative w-full h-32'>
                            <Image
                                src={data.pinName || "/default-image.png"}
                                alt={attraction.attraction.name_en}
                                layout='fill'
                                objectFit='contain'
                            />
                        </div>
                        <div className={`text-center text-xs mt-2 ${museoModerno.className}`}>
                            {attraction.attraction.name_en}
                        </div>
                    </div>
                ))}
            </div>

            <div className='px-4 py-1'>
                <BadgeButton id={data.id} name={data.name} />
            </div>
        </div>
    )
}

export default Badge
