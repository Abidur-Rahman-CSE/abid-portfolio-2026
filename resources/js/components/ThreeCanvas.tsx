import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
    wireframe?: boolean;
    speed?: number;
    color?: string;
}

export default function ThreeCanvas({ wireframe = false, speed = 0.005, color = '#00F0FF' }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [fps, setFps] = useState(60);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Scene, Camera, Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 4.5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Core Polyhedron Mesh (Icosahedron + Octahedron Inner Core)
        const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
        const outerMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(color),
            wireframe: wireframe,
            transparent: true,
            opacity: wireframe ? 0.85 : 0.65,
            shininess: 90,
            flatShading: true,
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        scene.add(outerMesh);

        // Inner Glowing Core
        const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
        const innerMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#A855F7'),
            roughness: 0.2,
            metalness: 0.8,
            emissive: new THREE.Color('#7000FF'),
            emissiveIntensity: 0.6,
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerMesh);

        // Ambient Particle Starfield
        const particleCount = 200;
        const particlesGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 12;
            positions[i + 1] = (Math.random() - 0.5) * 12;
            positions[i + 2] = (Math.random() - 0.5) * 12;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.035,
            color: new THREE.Color('#00F0FF'),
            transparent: true,
            opacity: 0.6,
        });
        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
        pointLight.position.set(3, 3, 3);
        scene.add(pointLight);

        const purpleLight = new THREE.PointLight(0xa855f7, 2, 20);
        purpleLight.position.set(-3, -3, 2);
        scene.add(purpleLight);

        // Mouse Parallax
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop & FPS counter
        let lastTime = performance.now();
        let frameCount = 0;
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Rotate Meshes
            outerMesh.rotation.x += speed;
            outerMesh.rotation.y += speed * 1.5;

            innerMesh.rotation.x -= speed * 2;
            innerMesh.rotation.y -= speed * 1.2;

            particleSystem.rotation.y += speed * 0.2;

            // Damped Mouse Parallax
            camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);

            // FPS Calculation
            frameCount++;
            const now = performance.now();
            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
            }
        };

        animate();

        // Responsive Resize
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            outerGeo.dispose();
            outerMat.dispose();
            innerGeo.dispose();
            innerMat.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
            renderer.dispose();
        };
    }, [wireframe, speed, color]);

    return (
        <div className="w-full h-full relative">
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-emerald-400 bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                ● WebGL 3D Active | {fps} FPS
            </div>
        </div>
    );
}
