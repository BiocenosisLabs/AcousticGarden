import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import React, {useEffect, useState} from "react";
require("leaflet/dist/leaflet.css")


function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom());
            // map.locate({
            //     watch: false,
            //     setView: true
            // })
            //const radius = e.accuracy;
            // const circle = Circle(e.latlng, radius);
            // circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} >
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

// https://github.com/mapbox/mapbox-gl-leaflet
// https://github.com/ted-piotrowski/react-leaflet-canvas-overlay

export class Walk extends React.Component {
    render() {
        return (
            <div id={'map'}>
                <MapContainer className={"h-96"} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        );
    }
}
