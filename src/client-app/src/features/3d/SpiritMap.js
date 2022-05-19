// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import React, { useRef, useState, Suspense } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import BioAvatar from "./Bioavatar";
// import Bird from "./Bird";
// import {Sparkles} from "@react-three/drei";
// mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';
//
//
// function Box(props) {
//     // This reference gives us direct access to the THREE.Mesh object
//     const ref = useRef()
//     // Hold state for hovered and clicked events
//     const [hovered, hover] = useState(false)
//     const [clicked, click] = useState(false)
//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => (ref.current.rotation.x += 0.01))
//     // Return the view, these are regular Threejs elements expressed in JSX
//     return (
//         <mesh
//             {...props}
//             ref={ref}
//             scale={clicked ? 1.5 : 1}
//             onClick={(event) => click(!clicked)}
//             onPointerOver={(event) => hover(true)}
//             onPointerOut={(event) => hover(false)}>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//         </mesh>
//     )
// }
//
// export const SpiritMap = () =>
//     <Canvas>
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         {/*<Box position={[-1.2, 0, 0]} />*/}
//         {/*<Box position={[1.2, 0, 0]} />*/}
//         <Suspense fallback={null}>
//         <Sparkles position={[1.2, 0, 0]} scale={5}></Sparkles>
//             <BioAvatar position={[1.2, 0, 0]}/>
//             <Bird position={[-1.2, -2, 0]}/>
//
//         </Suspense>
//     </Canvas>
//
