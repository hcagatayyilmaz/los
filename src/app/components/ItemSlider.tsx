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
  const {selectedLocation} = useSelectedItem()

  useEffect(() => {
    if (selectedLocation && itemRefs.current[selectedLocation.id]) {
      itemRefs.current[selectedLocation.id]?.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [selectedLocation])

  return (
    <div
      ref={sliderRef}
      className='overflow-x-scroll whitespace-nowrap bottom-0 left-0'
    >
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
