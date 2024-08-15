import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {forwardRef, Suspense} from "react";
import {Obj} from "./Obj";


export const ObjCanvas = forwardRef(function (props: any, ref) {
    return (
        <Canvas gl={{preserveDrawingBuffer: true}} {...props}
                style={{width: '100%', background: 'black', ...props.style}} ref={ref}>
            <ambientLight/>
            <OrbitControls enableZoom/>
            <Suspense fallback={null}>
                <Obj/>
            </Suspense>
            <Environment preset='sunset'/>
        </Canvas>
    );
});