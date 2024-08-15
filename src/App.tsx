import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import {Earth} from "./Earth";
import "./App.css";

function App() {
    return (
        <div style={{height: '100%'}}>
            <h3>Example of 3d model on the Canvas</h3>
            <Canvas style={{background: 'black'}}>
                <ambientLight/>
                <OrbitControls enableZoom/>
                <Suspense fallback={null}>
                    <Earth/>
                </Suspense>
                <Environment preset='sunset'/>
            </Canvas>
        </div>
    )
}

export default App
