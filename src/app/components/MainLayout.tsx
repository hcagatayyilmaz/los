"use client"
import React, {useEffect, useMemo, useState} from "react"
import {useUIContext} from "@/app/providers/UIProvider"
import Map from "@/app/components/Map"
import {Location} from "../lib/types"
import List from "./List"

type LayoutProps = {
  locations: Location[]
  syntheticData: any
  cityCenter?: {
    lat: number
    lng: number
  }
}

const MainLayout: React.FC<LayoutProps> = ({
  locations,
  syntheticData,
  cityCenter
}) => {
  const {isListView} = useUIContext()
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize points in localStorage if not exists
  useEffect(() => {
    if (!isClient) return

    const storedPoints = window.localStorage.getItem("locationPoints")
    if (!storedPoints) {
      const pointsMap = [...locations, ...(syntheticData || [])].reduce(
        (acc, location) => {
          const randomPoints = (Math.floor(Math.random() * 10) + 1) * 10
          return {
            ...acc,
            [location.id]: randomPoints
          }
        },
        {}
      )
      window.localStorage.setItem("locationPoints", JSON.stringify(pointsMap))
    }
  }, [locations, syntheticData, isClient])

  // Create manipulated versions of locations with updated points
  const manipulatedLocations = useMemo(() => {
    if (!isClient) return locations

    const storedPoints = window.localStorage.getItem("locationPoints")
    if (!storedPoints) return locations

    const pointsMap = JSON.parse(storedPoints)
    return locations.map((location) => ({
      ...location,
      points: pointsMap[location.id] || location.points
    }))
  }, [locations, isClient])

  // Create manipulated versions of synthetic data with updated points
  const manipulatedSyntheticData = useMemo(() => {
    if (!isClient || !syntheticData) return []

    const storedPoints = window.localStorage.getItem("locationPoints")
    if (!storedPoints) return syntheticData

    const pointsMap = JSON.parse(storedPoints)
    return syntheticData.map((location: Location) => ({
      ...location,
      points: pointsMap[location.id] || location.points
    }))
  }, [syntheticData, isClient])

  return (
    <>
      {!isListView ? (
        <div className='w-full h-full overflow-y-hidden'>
          <Map
            locations={manipulatedLocations}
            syntheticData={manipulatedSyntheticData}
            cityCenter={cityCenter}
          />
        </div>
      ) : (
        <List locations={manipulatedLocations} />
      )}
    </>
  )
}

export default MainLayout
