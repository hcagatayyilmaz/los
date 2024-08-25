"use client"

import React from "react"
import {useUIContext} from "@/app/providers/UIProvider"
import ItemsSlider from "@/app/components/ItemSlider"
import {Location} from "../lib/types"

type ClientWrapperProps = {
    locations: Location[]
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({locations}) => {
    const {isListView} = useUIContext()

    if (isListView) return null

    return <ItemsSlider locations={locations} />
}

export default ClientWrapper
