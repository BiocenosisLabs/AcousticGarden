import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Bird from "./Bird";
import {Sparkles} from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette ,Pixelation} from '@react-three/postprocessing'
// import THREE.js helper, useful to compute pose
// The helper is not minified, feel free to customize it (and submit pull requests bro):
import {ArrayExporter, Sampler, XMLExporter} from 'voxelizer';
import {VoxelLoader} from 'three-voxel-loader/src/VoxelLoader'
import {MeshPhongMaterial, Plane, PlaneHelper, Vector3} from "three";
import {ButtonPrimary} from "../../components/components";

let cache = {
    volume: null,
}
const Fab = ({children}) => <div className={"fixed left-1/2 bottom-4 transform -translate-x-1/2 z-20"}>{children} </div>



var params = {
    //model: models["anvil"],
    fill: false,
    color: true,
    displayOriginal: false,
    //format: exportFormats["binvox"],
    //save: function () { exportFile(params.format) },
    size: 0.93,
    resolution: 50,
    material: {
        color: 0xffffff,
    },
    LOD: {
        maxPoints: 1,
        maxDepth: 10
    },
    renderer: {
        triangles: 0
    },
    clipping: {
        enableClipping: false,
        planeX: {
            constant: 30,
            negated: false,
            displayHelper: false
        },
        planeY: {
            constant: 30,
            negated: false,
            displayHelper: false
        },
        planeZ: {
            constant: 30,
            negated: false,
            displayHelper: false
        }
    }
};

// Clipping
const planes = [
    new Plane(new Vector3(- 1, 0, 0), params.clipping.planeX.constant),
    new Plane(new Vector3(0, - 1, 0), params.clipping.planeY.constant),
    new Plane(new Vector3(0, 0, - 1), params.clipping.planeZ.constant)
];
const planeHelpers = planes.map(p => new PlaneHelper(p, params.resolution, 0x000000));
planeHelpers.forEach(ph => {
    ph.visible = false;
    // scene.add(ph);
});

// Voxel Loader
let loader = new VoxelLoader();

let material = new MeshPhongMaterial({
    clippingPlanes: planes
});
loader.setVoxelMaterial(material);
loader.setVoxelSize(params.size)
loader.setLOD(params.LOD.maxPoints, params.LOD.maxDepth);

//   generateVoxelMesh(polygon).then(mesh => renderModel(mesh));

function generateVoxelMesh(object) {
    return new Promise((resolve) => {
        let sampler = new Sampler("raycast", { color: params.color, fill: params.fill });
        let volume = sampler.sample(object, params.resolution);
        cache.volume = volume;

        let exporter = new ArrayExporter();
        exporter.parse(volume, ([voxels, colors]) => {

            loader.parseData({ voxels, colors }, 'array').then(voxels => {
                let mesh = loader.generateMesh(voxels);
                resolve(mesh);
            });
        })
    });
}

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
let _threeFiber = null
const ThreeGrabber = (props) => {
    _threeFiber = useThree()
    return null
}


const compute_sizing = () => {
    // compute  size of the canvas:
    const height = window.innerHeight
    const wWidth = window.innerWidth
    const width = Math.min(wWidth, height)

    // compute position of the canvas:
    const top = 0
    const left = (wWidth - width ) / 2
    return {width, height, top, left}
}


const SpiritVoxel = () => {

    const [sizing, setSizing] = useState(compute_sizing())
    const [isInitialized] = useState(true)

    let _timerResize = null
    const handle_resize = () => {
        // do not resize too often:
        if (_timerResize){
            clearTimeout(_timerResize)
        }
        _timerResize = setTimeout(do_resize, 200)
    }


    const do_resize = () => {
        _timerResize = null
        const newSizing = compute_sizing()
        setSizing(newSizing)
    }


    useEffect(() => {
        if (!_timerResize) {

        }
    }, [sizing])


    const callbackReady = (errCode, spec) => {
        if (errCode){
            console.log('AN ERROR HAPPENS. ERR =', errCode)
            return
        }

        console.log('INFO: JEELIZFACEFILTER IS READY')

    }


    useEffect(() => {
        window.addEventListener('resize', handle_resize)
        window.addEventListener('orientationchange', handle_resize)

    }, [isInitialized])

    console.log('RENDER')
    return (
        <>
        <div>
            {/* Canvas managed by three fiber, for AR: */}
            <Canvas className='mirrorX' style={{
                position: 'fixed',
                zIndex: 2,
                ...sizing
            }}
                    gl={{
                        preserveDrawingBuffer: true // allow image capture
                    }}
                    updateDefaultCamera = {false}
            >
                <ThreeGrabber sizing={sizing} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <Suspense fallback={null}>
                    <Sparkles position={[0, 0, 0]} scale={1.0}/>
                    <Bird vl={generateVoxelMesh} position={[0, 0, 0]}/>
                </Suspense>

                <EffectComposer>
                    <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <Pixelation granularity={0} />
                </EffectComposer>
            </Canvas>

        </div>

    <Fab>
        <ButtonPrimary onClick={() => true}>
        Snapshot
        </ButtonPrimary>
    </Fab>
    </>
    )
}

export default SpiritVoxel
