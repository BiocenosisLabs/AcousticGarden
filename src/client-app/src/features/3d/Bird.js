/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import CustomShaderMaterial from 'three-custom-shader-material'
import React, {useMemo, useRef} from 'react'
import {MeshDistortMaterial, MeshWobbleMaterial, Text, Trail, useGLTF,} from '@react-three/drei'
import {patchShaders} from 'gl-noise/build/glNoise.m'
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three'
// import {Depth, Displace, Fresnel, LayerMaterial, Texture} from "lamina";
import { MathUtils, Mesh, Vector3 } from 'three'
const thickness = 0.2


export const vert = /* glsl */ `  
uniform float uTime;
uniform float uHeight;
varying float vHeight;


vec3 displace(vec3 point) {

  vec3 p = point;

  p.y += uTime * 2.0;

  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.4, 2.3, 0.4, 1.0, 5, false, false);

  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);
  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);
  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);

  vec3 n = vec3(0.0);

  if(p.z >= uHeight / 2.0) {
      n.z += gln_normalize(gln_pfbm(p.xy + (uTime * 0.5), fbmOpts));
      n += gln_GerstnerWave(p, A, uTime).xzy;
      n += gln_GerstnerWave(p, B, uTime).xzy * 0.5;
      n += gln_GerstnerWave(p, C, uTime).xzy * 0.25;
      n += gln_GerstnerWave(p, D, uTime).xzy * 0.2;
  }

  vHeight = n.z;

  return point + n;
}  

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}

vec3 recalcNormals(vec3 newPos) {
  float offset = 0.001;
  vec3 tangent = orthogonal(normal);
  vec3 bitangent = normalize(cross(normal, tangent));
  vec3 neighbour1 = position + tangent * offset;
  vec3 neighbour2 = position + bitangent * offset;

  vec3 displacedNeighbour1 = displace(neighbour1);
  vec3 displacedNeighbour2 = displace(neighbour2);

  vec3 displacedTangent = displacedNeighbour1 - newPos;
  vec3 displacedBitangent = displacedNeighbour2 - newPos;

  return normalize(cross(displacedTangent, displacedBitangent));
}


void main() {
  csm_Position = displace(position);
  csm_Normal = recalcNormals(csm_Position);
}
    `

export const frag = `
varying float vHeight;

uniform vec3 waterColor;
uniform vec3 waterHighlight;

uniform float offset;
uniform float contrast;
uniform float brightness;


vec3 calcColor() {

  float mask = (pow(vHeight, 2.) - offset) * contrast;

  vec3 diffuseColor = mix(waterColor, waterHighlight, mask);

  diffuseColor *= brightness;



  return diffuseColor;
}

void main() {
  csm_DiffuseColor = vec4(calcColor(), 1.0);   
}
    `

let voxelMesh = null

export default function Bird({vl,refa,...props}) {
    const group = useRef()
    const {nodes, materials} = useGLTF('/untitled.glb')

    const materialRef = useRef(null)
    const rand = useMemo(() => Math.random(), [])
    const strength = useRef(0)

    console.log({nodes,materials})


    useFrame(({ clock }, dt) => {
        // if (materialRef?.current) {
        //     materialRef.current.uniforms.uTime.value = -clock.elapsedTime / 2
        // }

        if (!voxelMesh) {
           // vl(nodes.bird001.geometry).then((mesh) => voxelMesh = mesh)
           // console.log({voxelMesh})
        }
        // console.log(state.clock.getDelta())
        if (group.current) {
            group.current.rotation.x = (0.3) * Math.sin(clock.elapsedTime)
            group.current.rotation.y = (0.3) * Math.sin(clock.elapsedTime)
        }

        // if (ref.current) {
        //     ref.current.position.y = Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2
        //
        //     if (displaceRef.current.strength !== strength.current) {
        //         displaceRef.current.strength = MathUtils.lerp(
        //             displaceRef.current.strength, //
        //             strength.current,
        //             0.1
        //         )
        //     }
        //
        //     if (strength.current > 0) {
        //         displaceRef.current.offset.x += 0.3 * dt
        //     }
        // }

    })

    // const displaceRef = useRef(null)



    // function getCustomShaderMaterial() {
    //     return <CustomShaderMaterial
    //         ref={materialRef}
    //         baseMaterial={THREE.MeshPhysicalMaterial}
    //         // baseMaterial={() => materials['uv.gltb.export']}
    //         vertexShader={patchShaders(vert)}
    //         fragmentShader={frag}
    //         flatShading
    //         color={0xaf009c}
    //         roughness={0.2}
    //         metalness={0.1}
    //         uniforms={{
    //             uTime: {value: 0},
    //             waterColor: {
    //                 value: new THREE.Color('#af009c').convertLinearToSRGB(),
    //             },
    //             waterHighlight: {
    //                 value: new THREE.Color('#df9210').convertLinearToSRGB(),
    //             },
    //             offset: {
    //                 value: 0.4,
    //             },
    //             contrast: {
    //                 value: 3.1,
    //             },
    //             brightness: {
    //                 value: 1,
    //             },
    //             uHeight: {
    //                 value: 1,
    //             },
    //         }}
    //     />;
    // }

    return (
        <group ref={group} {...props} dispose={null}>


                    <mesh
                        ref={refa}
                        geometry={nodes.Goldfish_STTP2QE.geometry}
                        // geometry={voxelMesh}
                        material={materials['GoldFish_Mat']}
                        position={[0.05, -0.7, -0.00]}
                        rotation={[-Math.PI, 1.21, -Math.PI]}
                        scale={0.40}
                    >

                    </mesh>

                {/*    */}
                {/*<LayerMaterial>*/}
                {/*    <material */}
                {/*    />*/}
                {/*</LayerMaterial>*/}


        </group>
    )
}

useGLTF.preload('/untitled.glb')
