import React, {useRef, useEffect, useState, useMemo} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components'
import {BackgroundBubble} from "../../components/components";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';

export const MapContainer = styled('div')`
  border-radius: 200px;
  height: 25vh;
  width: 25vh;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
`

export function EncounterMap({location}) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    // const marker = useState(())


    useEffect(() => {

        if (map.current) {
                if (location?.latitude && location?.longitude) {
                    map.current.setCenter([location.longitude, location.latitude])
                }
            return;
        } // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/hellokozmo/cl35xk38h000315kxh5glvu8k',
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [location?.longitude ?? 1.0, location?.latitude ?? 1.0],
            zoom: 14
        });
        const marker1 = new mapboxgl.Marker({color: 'purple',})
            .setLngLat([location.longitude, location.latitude])
            .addTo(map.current);

        // TODO use state
        map.current.setCenter([location.longitude, location.latitude])

        // TODO fix that re-rendering causes absolute positioning

    });

    const displayMap = useMemo(
        () => (
            <BackgroundBubble>
                <MapContainer
                    ref={mapContainer}
                    className={"map-container"}
                >
                </MapContainer>
            </BackgroundBubble>
        ),
        [],
    )

    return displayMap

}

