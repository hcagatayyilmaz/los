import Image from "next/image"
import {MuseoModerno} from "next/font/google"
import {getBadgeStatus} from "../server/data"

const museoModerno = MuseoModerno({
    subsets: ["latin"]
})

function Badge({data}: {data: any}) {
    const badge = getBadgeStatus(data.attractions.map((attraction: any) => attraction.attractionId))
    console.log("Badge:", badge)

    return (
        <div className='w-full flex flex-col gap-4'>
            <h1 className={`px-6 mt-2 text-xl font-bold ${museoModerno.className}`}>{data.name}</h1>
            <div className='flex gap-4'>
                {data.attractions.map((attraction: any, index: number) => (
                    <div key={index} className='w-1/3 flex flex-col items-center'>
                        <div className='relative h-[120px] w-full'>
                            <Image
                                src={data.pinName || "/default-image.png"}
                                alt={attraction.name}
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                        <div className={`text-center text-xs mt-2 ${museoModerno.className}`}>
                            {attraction.attraction.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Badge
