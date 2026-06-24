"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const material1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const material2Ref = useRef<THREE.MeshStandardMaterial>(null);

  // Animate on scroll using GSAP
  useGSAP(() => {
    if (!groupRef.current) return;
    
    // As we scroll down the entire page, rotate the 3D group
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      x: Math.PI / 2,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth scrubbing
      }
    });

    // Move the meshes slightly apart as you scroll
    gsap.to(mesh1Ref.current?.position || {}, {
      y: 2,
      x: -2,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        scrub: 1,
      }
    });

    // Intro Creating Experience Animation
    if (mesh1Ref.current && material1Ref.current) {
      // Initial hidden state
      mesh1Ref.current.scale.set(0, 0, 0);
      material1Ref.current.opacity = 0;
      material1Ref.current.wireframe = true;

      const tl = gsap.timeline({ delay: 2.8 }); // Starts right as the image begins fading out
      
      tl.to(mesh1Ref.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2, ease: "elastic.out(1, 0.7)" })
        .to(material1Ref.current, { opacity: 0.8, duration: 1 }, "<")
        .to(material1Ref.current, { wireframe: false, duration: 0.5 }, "+=0.2");
    }

    if (mesh2Ref.current && material2Ref.current) {
      mesh2Ref.current.scale.set(0, 0, 0);
      material2Ref.current.opacity = 0;

      gsap.to(mesh2Ref.current.scale, { x: 1, y: 1, z: 1, duration: 2, delay: 3.5, ease: "elastic.out(1, 0.7)" });
      gsap.to(material2Ref.current, { opacity: 1, duration: 1, delay: 3.5 });
    }

  });

  // Continuous subtle floating
  useFrame((state) => {
    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      mesh1Ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = -state.clock.elapsedTime * 0.1;
      mesh2Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mesh1Ref} position={[1, 0, -2]} scale={1.5}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial 
            ref={material1Ref}
            color="#ffffff" 
            roughness={0.4} 
            metalness={0.6}
            transparent
            opacity={0.8}
            wireframe={false}
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={mesh2Ref} position={[-2, -1, -5]} scale={1}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            ref={material2Ref}
            color="#555555" 
            roughness={0.2} 
            metalness={0.8} 
            transparent
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-zinc-50 dark:bg-black w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <Environment preset="studio" />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
