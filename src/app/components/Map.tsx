"use client"
import React, {useState, useEffect, useMemo, useCallback} from "react"
import {
  GoogleMap,
  useLoadScript,
  OverlayView,
  Libraries
} from "@react-google-maps/api"
import {useUserLocation} from "../providers/useUserLocation"
import mapStyle from "../lib/style"
import {Location} from "../lib/types"
import {useSelectedItem} from "@/app/providers/useSelectedItem"
import {LiveLocationPin, ItemPin} from "./Pins"
import {generateSyntheticMapPlaces} from "../server/data" // Import the function

const libraries: Libraries = ["places", "geometry"]

const Map: React.FC<{
  locations: Location[]
  isMapPage?: boolean
  syntheticData?: Location[]
}> = ({locations, isMapPage, syntheticData}) => {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries
  })

  const {userLocation} = useUserLocation()
  const {setSelectedLocation, updateSelectedLocation, selectedLocation} =
    useSelectedItem()
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isCentered, setIsCentered] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(15)
  const [syntheticMapData, setSyntheticMapData] = useState<Location[]>([])

  const mapContainerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100vh"
    }),
    []
  )

  const tübingenCoordinates = {lat: 48.5216, lng: 9.0576}

  const initialCenter = useMemo(() => {
    if (userLocation) {
      return {lat: userLocation.lat, lng: userLocation.lng}
    } else if (locations.length > 0) {
      const firstLocation = locations[0]
      return {lat: firstLocation.latitude, lng: firstLocation.longitude}
    } else {
      return tübingenCoordinates
    }
  }, [userLocation, locations])

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map)

      if (isMapPage) {
        map.setZoom(4)
      } else if (userLocation && !isCentered) {
        map.setCenter(
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        )
        map.setZoom(16)
        setIsCentered(true)
      } else if (locations.length > 0 && !isCentered) {
        const firstLocation = locations[0]
        map.setCenter({
          lat: firstLocation.latitude,
          lng: firstLocation.longitude
        })
        map.setZoom(16)
        setIsCentered(true)
      } else if (!isCentered) {
        map.setCenter(tübingenCoordinates)
        map.setZoom(14)
        setIsCentered(true)
      }
    },

    [userLocation, isCentered, locations, tübingenCoordinates, isMapPage]
  )

  useEffect(() => {
    if (map && userLocation && !isCentered && !isMapPage) {
      map.setCenter(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      )
      map.setZoom(16)
      setIsCentered(true)
    }
  }, [map, userLocation, isCentered, isMapPage])

  useEffect(() => {
    if (selectedLocation && map) {
      const {latitude, longitude} = selectedLocation
      map.panTo({lat: latitude, lng: longitude})
    }
  }, [selectedLocation, map])

  // New effect to handle centering map on user location
  useEffect(() => {
    const centerMapToUserLocation = () => {
      if (map && userLocation) {
        map.panTo(
          new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
        )
        map.setZoom(16)
      }
    }

    window.addEventListener("centerMapToUserLocation", centerMapToUserLocation)

    return () => {
      window.removeEventListener(
        "centerMapToUserLocation",
        centerMapToUserLocation
      )
    }
  }, [map, userLocation])

  useEffect(() => {
    if (isMapPage && userLocation) {
      const fetchSyntheticData = async () => {
        try {
          const data = await generateSyntheticMapPlaces(
            userLocation.lat,
            userLocation.lng
          )
          setSyntheticMapData(data as Location[])
        } catch (error) {
          console.error("Error fetching synthetic map data:", error)
        }
      }
      fetchSyntheticData()
    }
  }, [isMapPage, userLocation])

  const handlePinClick = (location: Location) => {
    updateSelectedLocation(location)
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={onMapLoad}
      zoom={isMapPage ? 4 : 15}
      onZoomChanged={() => {
        if (map) {
          setZoomLevel(map.getZoom() || 15)
        }
      }}
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
      {[
        ...(locations || []),
        ...(isMapPage ? syntheticMapData : syntheticData || [])
      ].map((location, index) => (
        <OverlayView
          key={index}
          position={{lat: location.latitude, lng: location.longitude}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div onClick={() => handlePinClick(location)}>
            <ItemPin
              location={location}
              isSelected={selectedLocation?.id === location.id}
              zoomLevel={zoomLevel}
              isSynthetic={location.isSynthetic}
            />
          </div>
        </OverlayView>
      ))}
      {userLocation && (
        <OverlayView
          position={userLocation}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <LiveLocationPin />
        </OverlayView>
      )}
    </GoogleMap>
  )
}

export default Map
