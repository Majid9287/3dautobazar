import React, { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/router";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { TextureLoader } from "three";
import ProgressBar from "@ramonak/react-progress-bar";
import * as THREE from "three";
import Link from "next/link";
const PLYModel = ({ plyPath, texturePath, zoom, setProgress,setModelLoaded  }) => {
  const modelRef = useRef();

  // Load texture
  const texture = useLoader(TextureLoader, texturePath);

  // Load PLY model with progress tracking
  const model = useLoader(PLYLoader, plyPath, (loader) => {
    loader.manager.onProgress = (item, loaded, total) => {
      setProgress(Math.round((loaded / total) * 100));
    };

    loader.manager.onLoad = () => {
      setModelLoaded(true); // Set modelLoaded to true when the model is loaded
    };  
  });

  useEffect(() => {
    if (model && modelRef.current) {
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const mesh = new THREE.Mesh(model, material);
      mesh.scale.set(zoom, zoom, zoom);

      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center); // Center the model

      modelRef.current.add(mesh);
    }
  }, [model, texture, zoom]);

  return <group ref={modelRef} />;
};

const ThreeDViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false); // Add state for model loaded
  useEffect(() => {
    const progressValues = [5, 25, 50, 75, 85];
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < progressValues.length) {
        setProgress(progressValues[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    
      fetchModelData().then((data) => {
        setModelData(data);
        setLoading(false);
      });
    
  }, []);

  const fetchModelData = async () => {
   
        return {
          modelPath: "https://storage.googleapis.com/dautobazaar.appspot.com/scene_dense_mesh_refine_texture_20240705192559_34bccb9e87054a87bbe6f2fa1e650092.ply", // Ensure this matches the actual API response
          texturePath: "https://storage.googleapis.com/dautobazaar.appspot.com/scene_dense_mesh_refine_texture_20240705192559_b197207d883d4368962c6f88663fb0c8.png", // Ensure this matches the actual API response
          zoom: 5,
        };
      
  
  };

  return (
    <section className="max-w-screen-xl mx-auto justify-center">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container mx-auto p-4">
          <div style={{ position: "relative", height: "100vh", width: "90vw" }}>
            {!modelLoaded && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-12 md:px-0 md:w-1/6">
                <ProgressBar
                  completed={progress}
                  borderRadius="0px"
                  bgColor="#0e7a04"
                />
                <div className="flex justify-center text-center">
                  <p>Loading {progress}%</p>
                </div>
              </div>
            )}
            <Canvas style={{ height: "100%", width: "100%" }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <PLYModel
                  plyPath={modelData.modelPath}
                  texturePath={modelData.texturePath}
                  zoom={modelData.zoom}
                  setProgress={setProgress}
                  setModelLoaded={setModelLoaded} // Pass the setModelLoaded function
                />
              </Suspense>
              <OrbitControls enableZoom={true} enablePan={true} />
            </Canvas>
          </div>
        </div>
      )}
    </section>
  );
};

export default ThreeDViewPage;
