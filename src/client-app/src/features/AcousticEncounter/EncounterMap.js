import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import React, {useCallback, useEffect, useMemo, useState} from "react";
import L from 'leaflet'
import "leaflet/dist/leaflet.css"



// https://github.com/mapbox/mapbox-gl-leaflet
// https://github.com/ted-piotrowski/react-leaflet-canvas-overlay

const LocationMarker = ({ map }) => {

    const [position, setPosition] = useState(map.getCenter())

    var marker = L.marker(position).addTo(map);

//     return position === null ? null : (
//         <Marker position={position}>
//         </Marker>
//     )
    <></>
 }


function DisplayPosition({ map }) {
    const [position, setPosition] = useState(map.getCenter())

    // const onClick = useCallback(() => {
    //     map.setView(center, zoom)
    // }, [map])

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
        console.log("map moved")
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom());
            L.marker(e.latlng).addTo(map);
            // map.locate({
            //     watch: false,
            //     setView: true
            // })


        });
    }, [map]);

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
            {/*<button onClick={onClick}>reset</button>*/}
        </p>
    )
}

export function EncounterMap() {
    const [map, setMap] = useState(null)

    const displayMap = useMemo(
        () => (
            <MapContainer className={"h-full"}  center={center} zoom={zoom} whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {map ? <LocationMarker />: <></>}
            </MapContainer>
        ),
        [],
    )


    return (
        <div className={"h-96"} >
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
        </div>
    )
}

const center = [51.505, -0.09]
const zoom = 13
//
// export class Walk extends React.Component {
//
//     state = {
//         center: [51.505, -0.09]
//     }
//
//     render = () => {
//         return (
//             <div id={'map'}>
//                 <MapContainer className={"h-96"} center={this.state.center} zoom={13} scrollWheelZoom={false}>
//                     <TileLayer
//                         attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     <LocationMarker />
//                 </MapContainer>
//             </div>
//         );
//     }
// }
