import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import Link from "next/link";
import ProgressBar from "@ramonak/react-progress-bar";

const ObjModel = ({ objPath, mtlPath, zoom, setProgress }) => {
  const objRef = useRef();

  // Load materials
  const materials = useLoader(MTLLoader, mtlPath);
  materials.preload();

  // Load object with progress tracking
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    if (materials) loader.setMaterials(materials);
    loader.manager.onProgress = (item, loaded, total) => {
      setProgress(Math.round((loaded / total) * 100));
    };
  });

  useEffect(() => {
    if (objRef.current) {
      objRef.current.scale.set(zoom, zoom, zoom);
    }
  }, [obj, zoom]);

  return <primitive ref={objRef} object={obj} />;
};

const ThreeDModel = ({ modelPath, mtlPath, height, width, zoom }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <div style={{ position: 'relative', height, width }}>
    {loading && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6"> 
    <ProgressBar className="" completed={progress} borderRadius="0px" bgColor="#0e7a04" />
    <div className="flex justify-center text-center">
    <p>Loading {progress}%</p>
  </div> </div>
)}
      <Canvas style={{ height: '100%', width: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ObjModel
            objPath={modelPath}
            mtlPath={mtlPath}
            zoom={zoom}
            setProgress={setProgress}
          />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
};

const ThreeDViewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch the model data based on the id
  const modelData = {
    objPath:
      "https://firebasestorage.googleapis.com/v0/b/dautobazaar.appspot.com/o/3dModels%2Fdonut.obj?alt=media&token=c93e930a-69f6-4726-ab19-f955caa7023d",
    mtlPath:
      "https://firebasestorage.googleapis.com/v0/b/dautobazaar.appspot.com/o/3dModels%2Fdonut.mtl?alt=media&token=01ae6c68-2357-4e5a-b306-98636d2491d6",
    zoom: 25, // Adjust zoom to make the object appear larger initially
  };

  return (
    <section className="max-w-screen-xl mx-auto justify-center">
      <div className="container mx-auto p-4">
        <ThreeDModel
          modelPath={modelData.objPath}
          mtlPath={modelData.mtlPath}
          height="100vh" // Use full viewport height
          width="95vw" // Use full viewport width
          zoom={modelData.zoom}
        />
      </div>
    </section>
  );
};

export default ThreeDViewPage;
