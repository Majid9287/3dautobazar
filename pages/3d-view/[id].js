
import React, { Suspense, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import Link from "next/link";

const ObjModel = ({ objPath, mtlPath, zoom }) => {
  const objRef = useRef();

  // Load materials
  const materials = useLoader(MTLLoader, mtlPath);
  materials.preload();

  // Load object
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    if (materials) loader.setMaterials(materials);
  });

  useEffect(() => {
    if (objRef.current) {
      objRef.current.scale.set(zoom, zoom, zoom);
    }
  }, [obj, zoom]);

  return <primitive ref={objRef} object={obj} />;
};

const ThreeDModel = ({ modelPath, mtlPath, height, width, zoom }) => {
  return (
    <Canvas style={{ height: height, width: width }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <ObjModel objPath={modelPath} mtlPath={mtlPath} zoom={zoom} />
      </Suspense>
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">3D View of Car</h1>
      <ThreeDModel
        modelPath={modelData.objPath}
        mtlPath={modelData.mtlPath}
        height="100vh" // Use full viewport height
        width="100vw" // Use full viewport width
        zoom={modelData.zoom}
      />
      <div className="mt-4">
        <Link
          href={`/car-details/${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Back to Details
        </Link>
      </div>
    </div>
  );
};

export default ThreeDViewPage;
