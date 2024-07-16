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
    const {setSelectedLocation} = useSelectedItem() // Use the context to set the selected location
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

    const center = useMemo(() => {
        if (userLocation) {
            return {lat: userLocation.lat, lng: userLocation.lng}
        } else {
            const firstLocation = locations[0]
            return {lat: firstLocation.latitude, lng: firstLocation.longitude}
        }
    }, [userLocation, locations])

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            setMap(map)

            if (userLocation) {
                map.setCenter(new window.google.maps.LatLng(userLocation.lat, userLocation.lng))
            } else {
                const bounds = new window.google.maps.LatLngBounds()
                locations.forEach((location) => {
                    bounds.extend(
                        new window.google.maps.LatLng(location.latitude, location.longitude)
                    )
                })
                map.fitBounds(bounds)
            }
        },
        [userLocation, locations]
    )

    useEffect(() => {
        if (userLocation && map && window.google) {
            const userLatLng = new window.google.maps.LatLng(userLocation.lat, userLocation.lng)

            const newDistances: Record<string, number> = {}
            let closest: Location | null = null
            let closestDistance = Infinity

            locations.forEach((location) => {
                const locationLatLng = new window.google.maps.LatLng(
                    location.latitude,
                    location.longitude
                )
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
    }, [userLocation, map, locations])

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
                zoomControl: true, // Enable zoom control
                streetViewControl: false, // Optional: Disable street view control if not needed
                gestureHandling: "auto", // Ensure that gestures like dragging and zooming work
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_CENTER // Change this to the desired position
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
                        <ItemPin location={location} />
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
