import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
    viewMode?: 'architecture' | 'dataflow';
    onNodeSelect?: (nodeName: string | null) => void;
}

export interface ServiceNodeInfo {
    id: string;
    title: string;
    description: string;
    category: string;
    color: string;
    position: [number, number, number];
}

export const SERVICE_NODES: ServiceNodeInfo[] = [
    {
        id: 'laravel',
        title: 'Laravel API',
        description: 'Business logic, authentication and REST services',
        category: 'Backend Architecture',
        color: '#FF2D20',
        position: [-2.2, 1.0, 0.3],
    },
    {
        id: 'react',
        title: 'React Interface',
        description: 'Responsive application interfaces and client interaction',
        category: 'Frontend & UI',
        color: '#61DAFB',
        position: [2.2, 1.0, 0.3],
    },
    {
        id: 'postgres',
        title: 'PostgreSQL',
        description: 'Relational data modeling and transactional storage',
        category: 'Database System',
        color: '#336791',
        position: [2.3, -0.9, -0.2],
    },
    {
        id: 'aivision',
        title: 'AI Vision',
        description: 'Image analysis and intelligent processing workflows',
        category: 'AI & OMR Pipeline',
        color: '#A855F7',
        position: [-2.3, -0.9, -0.2],
    },
    {
        id: 'workflow',
        title: 'Workflow Engine',
        description: 'Approvals, queues, state transitions and automation',
        category: 'Business Logic',
        color: '#10B981',
        position: [0.0, 1.7, -0.4],
    },
    {
        id: 'cloud',
        title: 'Cloud Runtime',
        description: 'Deployment, monitoring and production execution',
        category: 'Infrastructure',
        color: '#00F0FF',
        position: [0.0, -1.7, 0.4],
    },
];

// Workflow Sequences for Click Interactivity
const WORKFLOW_PATHS: Record<string, string[]> = {
    react: ['react', 'laravel', 'postgres'],
    laravel: ['laravel', 'workflow', 'postgres'],
    postgres: ['postgres', 'laravel', 'cloud'],
    aivision: ['aivision', 'laravel', 'postgres'],
    workflow: ['workflow', 'laravel', 'postgres'],
    cloud: ['cloud', 'laravel', 'react'],
};

// Procedural Canvas Texture for Glowing Spherical Particles
function createCircleTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

