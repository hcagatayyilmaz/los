"use client"
import {useRef, useEffect} from "react"
import {ItemCard} from "./ItemCard"
import {Location} from "../lib/types"

type ItemsSliderProps = {
    locations: Location[]
    onSelect: (location: Location) => void
    selectedLocationId: string | null
}

const ItemsSlider = ({locations, onSelect, selectedLocationId}: ItemsSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedLocationId && sliderRef.current) {
            const index = locations.findIndex((loc) => loc.id === selectedLocationId)
            if (index !== -1) {
                sliderRef.current.scrollTo({
                    left: index * sliderRef.current.clientWidth,
                    behavior: "smooth"
                })
            }
        }
    }, [selectedLocationId, locations])

    return (
        <div ref={sliderRef} className='overflow-x-scroll whitespace-nowrap py-4'>
            {locations.map((location) => (
                <div key={location.id} className='inline-block w-full px-2'>
                    <ItemCard location={location} onSelect={onSelect} />
                </div>
            ))}
        </div>
    )
}

export default ItemsSlider
