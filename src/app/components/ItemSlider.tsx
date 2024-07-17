"use client"
import {useRef, useEffect} from "react"
import {ItemCard} from "./ItemCard"
import {Location} from "../lib/types"

type ItemsSliderProps = {
    locations: Location[]
}

const ItemsSlider = ({locations}: ItemsSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={sliderRef} className='overflow-x-scroll whitespace-nowrap py-4 bottom-0 left-0'>
            {locations.map((location) => (
                <div key={location.id} className='inline-block w-full px-2'>
                    <ItemCard location={location} />
                </div>
            ))}
        </div>
    )
}

export default ItemsSlider
