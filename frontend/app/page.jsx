'use client';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export default function App() {
  return (
    // Add h-screen and w-screen to make the container fill the viewport
    <div className="h-screen w-screen overflow-hidden">
      <Canvas camera={[]} className="h-full w-full">
        <directionalLight position={[-2, 3, 4]}/>
          <Stormdrain />
      </Canvas>
    </div>
  );
}

function Stormdrain() {
  const [droplets, setDroplets] = useState([])
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta
  })

  function getRandomPointInCircle(radius) {
    // Generate a random angle between 0 and 2π
    const theta = Math.random() * 2 * Math.PI;
  
    // Generate a random radius within the circle using sqrt for uniform distribution
    const r = Math.sqrt(Math.random()) * radius;
  
    // Convert polar coordinates to Cartesian coordinates
    const z = r * Math.cos(theta);
    const y = r * Math.sin(theta);
  
    return { y, z };
  }

  // Initialize droplets once
  useEffect(() => {
    const newDropletList = [];
    for (let i = 0; i < 3000; i++) {
      const { y, z } = getRandomPointInCircle(0.2);
      let x_pos = (Math.random() * 0.3) + 1
      let y_pos = 1.5 + y;
      if (Math.random() < 0.5) {
        y_pos = 1.5 + y
      } else {
        y_pos = 0.5 + y
      }
      const z_pos = z;
      newDropletList.push({ x_pos, y_pos, z_pos });
    }
    setDroplets(newDropletList);
  }, []); 

  return (
    <group ref={ref} rotation={[0, -Math.PI / 8, 0]}>
      <Drain/>
      {droplets.length != 0 && droplets.map((droplet) => {
        return (
          <WaterDroplet x_start={droplet.x_pos} y_start={droplet.y_pos} z_start={droplet.z_pos}/>
        )
      })}
    </group>
  )
}

function Drain() {
  return (
    <>
    <group position={[0, 1, 0]} rotation={[0, 0, 0]}>
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

function WaterDroplet({x_start, y_start, z_start}) {
  const ref = useRef()

   // Initialize the velocity variable
  const [yVelocity, setYVelocity] = useState(0); 

  useFrame((state, delta) => {
    if (ref.current.position.y > -0.1) {
      // Update x position for horizontal movement
      ref.current.position.x +=  3 * delta;

      // Update y position and apply gravity-like acceleration
      ref.current.position.y += yVelocity * delta;
      setYVelocity((prevVelocity) => prevVelocity - 9.8 * delta); // Simulate gravity

    } else {
      // Reset droplet position and velocity once it goes below the threshold
      ref.current.position.x = x_start;
      ref.current.position.y = y_start;
      setYVelocity(0); // Reset velocity for a new drop
    }
  });

  return (
    <>
    <mesh ref={ref} position={[x_start, y_start, z_start]} rotation={[0, 0, 0]}>
      <boxGeometry args={[0.1, 0.1, 0.1]}/>
      <meshStandardMaterial color={"#2550f1"}/>
    </mesh>
    </>
  )
}

