const mapStyle = [
    {
        featureType: "all",
        elementType: "all",
        stylers: [
            {
                saturation: "32"
            },
            {
                lightness: "-3"
            },
            {
                visibility: "on"
            },
            {
                weight: "1.18"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
            {
                saturation: "-70"
            },
            {
                lightness: "14"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                saturation: "100"
            },
            {
                lightness: "-14"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
            {
                lightness: "12"
            }
        ]
    }
]

export const mapStyle2 = [
    {
        featureType: "all",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [
            {
                saturation: "1"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: "51"
            }
        ]
    },
    {
        featureType: "landscape.natural.landcover",
        elementType: "geometry.fill",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            },
            {
                saturation: "45"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#63c374"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: "0"
            },
            {
                lightness: "0"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            },
            {
                color: "#275213"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 45
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#3490d0"
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
]

export default mapStyle
