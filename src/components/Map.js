import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { Icon } from 'leaflet' 
import 'leaflet/dist/leaflet.css'
import { BASE_URL } from "../services/helper";

const Map = (props) => {

    // const map = L.map('map').setView([20.5937,-78.9629],13)
    const {coordinates, name} = props
    const customIcon = new Icon({
        iconUrl:require('../images/destination.png'),
        iconSize:[38,38]
    })

    return (
        <MapContainer
            center={coordinates}
            zoom={15}
            style={{height:'50vh', borderRadius:'5px'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker 
            position={coordinates}
            icon={customIcon}
            >
                <Popup><h2>{name}</h2></Popup>
            </Marker>

        </MapContainer>
    )
}

export default Map