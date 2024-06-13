import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import Link from 'next/link';

const ObjModel = ({ objPath, mtlPath, zoom }) => {
  const objRef = useRef();

  // Load materials
  const materials = useLoader(MTLLoader, mtlPath, (loader) => {
    loader.setCrossOrigin('anonymous');
  });

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
      <Suspense fallback={<div>Loading...</div>}>
        <ObjModel objPath={modelPath} mtlPath={mtlPath} zoom={zoom} />
      </Suspense>
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  );
};

const ThreeDViewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [modelData, setModelData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const downloadFile = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to download');
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length');
        let receivedLength = 0;
        const chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.length;
          setProgress((receivedLength / contentLength) * 100);
        }
        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        return new Blob([chunksAll]);
      } catch (err) {
        console.error('Download error:', err);
        setError(err.message);
        throw err;
      }
    };

    const loadModel = async () => {
      try {
        const objPath = 'https://firebasestorage.googleapis.com/v0/b/dautobazaar.appspot.com/o/3dModels%2Fdonut.obj?alt=media&token=c93e930a-69f6-4726-ab19-f955caa7023d';
        const mtlPath = 'https://firebasestorage.googleapis.com/v0/b/dautobazaar.appspot.com/o/3dModels%2Fdonut.mtl?alt=media&token=01ae6c68-2357-4e5a-b306-98636d2491d6';

        const objBlob = await downloadFile(objPath);
        const mtlBlob = await downloadFile(mtlPath);

        setModelData({
          objURL: URL.createObjectURL(objBlob),
          mtlURL: URL.createObjectURL(mtlBlob),
          zoom: 1
        });
      } catch (err) {
        console.error('Model loading error:', err);
      }
    };

    loadModel();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">3D View of Car</h1>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : modelData ? (
        <ThreeDModel
          modelPath={modelData.objURL}
          mtlPath={modelData.mtlURL}
          height="500px"
          width="600px"
          zoom={modelData.zoom}
        />
      ) : (
        <div>
          <p>Loading... {Math.round(progress)}%</p>
          <progress value={progress} max="100" />
        </div>
      )}
    </div>
  );
};

export default ThreeDViewPage;
