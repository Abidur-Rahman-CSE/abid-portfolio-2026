import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
    isDark: boolean;
}

export default function Background3D({ isDark }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Three.js Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 1. Ambient Particle Starfield
        const particleCount = 350;
        const particlesGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const primaryColor = isDark ? new THREE.Color('#00F0FF') : new THREE.Color('#0D9488');
        const secondaryColor = isDark ? new THREE.Color('#A855F7') : new THREE.Color('#4F46E5');

        const particlesMat = new THREE.PointsMaterial({
            size: isDark ? 0.045 : 0.055,
            color: primaryColor,
            transparent: true,
            opacity: isDark ? 0.5 : 0.35,
        });

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // 2. Floating 3D Geometries (Icosahedron, Octahedron, Torus)
        const floatingGeos: THREE.Mesh[] = [];
        const geoCount = 5;

        for (let i = 0; i < geoCount; i++) {
            const geo = i % 2 === 0 
                ? new THREE.IcosahedronGeometry(0.5 + Math.random() * 0.3, 0)
                : new THREE.OctahedronGeometry(0.6 + Math.random() * 0.4, 0);

            const mat = new THREE.MeshPhongMaterial({
                color: i % 2 === 0 ? primaryColor : secondaryColor,
                wireframe: true,
                transparent: true,
                opacity: isDark ? 0.25 : 0.15,
            });

            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 10
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            scene.add(mesh);
            floatingGeos.push(mesh);
        }

        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(primaryColor, 2, 25);
        pointLight1.position.set(4, 4, 4);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(secondaryColor, 2, 25);
        pointLight2.position.set(-4, -4, 2);
        scene.add(pointLight2);

        // Mouse Parallax Interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            particleSystem.rotation.y += 0.0006;
            particleSystem.rotation.x += 0.0003;

            floatingGeos.forEach((mesh, idx) => {
                mesh.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
                mesh.rotation.y += 0.004 * (idx % 2 === 0 ? -1 : 1);
            });

            // Camera Inertia
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.04;
            camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Responsive Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            particlesGeo.dispose();
            particlesMat.dispose();
            floatingGeos.forEach(m => {
                m.geometry.dispose();
                (m.material as THREE.Material).dispose();
            });
            renderer.dispose();
        };
    }, [isDark]);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700" 
            style={{ opacity: 0.9 }}
        />
    );
}
