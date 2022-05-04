import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';

export function EncounterMap({location}) {

    console.log("EncounterMap location:",location)

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(location?.longitude ?? 1.0);
    const [lat, setLat] = useState(location?.latitude ?? 1.0);
    const [zoom, setZoom] = useState(12);


    useEffect(() => {
        if (map.current) {
            if (location?.longitude) setLng(location.longitude)
            if (location?.latitude) setLat(location.latitude)
            return;
        } // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location?.longitude ?? 1.0, location?.latitude ?? 1.0],
            zoom: zoom
        });
    });



    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );

    //
    // const displayMap = useMemo(
    //     () => (
    //         <MapContainer className={"h-full"}  center={location} zoom={zoom} whenCreated={setMap}>
    //             <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             {map ? <LocationMarker />: <></>}
    //         </MapContainer>
    //     ),
    //     [],
    // )
    //
    // console.log(location)
    // console.log()
    //
    //
    // return (
    //     <div className={"h-96"} >
    //         {map ? <DisplayPosition map={map} /> : null}
    //         {displayMap}
    //     </div>
    // )
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
