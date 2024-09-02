"use client"
import React from "react"
import {useUIContext} from "@/app/providers/UIProvider"
import Map from "@/app/components/Map"
import {Location} from "../lib/types"
import List from "./List"

type LayoutProps = {
  locations: Location[] // Import the Location type accordingly
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

  return (
    <>
      {!isListView ? (
        <Map
          locations={locations}
          syntheticData={syntheticData}
          cityCenter={cityCenter}
        />
      ) : (
        <List locations={locations} />
      )}
    </>
  )
}

export default MainLayout
