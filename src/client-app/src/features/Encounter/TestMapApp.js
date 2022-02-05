import React, { Fragment, useState, useEffect, useRef } from 'react'
import { extend,Canvas, useThree, useFrame } from 'react-three-fiber'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import * as THREE from 'three'
import { MapContainer, TileLayer } from 'react-leaflet'
// import { useGLTF, Environment, Loader, OrbitControls } from '@react-three/drei'
// import { useControls } from 'leva'
require("leaflet/dist/leaflet.css")

function Marker({ map }) {
    const [marker, setMarker] = useState([0, 0, 0])
    const { clock, viewport } = useThree()
    const mesh = useRef()

    // Get map reference from MapLayer.
    useEffect(() => {
        if (!map) return
        // Refers to the Southwark Cathedral
        const pixelPosition = map.leafletElement.latLngToLayerPoint([51.506145, -0.089585])
        setMarker([pixelPosition.x - viewport.width / 2, -(pixelPosition.y - viewport.height / 2), 0])
    }, [map, viewport])

    useFrame(() => {
        const s = Math.PI + Math.sin(clock.getElapsedTime())
        mesh.current.scale.set(s, s, s)
    })

    return (
        <group scale={[10, 10, 10]} position={marker}>
            <mesh ref={mesh}>
                <ringBufferGeometry attach="geometry" args={[1, 1.4, 32]} />
                <meshBasicMaterial attach="material" color="hotpink" transparent={true} opacity={0.9} />
            </mesh>
        </group>
    )
}

export function TestMapApp() {
    const [map, setMap] = useState()

    // onCreated={state => state.gl.setClearColor("black")}
    // gl={{ alpha: false }}

    return (
        <Fragment>
            <MapLayer setMap={setMap} />
            <Canvas

                orthographic
                camera={{ position: [0, 0, 500] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    height: '100vh',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                <Marker map={map} />
                <Controls />
                <axesHelper />
            </Canvas>
        </Fragment>
    )
}


// extend THREE to include TrackballControls
extend({ TrackballControls })

// key code constants
const ALT_KEY = 18
const CTRL_KEY = 17
const CMD_KEY = 91

export function Controls({}, ref) {
    const controls = React.useRef()
    const { camera, gl } = useThree()

    useFrame(() => {
        // update the view as the vis is interacted with
        controls.current.update()
    })

    return (
        <trackballControls
            ref={controls}
            args={[camera, gl.domElement]}
            dynamicDampingFactor={0.1}
            keys={[
                ALT_KEY, // orbit
                CTRL_KEY, // zoom
                CMD_KEY // pan
            ]}
            mouseButtons={{
                LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
                MIDDLE: THREE.MOUSE.ZOOM,
                RIGHT: THREE.MOUSE.ROTATE
            }}
        />
    )
}


const position = [51.505, -0.09]

export function MapLayer({ setMap }) {
    const mapRef = useRef()
    useEffect(() => void setMap(mapRef.current), [mapRef])
    return (
        <MapContainer className={"h-screen"}  ref={mapRef} center={position} zoom={17} zoomControl={false} scrollWheelZoom={false}>
            <TileLayer url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`} />
            {/* <Polyline weight={1} positions={points} /> */}
            {/* <ZoomControl position="topright" /> */}
        </MapContainer>
    )
}



// function Suzi(props) {
//     const { nodes } = useGLTF('/suzanne-draco.glb')
//     const materialProps = useControls({
//         thickness: { value: 5, min: 0, max: 20 },
//         roughness: { value: 0, min: 0, max: 1, step: 0.1 },
//         clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
//         clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
//         transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
//         ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
//         envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
//         color: '#ffffff',
//         attenuationTint: '#ffe79e',
//         attenuationDistance: { value: 0, min: 0, max: 1 }
//     })
//     return (
//         <mesh geometry={nodes.Suzanne.geometry} {...props}>
//             <meshPhysicalMaterial {...materialProps} />
//         </mesh>
//     )
// }
