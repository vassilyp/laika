'use client'
import react, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import Loader from './Loader.js';
import MapPoint from './MapPoint.js';
import Stars from './Stars.js';

const Globe = () => {
  const globe = useGLTF('./model/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.8} groundColor='black' />

      <ambientLight intensity={0.3} />

      <primitive
        object={globe.scene}
        scale={1.2}
        position={[0, -1.325, 0]}
        rotation={[0, 3.15, 0]}
      />
    </mesh>
  )
}

const GlobeCanvas = ({ locationHandler }) => {
  let clicked = false;

  // const coords2Cart = ([latCart, lonCart]) => {
  //   const [lat, lon] = [((latCart*Math.PI)/180), ((lonCart*Math.PI)/180)]
  //   const x = R * Math.cos(lat) * Math.cos(lon);
  //   const z = -R * Math.cos(lat) * Math.sin(lon);
  //   const y = R * Math.sin(lat);

  //   return [x, y, z];
  // }

  const cart2Coords = ([x, y, z]) => {
    const R = Math.sqrt(x * x + y * y + z * z);

    const latRad = Math.asin(y / R);  
    const lonRad = Math.atan2(-z, x); 
  
    const lat = (latRad * 180) / Math.PI; 
    const lon = (lonRad * 180) / Math.PI; 
  
    return [lat, lon];
  };

  const fibonacciSphere = (samples) => {
    const points = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);

    for (let i = 0; i < samples; i++) {
      const scale = 0.9;
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push([x / scale, y / scale, z / scale]);
    }

    return points;
  }

  const points = fibonacciSphere(2000);

  return (
    <Canvas
      className='bg-black/95'
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [4, 0, 4], fov: 40 }}
    >
      <Suspense fallback={<Loader />}>
        <Globe />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={1}
      />

      {points.map((point) => (
        <MapPoint key={point} point={point} onClick={() => {
          if (!clicked) {
            clicked = true;
            console.log(cart2Coords(point));
            if (locationHandler) {
              locationHandler(point);
            }
          }
        }} />
      ))}

      <Stars />

      <Preload all />
    </Canvas>
  )
}

export default GlobeCanvas