"use client"
import React, {useState, useEffect, useMemo, useCallback} from "react"
import {GoogleMap, useLoadScript, OverlayView, Libraries} from "@react-google-maps/api"
import {useUserLocation} from "../providers/useUserLocation"
import mapStyle from "../lib/style"
import {Location} from "../lib/types"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import {LiveLocationPin, ItemPin} from "./Pins"

const libraries: Libraries = ["places", "geometry"]

const Map: React.FC<{locations: Location[]}> = ({locations}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries
    })

    const {userLocation} = useUserLocation()
    const {setSelectedLocation, selectedLocation} = useSelectedItem()
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [isCentered, setIsCentered] = useState(false) // Track if the map has been centered

    const mapContainerStyle = useMemo(
        () => ({
            width: "100%",
            height: "100vh"
        }),
        []
    )

    const initialCenter = useMemo(() => {
        if (userLocation) {
            return {lat: userLocation.lat, lng: userLocation.lng}
        } else if (locations.length > 0) {
            const firstLocation = locations[0]
            return {lat: firstLocation.latitude, lng: firstLocation.longitude}
        } else {
            return {lat: 0, lng: 0} // Default to a neutral location if no locations are provided
        }
    }, [userLocation, locations])

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            setMap(map)

            if (!isCentered) {
                if (userLocation) {
                    map.setCenter(new window.google.maps.LatLng(userLocation.lat, userLocation.lng))
                    map.setZoom(10)
                } else if (locations.length > 0) {
                    const firstLocation = locations[0]
                    map.setCenter({lat: firstLocation.latitude, lng: firstLocation.longitude})
                    map.setZoom(12)
                }
                setIsCentered(true) // Mark the map as centered
            }
        },
        [userLocation, isCentered, locations]
    )

    useEffect(() => {
        if (selectedLocation && map) {
            const {latitude, longitude} = selectedLocation
            map.panTo({lat: latitude, lng: longitude})
        }
    }, [selectedLocation, map])

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading maps</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={initialCenter}
            zoom={15}
            onLoad={onMapLoad}
            options={{
                mapTypeControl: false,
                fullscreenControl: false,
                styles: mapStyle,
                zoomControl: true,
                streetViewControl: false,
                gestureHandling: "auto",
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_CENTER
                }
            }}
        >
            {locations.map((location, index) => (
                <OverlayView
                    key={index}
                    position={{lat: location.latitude, lng: location.longitude}}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div onClick={() => setSelectedLocation(location)}>
                        <ItemPin
                            location={location}
                            isSelected={selectedLocation?.id === location.id}
                        />
                    </div>
                </OverlayView>
            ))}
            {userLocation && (
                <OverlayView position={userLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <LiveLocationPin />
                </OverlayView>
            )}
        </GoogleMap>
    )
}

export default Map
