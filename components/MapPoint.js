'use client'
import React from 'react';
import * as THREE from 'three';

const MapPoint = ({ point, onClick }) => {
  return (
    <mesh position={point} onClick={onClick}>
      <sphereGeometry args={[0.005, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
}

export default MapPoint