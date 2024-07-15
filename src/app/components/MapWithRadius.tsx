import React from "react"
import {GoogleMap, useLoadScript, Circle, MarkerF} from "@react-google-maps/api"
import {Location} from "@/app/lib/types"
import mapStyle from "../lib/style"

type MapWithRadiusProps = {
    location: Location
}

const mapContainerStyle = {
    width: "100%",
    height: "200px"
}

const MapWithRadius: React.FC<MapWithRadiusProps> = ({location}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ["geometry", "places"]
    })

    if (!isLoaded) return <div>Loading...</div>
    if (loadError) return <div>Error loading map</div>

    const options = isLoaded
        ? {
              mapTypeControl: false,
              fullscreenControl: false,
              styles: mapStyle,
              zoomControl: true,
              streetViewControl: false,
              gestureHandling: "auto",
              zoomControlOptions: {
                  position: window.google.maps.ControlPosition.RIGHT_CENTER
              }
          }
        : {}

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{lat: location.lat, lng: location.lng}}
            zoom={15}
            options={options}
        >
            <Circle
                center={{lat: location.lat, lng: location.lng}}
                radius={100}
                options={{
                    fillColor: "#FF1493",
                    fillOpacity: 0.2,
                    strokeColor: "#FF1493",
                    strokeOpacity: 1,
                    strokeWeight: 1
                }}
            />
        </GoogleMap>
    )
}

export default MapWithRadius
