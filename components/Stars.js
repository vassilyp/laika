'use client'
import React from 'react';
import MapPoint from './MapPoint';

const Star = ({ point }) => {
  return (
    <mesh position={point}>
      <sphereGeometry args={[0.001, 32, 32]} />
      <meshStandardMaterial color={'white'} />
    </mesh>
  );
}

const Stars = () => {
  const fibonacciSphere = (samples) => {
    const points = [];
    const phi = Math.PI * (Math.sqrt(5) - 1);
  
    for (let i = 0; i < samples; i++) {
      const scale = 1;
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y); 
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const bool = Math.round(Math.random()*0.55);

      if (bool) {
        points.push([x/scale, y/scale, z/scale]); 
      }
    }
  
    return points;
  }
  
  const points = fibonacciSphere(10000);

  return (
    <>
      {points.map((point) => (
        <Star key={point} point={point} />
      ))}
    </>
  )
}

export default Stars