export default function ThreeCanvas({ viewMode = 'architecture', onNodeSelect }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredNode, setHoveredNode] = useState<ServiceNodeInfo | null>(null);
    const [activePath, setActivePath] = useState<string[]>([]);
    const [webglSupported, setWebglSupported] = useState(true);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [activeProjectPacket, setActiveProjectPacket] = useState<string>('OMR Processing: Image Capture → AI Vision → Result API');

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Check WebGL availability
        try {
            const canvasTest = document.createElement('canvas');
            const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
            if (!gl) {
                setWebglSupported(false);
                return;
            }
        } catch {
            setWebglSupported(false);
            return;
        }

        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            52,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 0, 6.2);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const particleTexture = createCircleTexture();

        // 1. CENTRAL PROCESSING CORE
        const coreGroup = new THREE.Group();
        scene.add(coreGroup);

        // Solid Inner Core
        const innerCoreGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const innerCoreMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0D9488'),
            emissive: new THREE.Color('#00F0FF'),
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.8,
        });
        const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
        coreGroup.add(innerCoreMesh);

        // Outer Wireframe Architectural Shell
        const outerShellGeo = new THREE.IcosahedronGeometry(0.95, 1);
        const outerShellMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color('#00F0FF'),
            wireframe: true,
            transparent: true,
            opacity: 0.45,
            shininess: 100,
        });
        const outerShellMesh = new THREE.Mesh(outerShellGeo, outerShellMat);
        coreGroup.add(outerShellMesh);

        // Rotating Structural Rings
        const ring1Geo = new THREE.TorusGeometry(1.25, 0.015, 16, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color('#00F0FF'), transparent: true, opacity: 0.6 });
        const ring1Mesh = new THREE.Mesh(ring1Geo, ringMat1);
        ring1Mesh.rotation.x = Math.PI / 3;
        ring1Mesh.rotation.y = Math.PI / 6;
        coreGroup.add(ring1Mesh);

        const ring2Geo = new THREE.TorusGeometry(1.4, 0.012, 16, 64);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color('#A855F7'), transparent: true, opacity: 0.5 });
        const ring2Mesh = new THREE.Mesh(ring2Geo, ringMat2);
        ring2Mesh.rotation.x = -Math.PI / 4;
        ring2Mesh.rotation.y = -Math.PI / 4;
        coreGroup.add(ring2Mesh);

        // 2. SERVICE NODES CREATION
        const nodeMeshesMap: Map<string, THREE.Group> = new Map();
        const nodeMeshesList: THREE.Object3D[] = [];

        SERVICE_NODES.forEach((nodeInfo) => {
            const nodeGroup = new THREE.Group();
            nodeGroup.position.set(...nodeInfo.position);

            const baseColor = new THREE.Color(nodeInfo.color);

            let nodeGeo: THREE.BufferGeometry;
            if (nodeInfo.id === 'laravel') {
                // Server / Gateway node (stacked slabs)
                nodeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
            } else if (nodeInfo.id === 'react') {
                // Layered interface panel
                nodeGeo = new THREE.BoxGeometry(0.48, 0.32, 0.08);
            } else if (nodeInfo.id === 'postgres') {
                // Database cylinder
                nodeGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.45, 24);
            } else if (nodeInfo.id === 'aivision') {
                // AI Vision scan target ring
                nodeGeo = new THREE.TorusGeometry(0.24, 0.05, 16, 32);
            } else if (nodeInfo.id === 'workflow') {
                // Workflow process block
                nodeGeo = new THREE.BoxGeometry(0.38, 0.38, 0.25);
            } else {
                // Cloud deployment sphere cluster
                nodeGeo = new THREE.SphereGeometry(0.26, 24, 24);
            }

            const nodeMat = new THREE.MeshStandardMaterial({
                color: baseColor,
                emissive: baseColor,
                emissiveIntensity: 0.4,
                roughness: 0.2,
                metalness: 0.8,
            });

            const mesh = new THREE.Mesh(nodeGeo, nodeMat);
            mesh.userData = { nodeInfo };
            nodeGroup.add(mesh);
            nodeMeshesList.push(mesh);

            // Outer Wireframe Glow Ring around each node
            const glowRingGeo = new THREE.TorusGeometry(0.38, 0.01, 16, 32);
            const glowRingMat = new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.4 });
            const glowRingMesh = new THREE.Mesh(glowRingGeo, glowRingMat);
            glowRingMesh.rotation.x = Math.PI / 2;
            nodeGroup.add(glowRingMesh);

            scene.add(nodeGroup);
            nodeMeshesMap.set(nodeInfo.id, nodeGroup);
        });

        // 3. ANIMATED DATA FLOW CONNECTION PATHS
        interface ConnectionPath {
            nodeId: string;
            line: THREE.Line;
            curve: THREE.QuadraticBezierCurve3;
            packet: THREE.Mesh;
            material: THREE.LineBasicMaterial;
        }

        const connections: ConnectionPath[] = [];

        SERVICE_NODES.forEach((nodeInfo) => {
            const startVec = new THREE.Vector3(...nodeInfo.position);
            const endVec = new THREE.Vector3(0, 0, 0);
            const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
            midVec.z += (startVec.x > 0 ? 0.3 : -0.3);

            const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
            const points = curve.getPoints(32);
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

            const lineMat = new THREE.LineBasicMaterial({
                color: new THREE.Color(nodeInfo.color),
                transparent: true,
                opacity: 0.35,
            });

            const line = new THREE.Line(lineGeo, lineMat);
            scene.add(line);

            // Animated Data Packet Sphere moving along the curve
            const packetGeo = new THREE.SphereGeometry(0.06, 16, 16);
            const packetMat = new THREE.MeshBasicMaterial({
                color: new THREE.Color('#FFFFFF'),
            });
            const packet = new THREE.Mesh(packetGeo, packetMat);
            packet.position.copy(startVec);
            scene.add(packet);

            connections.push({
                nodeId: nodeInfo.id,
                line,
                curve,
                packet,
                material: lineMat,
            });
        });

        // 4. AMBIENT BACKGROUND PARTICLES
        const particleCount = 120;
        const particlesGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            particlePos[i] = (Math.random() - 0.5) * 10;
            particlePos[i + 1] = (Math.random() - 0.5) * 10;
            particlePos[i + 2] = (Math.random() - 0.5) * 8;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

        const particlesMat = new THREE.PointsMaterial({
            size: 0.12,
            color: new THREE.Color('#00F0FF'),
            map: particleTexture,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // 5. LIGHTING
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00f0ff, 2.5, 15);
        pointLight1.position.set(3, 3, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xa855f7, 2, 15);
        pointLight2.position.set(-3, -3, 2);
        scene.add(pointLight2);

        // 6. RAYCASTING INTERACTION
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-999, -999);
        let hoveredNodeId: string | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            setTooltipPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top - 15,
            });
        };

        const handleClick = () => {
            if (hoveredNodeId) {
                const path = WORKFLOW_PATHS[hoveredNodeId] || [hoveredNodeId, 'laravel', 'postgres'];
                setActivePath(path);
                if (onNodeSelect) onNodeSelect(hoveredNodeId);

                // Auto reset path after 3.5s
                setTimeout(() => {
                    setActivePath([]);
                }, 3500);
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('click', handleClick);

        // 7. ANIMATION LOOP
        let animationFrameId: number;
        let clock = new THREE.Clock();

        // Project Packets Rotation Text
        const projectPacketList = [
            'OMR Processing: Image Capture → AI Vision → Result API',
            'Fintech Workflow: Application → Approval → Funding Pool → Ledger',
            'Automation Platform: Data Input → Classification → Workflow → Action',
        ];
        let packetInterval = setInterval(() => {
            setActiveProjectPacket((prev) => {
                const idx = projectPacketList.indexOf(prev);
                return projectPacketList[(idx + 1) % projectPacketList.length];
            });
        }, 4500);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            const animSpeed = prefersReducedMotion ? 0.2 : 1.0;

            // Core Rotations & Breathing Pulse
            coreGroup.rotation.y = elapsedTime * 0.25 * animSpeed;
            coreGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1 * animSpeed;

            ring1Mesh.rotation.z = elapsedTime * 0.4 * animSpeed;
            ring2Mesh.rotation.z = -elapsedTime * 0.3 * animSpeed;

            const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.03 * animSpeed;
            innerCoreMesh.scale.set(pulseScale, pulseScale, pulseScale);

            // Raycasting
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(nodeMeshesList, false);

            if (intersects.length > 0) {
                const nodeInfo = intersects[0].object.userData.nodeInfo as ServiceNodeInfo;
                if (nodeInfo.id !== hoveredNodeId) {
                    hoveredNodeId = nodeInfo.id;
                    setHoveredNode(nodeInfo);
                    container.style.cursor = 'pointer';
                }
            } else if (hoveredNodeId !== null) {
                hoveredNodeId = null;
                setHoveredNode(null);
                container.style.cursor = 'default';
            }

            // Update Service Nodes & Connection Paths
            connections.forEach((conn, idx) => {
                const isHovered = hoveredNodeId === conn.nodeId;
                const isPathActive = activePath.length > 0 && activePath.includes(conn.nodeId);

                // Highlight active or hovered lines
                if (isHovered || isPathActive) {
                    conn.material.opacity = 0.95;
                    conn.material.linewidth = 2;
                } else if (hoveredNodeId !== null || activePath.length > 0) {
                    conn.material.opacity = 0.15;
                } else {
                    conn.material.opacity = 0.35;
                }

                // Data Packet Movement along Curve
                const t = ((elapsedTime * (0.35 + idx * 0.05) * animSpeed) + (idx * 0.2)) % 1;
                const point = conn.curve.getPoint(t);
                conn.packet.position.copy(point);
            });

            // Rotate Service Node Shapes
            SERVICE_NODES.forEach((n) => {
                const group = nodeMeshesMap.get(n.id);
                if (group) {
                    group.rotation.y = elapsedTime * 0.5 * animSpeed;
                    group.rotation.x = Math.sin(elapsedTime * 0.4 + n.position[0]) * 0.15 * animSpeed;

                    const isSelected = hoveredNodeId === n.id || activePath.includes(n.id);
                    const targetScale = isSelected ? 1.25 : 1.0;
                    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
                }
            });

            // Gentle Parallax
            camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.03;
            camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
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
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('click', handleClick);
            window.removeEventListener('resize', handleResize);
            clearInterval(packetInterval);
            cancelAnimationFrame(animationFrameId);

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            // Memory Disposal
            innerCoreGeo.dispose();
            innerCoreMat.dispose();
            outerShellGeo.dispose();
            outerShellMat.dispose();
            ring1Geo.dispose();
            ringMat1.dispose();
            ring2Geo.dispose();
            ringMat2.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
            particleTexture.dispose();

            connections.forEach((c) => {
                c.line.geometry.dispose();
                c.line.material.dispose();
                c.packet.geometry.dispose();
                (c.packet.material as THREE.Material).dispose();
            });

            renderer.dispose();
        };
    }, [viewMode]);

    if (!webglSupported) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/80 rounded-2xl text-white font-mono text-xs border border-white/10">
                <div className="text-teal-400 font-bold text-sm mb-2">Intelligent Platform Architecture</div>
                <div className="text-gray-400 max-w-xs leading-relaxed">
                    Connecting Laravel API, React Interface, PostgreSQL, AI Vision, Workflow Engine & Cloud Runtime.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative overflow-hidden select-none">
            <div ref={containerRef} className="w-full h-full" aria-label="3D Intelligent Platform Architecture Network" />

            {/* Orbiting Project Data Packet Banner */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-slate-900/85 border border-white/15 text-[11px] font-mono text-teal-400 dark:text-[#00F0FF] backdrop-blur-md shadow-lg flex items-center gap-2 max-w-full truncate">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
                    <span className="truncate">{activeProjectPacket}</span>
                </div>
            </div>

            {/* Compact Tooltip Overlay on Node Hover */}
            {hoveredNode && (
                <div 
                    className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3.5 py-2 rounded-xl bg-slate-900/95 border border-teal-500/40 text-white shadow-2xl backdrop-blur-xl text-xs max-w-xs transition-opacity duration-200"
                    style={{ left: Math.max(80, Math.min(tooltipPos.x, (containerRef.current?.clientWidth || 400) - 80)), top: Math.max(50, tooltipPos.y) }}
                >
                    <div className="font-bold flex items-center gap-1.5 text-teal-400 dark:text-[#00F0FF]">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                        {hoveredNode.title}
                    </div>
                    <div className="text-[11px] text-gray-300 mt-0.5 leading-snug font-sans">{hoveredNode.description}</div>
                    <div className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-wider">{hoveredNode.category}</div>
                </div>
            )}
        </div>
    );
}
