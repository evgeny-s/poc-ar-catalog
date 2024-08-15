/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 earth.gltf 
Author: PatelDev (https://sketchfab.com/PatelDev)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/earth-f7a76c63ff1846afb2d606e5c8369c15
Title: Earth
*/

import {useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber';

export function Earth(props: any) {
    const {nodes, materials}: any = useGLTF(import.meta.env.BASE_URL + '/earth.gltf');

    const objRef = useRef<any>();

    useFrame((_, delta) => {
        objRef.current.rotation.y += 0.2 * delta
    })

    return (
        <group {...props} dispose={null}>
            <mesh ref={objRef} geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} scale={2}/>
        </group>
    )
}

useGLTF.preload(import.meta.env.BASE_URL + '/earth.gltf')
