"use client"
import React, {useState, useEffect, useMemo, useCallback} from "react"
import {GoogleMap, useLoadScript, MarkerF, OverlayView, Libraries} from "@react-google-maps/api"
import {useUserLocation} from "../providers/useUserLocation"
import mapStyle from "../lib/style"
import {Location} from "../lib/types"

const LiveLocationPin = () => (
    <div className='relative'>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full border-4 border-[#C71585] shadow-2xl shadow-[#FF1493]/50'></div>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
    </div>
)
const libraries: Libraries = ["places", "geometry"]

const Map: React.FC<{locations: Location[]}> = ({locations}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries
    })

    const {userLocation} = useUserLocation()
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [nearbyLocation, setNearbyLocation] = useState<Location | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [distances, setDistances] = useState<Record<string, number>>({})

    const mapContainerStyle = useMemo(
        () => ({
            width: "100%",
            height: "100vh"
        }),
        []
    )

    const center = useMemo(() => userLocation || locations[0], [userLocation])

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            setMap(map)

            if (userLocation) {
                map.setCenter(new window.google.maps.LatLng(userLocation.lat, userLocation.lng))
            } else {
                const bounds = new window.google.maps.LatLngBounds()
                locations.forEach((location) => {
                    bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
                })
                map.fitBounds(bounds)
            }
        },
        [userLocation]
    )

    useEffect(() => {
        if (userLocation && map && window.google) {
            const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng)

            const newDistances: Record<string, number> = {}
            let closest: Location | null = null
            let closestDistance = Infinity

            locations.forEach((location) => {
                const locationLatLng = new window.google.maps.LatLng(location.lat, location.lng)
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    userLatLng,
                    locationLatLng
                )

                newDistances[location.name] = distance

                if (distance < closestDistance) {
                    closest = location
                    closestDistance = distance
                }
            })

            setDistances(newDistances)

            if (closest && closestDistance <= 50) {
                // Within 50 meters
                setNearbyLocation(closest)
            } else {
                setNearbyLocation(null)
            }
        }
    }, [userLocation, map])

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading maps</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={onMapLoad}
            options={{
                mapTypeControl: false,
                fullscreenControl: false,
                styles: mapStyle,
                disableDefaultUI: true // Add this line to disable default UI
            }}
        >
            {locations.map((location, index) => (
                <MarkerF
                    key={index}
                    position={{lat: location.lat, lng: location.lng}}
                    onClick={() => setSelectedLocation(location)}
                />
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
