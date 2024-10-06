'use client'
import react, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import Loader from './Loader.js';
import MapPoint from './MapPoint.js';

const Globe = () => {
  const globe = useGLTF('./model/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.8} groundColor='black' />

      <ambientLight intensity={0.3} />

      <primitive
        object={globe.scene}
        scale={0.1}
        position={[0, -0.11, 0]}
        rotation={[0, 3.15, 0]}
      />
    </mesh>
  )
}

const GlobeCanvas = () => {
  let clicked = false;

  // const coords2Cart = ([latCart, lonCart]) => {
  //   const [lat, lon] = [((latCart*Math.PI)/180), ((lonCart*Math.PI)/180)]
  //   const x = R * Math.cos(lat) * Math.cos(lon);
  //   const z = -R * Math.cos(lat) * Math.sin(lon);
  //   const y = R * Math.sin(lat);

  //   return [x, y, z];
  // }

  const fibonacciSphere = (samples) => {
    const points = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
  
    for (let i = 0; i < samples; i++) {
      const scale =10.7;
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y); 
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push([x/scale, y/scale, z/scale]); 
    }
  
    return points;
  }
  
  const points = fibonacciSphere(2000);

  return (
    <Canvas
      className='bg-black/90'
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, -15], fov: 1 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          autoRotate={true}
          enableZoom={true}
          autoRotateSpeed={0.8}
        />
        <Globe />
      </Suspense>

      {points.map((point) => (
        <MapPoint key={point} point={point} onClick={() => {
          if (!clicked) {
            clicked = true;
            console.log(point)
          }
        }} />
      ))}

      <Preload all />
    </Canvas>
  )
}

export default GlobeCanvas