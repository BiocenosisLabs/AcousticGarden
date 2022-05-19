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
import {Camera, Scene, DirectionalLight, Vector3, Vector4, Matrix4, Matrix3, WebGLRenderer, Clock} from "three";
// import modelTransform from "mapbox-gl/dist/mapbox-gl-unminified";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import Henry from "../features/3d/Henry";
// import HenryLsd from "../features/3d/HenryLsd";
// import Fish from "../features/3d/Fish";
// eslint-disable-line import/no-webpack-loader-syntax
import { Threebox } from 'threebox-plugin';


var clock = new Clock();
var speed = 2; //units a second
var delta = 0;

const compute_sizing = () => {
    // compute  size of the canvas:
    const height = window.innerHeight
    const wWidth = window.innerWidth
    const width = Math.min(wWidth, height)

    // compute position of the canvas:
    const top = 0
    const left = 0
    return {width, height, top, left,}
}


mapboxgl.accessToken = 'pk.eyJ1IjoiaGVsbG9rb3ptbyIsImEiOiJjbDJyaTRxeWQwNDI2M2Nucnlyd3V1OTRrIn0.OxZp7HHu2oZ4WFjF8KKGcg';

const deC = [4.911482500895545,52.39438086623716]
// lat: 52.39386153641274
// lng: 4.90947968270882
// parameters to ensure the model is georeferenced correctly on the map
const modelOrigin = deC;
const modelAltitude = 50;
const modelRotate = [Math.PI / 2, 0, 0];

const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

// transformation parameters to position, rotate and scale the 3D model onto the map
const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
    * applied since the CustomLayerInterface expects units in MercatorCoordinates.
    */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 30
};

// const customLayer = {
//     id: '3d-model',
//     type: 'custom',
//     renderingMode: '3d',
//     onAdd: function (map, gl) {
//         this.camera = new Camera();
//         this.scene = new Scene();
//
// // create two three.js lights to illuminate the model
//         const directionalLight = new DirectionalLight(0xffffff);
//         directionalLight.position.set(0, -70, 100).normalize();
//         this.scene.add(directionalLight);
//
//         const directionalLight2 = new DirectionalLight(0xffffff);
//         directionalLight2.position.set(0, 70, 100).normalize();
//         this.scene.add(directionalLight2);
//
// // use the three.js GLTF loader to add the 3D model to the three.js scene
//         // or useGLTF
//         const loader = new GLTFLoader();
//         loader.load(
//             '/lizzie-swirl-small.glb',
//             (gltf) => {
//                 console.log(gltf)
//                 this.scene.add(gltf.scene);
//             }
//         );
//         loader.load(
//             '/goldie-swirl-small.glb',
//             (gltf) => {
//                 console.log(gltf)
//                 this.scene.add(gltf.scene);
//             }
//         );
//         this.map = map;
//
// // use the Mapbox GL JS map canvas for three.js
//         this.renderer = new WebGLRenderer({
//             canvas: map.getCanvas(),
//             context: gl,
//             antialias: true
//         });
//
//         this.renderer.autoClear = false;
//     },
//     render: function (gl, matrix) {
//         const rotationX = new Matrix4().makeRotationAxis(
//             new Vector3(1, 0, 0),
//             modelTransform.rotateX
//         );
//         const rotationY = new Matrix4().makeRotationAxis(
//             new Vector3(0, 1, 0),
//             modelTransform.rotateY
//         );
//         const rotationZ = new Matrix4().makeRotationAxis(
//             new Vector3(0, 0, 1),
//             modelTransform.rotateZ
//         );
//
//         const m = new Matrix4().fromArray(matrix);
//         const l = new Matrix4()
//             .makeTranslation(
//                 modelTransform.translateX,
//                 modelTransform.translateY,
//                 modelTransform.translateZ
//             )
//             .scale(
//                 new Vector3(
//                     modelTransform.scale,
//                     -modelTransform.scale,
//                     modelTransform.scale
//                 )
//             )
//             .multiply(rotationX)
//             .multiply(rotationY)
//             .multiply(rotationZ);
//
//         this.camera.projectionMatrix = m.multiply(l);
//         this.renderer.resetState();
//         this.renderer.render(this.scene, this.camera);
//         this.map.triggerRepaint();
//     }
// };


var model3

