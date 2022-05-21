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
import {
    Back,
    ButtonPrimary,
    FrostedCard,
    HeaderNav,
    HeaderTitle,
    MainTitle,
    RecordButton
} from "../components/components";
import styled from "styled-components";
import {KernelSize, Resolution as Resizer} from "postprocessing";
import Lizzie from "../features/3d/Lizzie";
import {deC} from "./BrowseAreaScreen"
// import Henry from "../features/3d/Henry";
// import HenryLsd from "../features/3d/HenryLsd";
// import Fish from "../features/3d/Fish";
// eslint-disable-line import/no-webpack-loader-syntax


const compute_sizing = () => {
    // compute  size of the canvas:
    const height = window.innerHeight / 3
    const wWidth = window.innerWidth
    const width = window.innerWidth * 0.90
    // const width = Math.min(wWidth, height)

    // compute position of the canvas:
    const top = window.innerHeight * 0.10
    const left = (wWidth-width) / 2
    return {width, height, top, left, borderRadius: '15px',}
}



mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';

const center = [51.505, -0.09]

export default function FeedbackScreen({onSnap, onBrowse}) {

    const hasPermissions = useStore((state) => state.hasPermissions)()
    const locationLatLng = useStore((state) => state.locationLatLng)
    const location = [locationLatLng?.longitude ?? deC[0], locationLatLng?.latitude ?? deC[1]]
    const feedback = useStore((state) => state.feedback)

    console.log("FeedbackScreen location:", location)

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(location?.longitude ?? center[0]);
    const [lat, setLat] = useState(location?.latitude ?? center[1]);
    const [zoom, setZoom] = useState(12);
    const [pixelation, setPixelation] = useState(40);
    const [sizing, setSizing] = useState(compute_sizing())

    const birdRef = useRef(null);
    const sparkleRef = useRef(null);
    const lightRef1 = useRef(null);
    const lightRef2 = useRef(null);


    useEffect(() => {


        console.log({feedback})
        // get feedback and set pixelation

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
    }, []);

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

    // const traits = Object.keys(feedback ?? {}).map(key => {
    //
    //     return <div>
    //         <span> {key} :</span>:
    //         <span> {JSON.stringify(feedback[key])} </span>
    //     </div>
    // })

    // console.log({traits})

    const FeedbackDivs = () => (feedback !== null && feedback.spirit !== null) ? <div>
        <div> Spirit Type: {feedback.spirit.type}} </div>
        <div> Spirit Name: {feedback.spirit.name} </div>
        <div> Spirit Level: {feedback.spirit.level} </div>
        <div> Spirit Description: {feedback.spirit.description} </div>

        {/*{{ traits ??  }}*/}
        <span>
         {JSON.stringify(feedback?.species)}
       </span>
    </div> : <></>


    return (
        <>
            <HeaderNav>
                <Back />
                <MainTitle className={"m-auto"}/>
            </HeaderNav>
            <CanvasContainers>
                {/* Canvas managed by three fiber, for AR: */}
                <Canvas invalidateFrameloop shadowMap className='mirrorX' style={{
                    position: 'absolute',
                    zIndex: 3,
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
                                <Sparkles ref={sparkleRef} position={[0, 0, 0]} scale={5}/>
                                {/*<Bird refa={birdRef} position={[0, 0, 0]}/>*/}
                                <Lizzie position={[0, 0, 0]}/>


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
                            <Pixelation granularity={pixelation}/>
                        </EffectComposer>
                    </Suspense>
                    <OrbitControls />

                </Canvas>

                <div ref={mapContainer} className='map mirrorX' style={{
                    position: 'absolute',
                    zIndex: 1,
                    ...sizing
                }}/>

                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    ...sizing
                }}>
                    <div className={"mt-10 ml-5 prose prose-2xl prose-orange"}>
                        Spirit Level 24
                    </div>
                </div>
            </CanvasContainers>


            <div style={{marginTop: sizing.height, marginLeft: "auto", marginRight:"auto", width:"90vw"}}>

                <FrostedCard style>
                    <div className={"flex flex-1"}>
                        <div className={"opacity-80"}>
                            <RecordButton />
                        </div>
                        <div className={"flex flex-col flex-1 prose prose-invert"}>
                            <div>
                                You Contributed + 5 EXP
                            </div>

                            <FeedbackDivs />

                        </div>
                    </div>
                </FrostedCard>
                {/*<ButtonPrimary onClick={onSnap}>*/}
                {/*    Take a picture*/}
                {/*</ButtonPrimary>*/}
                <span>
                    This is an avatar or genius loci is collectively generated by your observations.
                </span>
                <ButtonPrimary onClick={onBrowse}>
                    Browse other spirits
                </ButtonPrimary>
            </div>



        </>
    )

}

export const CanvasContainers = styled('div')`
  border-radius: 20px;
  margin: 10px;
  //height: 20vh // Controlled by sizing
`
