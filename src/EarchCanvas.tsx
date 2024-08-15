import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {forwardRef, Suspense} from "react";
import {Earth} from "./Earth";


export const EarthCanvas = forwardRef(function (props: any, ref) {
    return (
        <Canvas gl={{ preserveDrawingBuffer: true }} {...props} style={{width: '100%', background: 'black', ...props.style}} ref={ref}>
            <ambientLight/>
            <OrbitControls enableZoom/>
            <Suspense fallback={null}>
                <Earth/>
            </Suspense>
            <Environment preset='sunset'/>
        </Canvas>
    );
});