export default function BrowseAreaScreen({onSnap}) {

    const hasPermissions = useStore((state) => state.hasPermissions)()
    const locationLatLng = useStore((state) => state.locationLatLng)
    // const location = [locationLatLng?.longitude ?? 1.0, locationLatLng?.latitude ?? 1.0]
    const location = deC

    console.log("FeedbackScreen location:", location)


    const [isInitialized] = useState(false)
    const [sizing, setSizing] = useState(compute_sizing())

    const birdRef = useRef(null);
    const sparkleRef = useRef(null);
    const lightRef1 = useRef(null);
    const lightRef2 = useRef(null);


    const mapContainer = useRef(null);
    const map = useRef(null);
    const tb = useRef(null);
    const [lng, setLng] = useState(location[0]);
    const [lat, setLat] = useState(location[1]);
    const [zoom, setZoom] = useState(9);


    requestAnimationFrame(() => {
        repaint()
    })

    const repaint = () => {
        if (map.current) {
            map.current.triggerRepaint();
        }
        requestAnimationFrame(repaint)
    }


    useEffect(() => {
        if (map.current) {
            // map.current.setCenter(location)
            return;
        } else {
            // initialize map only once


            // const queryString = window.location.search;
            // const urlParams = new URLSearchParams(queryString);
            // const map = urlParams.get('map')


            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                // style: 'mapbox://styles/mapbox/outdoors-v11',
                style: 'mapbox://styles/mapbox/satellite-v9',
                // style: 'mapbox://styles/hellokozmo/cl35xk38h000315kxh5glvu8k',
                // style: 'mapbox://styles/hellokozmo/cl35xk38h000315kxh5glvu8k',
                center: location,
                zoom: 12,
                pitch: 30,
                antialias: true,
            });

            map.current.on('move', () => {
                // console.log(map.current.getCenter())
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });

            map.current.on('style.load', () => {
                // map.current.addLayer(customLayer);


                if (!window.tb) {
                    window.tb = new Threebox(
                        map.current,
                        map.current.getCanvas().getContext('webgl'),
                        {
                            defaultLights: true,
                        }
                    );
                }

                var tb = window.tb


                map.current.addLayer({
                    id: 'custom_layer',
                    type: 'custom',
                    renderingMode: '3d',
                    onAdd: function (map, mbxContext) {
                        var options = {
                            obj: '/lizzie-swirl-small.glb',
                            type: 'glb',
                            scale: 60,
                            units: 'meters',
                            rotation: { x: 0, y: 0, z: 0 }, //default rotation
                            anchor: 'center'
                        }

                        tb.loadObj(options, function (model) {
                            let soldier = model.setCoords(modelOrigin);
                            tb.add(soldier);
                        })

                        tb.loadObj({...options, obj: '/goldie-swirl-small.glb'}, function (model) {
                            let soldier1 = model.setCoords([modelOrigin[0]-0.02,modelOrigin[1]-0.02]);
                            tb.add(soldier1);
                        })
                        tb.loadObj({...options, obj: '/frogie-swirl-small.glb'}, function (model) {
                            model3 = model.setCoords([modelOrigin[0]+0.02,modelOrigin[1]+0.02]);
                            tb.add(model3);
                        })
                        // tb.loadObj({...options, obj: '/frogie-swirl-small.glb'}, function (model) {
                        //     model4 = model.setCoords([modelOrigin[0]+0.02,modelOrigin[1]+0.02]);
                        //     tb.add(model4);
                        // })
                        // import soldier from an external glb file, scaling up its size 20x
                        // IMPORTANT: .glb is not a standard MIME TYPE, you'll have to add it to your web server config,
                        // otherwise you'll receive a 404 error

                        // Attribution: Soldier animated model by T. Choonyung at https://www.mixamo.com
                        // from https://www.mixamo.com/#/?page=1&query=vanguard&type=Character
                    },

                    render: function (gl, matrix) {

                        delta = clock.getDelta();
                        // console.log(clock.elapsedTime)

                        // if (model2) {
                            // console.log({tb})
                            // console.log({delta, model:model2})
                            // model2.setRotation([model2.rotation[0] + delta, 0, 0])


                            tb.world.children.forEach((o) => {
                                o.rotation.z = o.rotation.z + (delta/2 )//([o.rotation[0] + delta, 0, 0])
                                // o.rotation.z = (0.3) * Math.sin(clock.elapsedTime)
                                o.rotation.y = (0.3) * Math.sin(clock.elapsedTime)

                            });
                            tb.update();
                            // map.curent.update();



                        // }


                    }
                });

                // map.current.addSource('mapbox-dem', {
                //     'type': 'raster-dem',
                //     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                //     'tileSize': 512,
                //     'maxzoom': 14
                // });
                // map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
                //
                // map.current.addLayer({
                //     'id': 'sky',
                //     'type': 'sky',
                //     'paint': {
                //         'sky-type': 'atmosphere',
                //         'sky-atmosphere-sun': [0.0, 90.0],
                //         'sky-atmosphere-sun-intensity': 15
                //     }
                // });


            });


        }
    }, [isInitialized]);





    return (
        <>
            <HeaderNav>
                <HeaderTitle/>
            </HeaderNav>
            <CanvasContainer>
                {/* Canvas managed by three fiber, for AR: */}
                {/*<Canvas invalidateFrameloop shadowMap className='mirrorX' style={{*/}
                {/*    position: 'fixed',*/}
                {/*    zIndex: 2,*/}
                {/*    ...sizing*/}
                {/*}}*/}
                {/*        gl={{*/}
                {/*            preserveDrawingBuffer: true // allow image capture*/}
                {/*        }}*/}
                {/*        updateDefaultCamera={false}*/}
                {/*>*/}


                {/*        <ambientLight ref={lightRef1}/>*/}
                {/*        <pointLight ref={lightRef2} position={[10, 10, 10]}/>*/}
                {/*        /!*<Circle position={[0, 0, -2]} />*!/*/}
                {/*            <Suspense fallback={null}>*/}
                {/*                /!**!/*/}
                {/*                <Sparkles ref={sparkleRef} position={[0, 0, 0]} scale={2}/>*/}
                {/*                <Bird refa={birdRef} position={[0, 0, 0]}/>*/}
                {/*                /!*<Henry position={[0, 0, 0]}/>*!/*/}
                {/*                /!*<HenryLsd position={[-0, -1.5, 0]}/>*!/*/}

                {/*                /!*<Fish scale={0.2} />*!/*/}



                {/*    </Suspense>*/}

                {/*</Canvas>*/}

                <div ref={mapContainer} className='map mirrorX' style={{
                    position: 'fixed',
                    zIndex: 1,
                    ...sizing
                }} width={sizing.width} height={sizing.height}/>


            </CanvasContainer>

        </>
    )

}

export const CanvasContainer = styled('div')`
  //border-radius: 20px;
  //margin: 20px;   /.  /
  height: 100vh;
  width: 100vh
`
