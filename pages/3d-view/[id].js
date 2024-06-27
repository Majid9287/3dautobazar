import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { TextureLoader } from "three";
import ProgressBar from "@ramonak/react-progress-bar";
import * as THREE from "three";
import Skeleton from "../../components/3dSkeleton";

const PLYModel = ({ plyPath, texturePath, zoom, setProgress }) => {
  const modelRef = useRef();

  // Load texture
  const texture = useLoader(TextureLoader, texturePath);

  // Load PLY model with progress tracking
  const model = useLoader(PLYLoader, plyPath, (loader) => {
    loader.manager.onProgress = (item, loaded, total) => {
      setProgress(Math.round((loaded / total) * 100));
    };
  });

  useEffect(() => {
    if (model && modelRef.current) {
      if (model.isBufferGeometry) {
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(model, material);
        mesh.scale.set(zoom, zoom, zoom);
        modelRef.current.add(mesh);
      } else {
        model.traverse((child) => {
          if (child.isMesh) {
            child.scale.set(zoom, zoom, zoom);
            if (texture) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          }
        });
      }
    }
  }, [model, texture, zoom]);

  return <group ref={modelRef} />;
};

const ThreeDModel = ({ modelPath, texturePath, height, width, zoom }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return (
    <div style={{ position: "relative", height, width }}>
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6">
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
            plyPath={modelPath}
            texturePath={texturePath}
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
  const [modelData, setModelData] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      // Fetch the model data based on the id
      fetchModelData(id).then((data) => {
        setModelData({
          modelPath: data.modelPath,
          texturePath: data.texturePath,
          zoom: data.zoom,
        });
      });
    }
  }, [id]);

  const fetchModelData = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ads-details?adId=${id}`);
      const data = await response.json();
      if (data) {
        setLoading(false);
        return {
          modelPath: data.ad.model?.model, // Ensure this matches the actual API response
          texturePath: data.ad.model?.texture, // Ensure this matches the actual API response
          zoom: 5, // Default zoom to 25 if not provided
        };
      } else {
        console.error("Data not found");
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      return null;
    }
  };

 
  return (
    <section className="max-w-screen-xl mx-auto justify-center">
      {loading ? (
        <Skeleton />
      ) : (
        <div className="container mx-auto p-4">
          <ThreeDModel
            modelPath={modelData.modelPath}
            texturePath={modelData.texturePath}
            height="100vh"
            width="90vw"
            zoom={modelData.zoom}
          />
        </div>
      )}
    </section>
  );
};

export default ThreeDViewPage;
