"use client"
import React, {useState, useEffect, useMemo, useCallback} from "react"
import {GoogleMap, useLoadScript, MarkerF, OverlayView, Libraries} from "@react-google-maps/api"
import {useLocation} from "../providers/LocationProvider"
import mapStyle from "../lib/style"

type Location = {
    lat: number
    lng: number
    name: string
    points: number
}

const locations: Location[] = [
    {
        lat: 48.5253,
        lng: 9.0629,
        name: "Bibliothek (My Location)",
        points: 0
    },
    {
        lat: 48.519372574825454,
        lng: 9.055539088469041,
        name: "Hölderlinturm Museumscafé",
        points: 1000
    },
    {
        lat: 48.5216,
        lng: 9.0576,
        name: "Hohentübingen Castle",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5201,
        lng: 9.0556,
        name: "Tübingen Market Square",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5238,
        lng: 9.0519,
        name: "University of Tübingen",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5187,
        lng: 9.0589,
        name: "Stiftskirche",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5204,
        lng: 9.0627,
        name: "Botanical Garden",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5231,
        lng: 9.0552,
        name: "Neckar Bridge",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.518,
        lng: 9.0534,
        name: "Hölderlin Tower",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5309,
        lng: 9.0503,
        name: "Museum Alte Kulturen",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5241,
        lng: 9.0403,
        name: "Anlagensee Park",
        points: Math.floor(Math.random() * 10) * 10 + 10
    },
    {
        lat: 48.5175,
        lng: 9.0645,
        name: "Neckar River",
        points: Math.floor(Math.random() * 10) * 10 + 10
    }
]

const LiveLocationPin = () => (
    <div className='relative'>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full border-4 border-[#C71585] shadow-2xl shadow-[#FF1493]/50'></div>
        <div className='absolute w-6 h-6 bg-[#FF1493] rounded-full animate-ping opacity-75'></div>
    </div>
)
const libraries: Libraries = ["places", "geometry"]

const Map: React.FC = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries
    })

    const {userLocation} = useLocation()
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
