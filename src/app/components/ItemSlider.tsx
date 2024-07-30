"use client"
import {useRef, useEffect} from "react"
import {ItemCard} from "./ItemCard"
import {Location} from "../lib/types"
import {useSelectedItem} from "@/app/providers/useSelectedItem"

type ItemsSliderProps = {
    locations: Location[]
}

const ItemsSlider = ({locations}: ItemsSliderProps) => {
    const sliderRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const {selectedLocation, setSelectedLocation} = useSelectedItem()

    useEffect(() => {
        if (selectedLocation && itemRefs.current[selectedLocation.id]) {
            itemRefs.current[selectedLocation.id]?.scrollIntoView({behavior: "smooth"})
        }
    }, [selectedLocation])

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const handleScroll = () => {
            const center = slider.scrollLeft + slider.clientWidth / 2
            let closestLocation = locations[0]
            let closestDistance = Math.abs(
                (itemRefs.current[locations[0].id]?.offsetLeft ?? 0) - center || 0
            )

            locations.forEach((location) => {
                const itemRef = itemRefs.current[location.id]
                if (!itemRef) return
                const distance = Math.abs(itemRef.offsetLeft + itemRef.clientWidth / 2 - center)
                if (distance < closestDistance) {
                    closestLocation = location
                    closestDistance = distance
                }
            })

            setSelectedLocation(closestLocation)
        }

        slider.addEventListener("scroll", handleScroll)
        return () => slider.removeEventListener("scroll", handleScroll)
    }, [locations, setSelectedLocation])

    return (
        <div ref={sliderRef} className='overflow-x-scroll whitespace-nowrap bottom-0 left-0'>
            {locations.map((location) => (
                <div
                    key={location.id}
                    className='inline-block w-full px-2'
                    ref={(el) => {
                        itemRefs.current[location.id] = el
                    }}
                >
                    <ItemCard location={location} />
                </div>
            ))}
        </div>
    )
}

export default ItemsSlider
