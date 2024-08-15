import {useCallback, useRef, useState} from "react";
import {Camera} from "react-camera-pro";
import "./App.css";
import {EarthCanvas} from "./EarchCanvas";
import {ObjCanvas} from "./ObjCanvas";

function App() {
    const [view, setView] = useState<'3d' | 'camera'>('3d');
    const [image, setImage] = useState(null);
    const [model, setModel] = useState<'earth' | 'sofa'>('earth');

    const onOpenCamera = () => {
        setView(view === 'camera' ? '3d' : 'camera');
    }

    const onSwitch = () => {
        webcamRef.current.switchCamera();
    }

    const onChangeObject = (val: any) => {
        setModel(val);
    };

    const webcamRef = useRef<any>(null);
    const cameraCanvasRef = useRef<any>(null);
    const overlayCanvasRef = useRef<any>(null);
    const resultCanvasRef = useRef<any>(null);
    const downloadLinkRef = useRef<any>(null);

    const onBack = () => {
        setView('3d');
    };

    const handleTakePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.takePhoto();
        const cameraCanvas = cameraCanvasRef.current;
        const overlayCanvas = overlayCanvasRef.current;
        const resultCanvas = resultCanvasRef.current;
        const cameraCtx = cameraCanvas.getContext('2d');
        // const overlayCtx = overlayCanvas.getContext('2d');
        const resultCtx = resultCanvas.getContext('2d');

        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            cameraCanvas.width = img.width;
            cameraCanvas.height = img.height;
            cameraCtx.drawImage(img, 0, 0);

            resultCanvas.width = img.width;
            resultCanvas.height = img.height;

            resultCtx.drawImage(cameraCanvas, 0, 0);

            resultCtx.drawImage(overlayCanvas, 0, 0, img.width, img.height);

            const finalImage = resultCanvas.toDataURL('image/jpeg');
            setImage(finalImage);

            downloadLinkRef.current.href = finalImage;
            downloadLinkRef.current.download = 'captured_image.jpg';
        };
    }, [webcamRef, cameraCanvasRef, overlayCanvasRef, resultCanvasRef]);

    let Component: any = null;
    if (model === 'earth') {
        Component = EarthCanvas;
    }
    if (model === 'sofa') {
        Component = ObjCanvas;
    }

    return (
        <div style={{height: '100%'}}>
            <canvas ref={cameraCanvasRef} style={{display: 'none'}}/>
            <canvas ref={resultCanvasRef} style={{display: 'none'}}/>

            <h3>Example of 3d model on the Canvas</h3>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <button onClick={onChangeObject.bind(null, 'earth')}>Earth</button>
                    <button onClick={onChangeObject.bind(null, 'sofa')}>Sofa</button>
                </div>
                <div>
                    <button onClick={onOpenCamera}>Open Camera</button>
                </div>

            </div>

            <div style={{display: view === 'camera' ? 'block' : 'none'}}>
                <Camera ref={webcamRef} errorMessages={{
                    noCameraAccessible: "noCameraAccessible",
                    permissionDenied: "noCameraAccessible",
                    switchCamera: "switchCamera",
                    canvas: "canvas",
                }}/>
                <div style={{position: 'fixed', zIndex: 3, left: '5px', top: '5px'}}>
                    <button onClick={onBack}>
                        ←
                    </button>
                    <button onClick={onSwitch}>Switch
                        camera
                    </button>
                </div>

                <button style={{position: 'fixed', bottom: '5px', left: '5px', zIndex: '1'}}
                        onClick={handleTakePhoto}>Take photo
                </button>
                {
                    <div style={{
                        position: 'absolute',
                        width: '100px',
                        right: '15px',
                        top: '15px',
                        zIndex: 2,
                        display: image ? 'block' : 'none'
                    }}>
                        <img style={{width: '100%', height: '100%'}} src={image || ''}
                             alt='Taken photo'/>
                        <a ref={downloadLinkRef} style={{marginTop: '10px', display: 'block'}}>
                            Download Image
                        </a>
                    </div>
                }
                <Component ref={overlayCanvasRef} style={{
                    background: 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    top: 0
                }}/>
            </div>
            <Component style={{display: view === '3d' ? 'block' : 'none'}}/>
        </div>
    )
}

export default App
