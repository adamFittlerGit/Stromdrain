'use client';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail, Float, Line, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function App() {
  return (
    // Add h-screen and w-screen to make the container fill the viewport
    <div className="h-screen w-screen overflow-hidden">
      <Canvas camera={[]} className="h-full w-full">
        <directionalLight position={[-2, 3, 4]}/>
          <Drain/>
      </Canvas>
    </div>
  );
}

function Drain() {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta
  })

  return (
    <>
    <group ref={ref} position={[0, 1, 0]} rotation={[0, -Math.PI / 8, 0]}>
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}> 
        <cylinderGeometry args={[0.22, 0.22, 0.8]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
      <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}> 
        <cylinderGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
      <mesh position={[0.3, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.8]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
      <mesh position={[0.75, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
      <mesh  position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25 , 2]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
      <mesh  position={[0, -0.95, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.29, 0.29 , 0.1]} />
        <meshStandardMaterial color={"#908d8b"}/>
      </mesh>
    </group>
    </>
  )
}

function WaterDroplet() {
  return (
    <></>
  )
}
