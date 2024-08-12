"use client"
import React from "react"
import {useUIContext} from "@/app/providers/UIProvider"
import Map from "@/app/components/Map"
import {Location} from "../lib/types"

type LayoutProps = {
    locations: Location[] // Import the Location type accordingly
}

const MainLayout: React.FC<LayoutProps> = ({locations}) => {
    const {isListView} = useUIContext()

    return <>{!isListView ? <Map locations={locations} /> : "List view goes here"}</>
}

export default MainLayout
