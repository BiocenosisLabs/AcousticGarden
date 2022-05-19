// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import React, { useRef, useState, Suspense } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import BioAvatar from "./Bioavatar";
// import Bird from "./Bird";
// import {Sparkles} from "@react-three/drei";
// import { ARCanvas,DefaultXRControllers,Interactive } from '@react-three/xr'
// import { Text } from '@react-three/drei'
//
// mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';
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
// const Spirit = (props) => {
//     const [hover, setHover] = useState(false)
//     const [color, setColor] = useState('blue')
//
//     const onSelect = () => {
//         setColor((Math.random() * 0xffffff) | 0)
//     }
//
//     return (
//         <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
//             <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
//                 <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
//                     Hello react-xr!
//                 </Text>
//             </Box>
//             <Suspense fallback={null}>
//                 <Sparkles position={[1.2, 0, 0]} scale={1.2}></Sparkles>
//                 <BioAvatar position={[1.2, 0, 0]}/>
//                 <Bird position={[-1.2, -2, 0]}/>
//
//             </Suspense>
//         </Interactive>
//     )
// }
//
//
//
// export const SpiritSelfiePrev = () =>
//     <ARCanvas>
//
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         {/*<Box position={[-1.2, 0, 0]} />*/}
//         {/*<Box position={[1.2, 0, 0]} />*/}
//         <Spirit/>
//         <DefaultXRControllers />
//     </ARCanvas>
//
//
// export const SpiritSelfie = () => {
//
//
//     return (
//         <div>
//             {/* Canvas managed by three fiber, for AR: */}
//             <Canvas className='mirrorX' style={{
//                 position: 'fixed',
//                 zIndex: 2,
//                 ...sizing
//             }}
//                     gl={{
//                         preserveDrawingBuffer: true // allow image capture
//                     }}
//                     updateDefaultCamera={false}
//             >
//                 <ThreeGrabber sizing={sizing}/>
//                 <FaceFollower faceIndex={0} expression={_expressions[0]}/>
//             </Canvas>
//
//             {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
//             <canvas className='mirrorX' ref={faceFilterCanvasRef} style={{
//                 position: 'fixed',
//                 zIndex: 1,
//                 ...sizing
//             }} width={sizing.width} height={sizing.height}/>
//         </div>
//     )
// }
