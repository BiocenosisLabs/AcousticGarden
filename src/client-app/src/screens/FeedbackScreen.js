import React, {Suspense, useEffect, useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {OrbitControls, Sparkles, Text} from "@react-three/drei";
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Noise, Pixelation,
    Select,
    Selection,
    SelectiveBloom,
    Vignette
} from '@react-three/postprocessing'
import 'mapbox-gl/dist/mapbox-gl.css';
//ignore
import mapboxgl from 'mapbox-gl';
import Bird from "../features/3d/Bird";
import {useStore} from "../store";
import {ButtonPrimary, HeaderNav, HeaderTitle} from "../components/components";
import styled from "styled-components";
import {KernelSize, Resolution as Resizer} from "postprocessing";
// import Henry from "../features/3d/Henry";
// import HenryLsd from "../features/3d/HenryLsd";
// import Fish from "../features/3d/Fish";
// eslint-disable-line import/no-webpack-loader-syntax


const compute_sizing = () => {
    // compute  size of the canvas:
    const height = window.innerHeight / 2
    const wWidth = window.innerWidth / 1.2
    const width = Math.min(wWidth, height)

    // compute position of the canvas:
    const top = 70
    const left = (wWidth - width) + (window.innerWidth - wWidth) / 2
    return {width, height, top, left, borderRadius: '20px',}
}


mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';

const center = [51.505, -0.09]

export default function FeedbackScreen({onSnap}) {

    const hasPermissions = useStore((state) => state.hasPermissions)()
    const locationLatLng = useStore((state) => state.locationLatLng)
    const location = [locationLatLng?.longitude ?? 1.0, locationLatLng?.latitude ?? 1.0]

    console.log("FeedbackScreen location:", location)

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(location?.longitude ?? center[0]);
    const [lat, setLat] = useState(location?.latitude ?? center[1]);
    const [zoom, setZoom] = useState(12);
    const [isInitialized] = useState(false)
    const [sizing, setSizing] = useState(compute_sizing())

    const birdRef = useRef(null);
    const sparkleRef = useRef(null);
    const lightRef1 = useRef(null);
    const lightRef2 = useRef(null);

    useEffect(() => {
        if (map.current) {
            map.current.setCenter(location)
            return;
        } // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: location,
            zoom: zoom
        });
    }, [isInitialized]);

    function Circle(props) {
        // This reference gives us direct access to the THREE.Mesh object
        const ref = useRef()
        const refGeo = useRef()
        // Hold state for hovered and clicked events
        const [hovered, hover] = useState(false)
        const [clicked, click] = useState(false)
        // Subscribe this component to the render-loop, rotate the mesh every frame
        useFrame((state, delta) => {
            // console.log(ref.current.geometry.vertices)
            return (ref.current.rotation.z += 0.01);
        })
        // Return the view, these are regular Threejs elements expressed in JSX


        // Could also maybe use 'ringGeomoetry' https://threejs.org/docs/#api/en/geometries/RingGeometry
        return (
            <line
                {...props}
                ref={ref}
                scale={clicked ? 2.5 : 2}
                onClick={(event) => click(!clicked)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}>
                <circleGeometry ref={refGeo} args={[1, 80]}/>
                {/*<lineBasicMaterial color={hovered ? 'hotpink' : 'orange'} />*/}
                <lineBasicMaterial color={hovered ? 'hotpink' : 'orange'}/>
            </line>
        )
    }

    // const sizing = {
    //     borderRadius: '20px',
    //     margin: '20px',
    //     height: '50vh',

    const Screenshotter = () => {
        var takeScreenshot;

        useFrame((t) => {
            if (takeScreenshot) {
                takeScreenshot = false; console.log(t.gl.domElement.current.toDataUrl());
            }

        })

        const onSnap = () => {
            takeScreenshot = true
        }
    }


    return (
        <>
            <HeaderNav>
                <HeaderTitle/>
            </HeaderNav>
            <CanvasContainers>
                {/* Canvas managed by three fiber, for AR: */}
                <Canvas invalidateFrameloop shadowMap className='mirrorX' style={{
                    position: 'fixed',
                    zIndex: 2,
                    ...sizing
                }}
                        gl={{
                            preserveDrawingBuffer: true // allow image capture
                        }}
                        updateDefaultCamera={false}
                >
                        {/*<Suspense fallback={null}>*/}
                        {/*        <Text scale={2.5} color="white" anchorX="left" anchorY="middle" position={[0,0,2]}>*/}
                        {/*            Level 10*/}
                        {/*        </Text>*/}
                        {/*</Suspense>*/}
                    <Screenshotter />
                        <ambientLight ref={lightRef1}/>
                        <pointLight ref={lightRef2} position={[10, 10, 10]}/>
                        {/*<Circle position={[0, 0, -2]} />*/}
                            <Suspense fallback={null}>
                                {/**/}
                                <Sparkles ref={sparkleRef} position={[0, 0, 0]} scale={2}/>
                                <Bird refa={birdRef} position={[0, 0, 0]}/>
                                {/*<Henry position={[0, 0, 0]}/>*/}
                                {/*<HenryLsd position={[-0, -1.5, 0]}/>*/}

                                {/*<Fish scale={0.2} />*/}


                        <EffectComposer autoclear={false}>
                            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480}/>
                            {/*<SelectiveBloom*/}
                            {/*    selection={[birdRef,sparkleRef]}*/}
                            {/*    lights={[lightRef1, lightRef2]}*/}
                            {/*    selectionLayer={10} // selection layer*/}
                            {/*    intensity={1.0} // The bloom intensity.*/}
                            {/*    blurPass={undefined} // A blur pass.*/}
                            {/*    width={Resizer.AUTO_SIZE} // render width*/}
                            {/*    height={Resizer.AUTO_SIZE} // render height*/}
                            {/*    kernelSize={KernelSize.LARGE} // blur kernel size*/}
                            {/*    luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.*/}
                            {/*    luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]*/}
                            {/*/>*/}
                            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300}/>

                            <Noise opacity={0.02}/>
                            <Vignette eskil={false} offset={0.1} darkness={1.1}/>
                            <Pixelation granularity={15}/>
                        </EffectComposer>
                    </Suspense>
                    <OrbitControls />

                </Canvas>

                {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
                <div ref={mapContainer} className='map mirrorX' style={{
                    position: 'fixed',
                    zIndex: 1,
                    ...sizing
                }} width={sizing.width} height={sizing.height}/>
            </CanvasContainers>

            <ButtonPrimary onClick={onSnap}>
                Snap
            </ButtonPrimary>
        </>
    )

}

export const CanvasContainers = styled('div')`
  border-radius: 20px;
  margin: 20px;
  height: 50vh
`
