<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Abidur Rahman',
            'email' => 'abidur.rahman.dev@gmail.com',
            'password' => bcrypt('password'),
        ]);

        $projects = [
            [
                'title' => 'Genesis AI - Subject Choice & Allocation Engine',
                'description' => 'High-concurrency automated university subject allocation engine handling thousands of concurrent applicant scoring sessions with sub-second decision pipelines.',
                'tags' => ['Laravel', 'PHP 8.4', 'React', 'MySQL', 'Inertia.js'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'HyperScale LLM Inference Pipeline',
                'description' => 'Distributed GPU cluster orchestration system serving LLM inference with sub-20ms P99 latency. Implements dynamic batching, KV cache optimization, and model sharding.',
                'tags' => ['PyTorch', 'vLLM', 'Rust', 'Kubernetes', 'gRPC'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'EventPulse - Event-Driven Microservices Platform',
                'description' => 'Real-time financial telemetry processing engine handling over 50,000 events/sec. Built with Kafka, Go, and Redis with automated failover and zero message loss guaranteed.',
                'tags' => ['Golang', 'Apache Kafka', 'Redis', 'Docker', 'Prometheus'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'AbidPortfolio 3D - Three.js Software Engineer Showcase',
                'description' => 'Ultra-modern full-stack developer portfolio built on Laravel 13, Inertia v3, React 19, Tailwind CSS v4, and interactive Three.js 3D WebGL canvas elements.',
                'tags' => ['Laravel 13', 'React 19', 'TypeScript', 'Three.js', 'Tailwind CSS'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'EdgeVision - Autonomous Video Analytics Engine',
                'description' => 'Edge-deployed computer vision engine running TensorRT-optimized YOLO models on NVIDIA Jetson devices for multi-camera object tracking in industrial environments.',
                'tags' => ['C++', 'TensorRT', 'CUDA', 'OpenCV', 'MQTT'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'CloudForge - Automated Infrastructure Engine',
                'description' => 'Infrastructure-as-Code automated provisioning and drift detection platform connecting Terraform state with GitOps CI/CD pipelines.',
                'tags' => ['Terraform', 'AWS', 'Python', 'GitHub Actions', 'PostgreSQL'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        $skills = [
            // Languages & Core
            ['name' => 'Golang', 'category' => 'Languages & Core'],
            ['name' => 'Python 3.12', 'category' => 'Languages & Core'],
            ['name' => 'PHP 8.4', 'category' => 'Languages & Core'],
            ['name' => 'TypeScript', 'category' => 'Languages & Core'],
            ['name' => 'C++ / CUDA', 'category' => 'Languages & Core'],
            ['name' => 'Rust', 'category' => 'Languages & Core'],

            // Backend & Microservices
            ['name' => 'Laravel 13', 'category' => 'Backend & Systems'],
            ['name' => 'FastAPI & Django', 'category' => 'Backend & Systems'],
            ['name' => 'Node.js & Express', 'category' => 'Backend & Systems'],
            ['name' => 'gRPC & Protobuf', 'category' => 'Backend & Systems'],
            ['name' => 'REST & GraphQL APIs', 'category' => 'Backend & Systems'],

            // Frontend & 3D WebGL
            ['name' => 'React 19 & Next.js', 'category' => 'Frontend & 3D WebGL'],
            ['name' => 'Three.js & WebGL', 'category' => 'Frontend & 3D WebGL'],
            ['name' => 'Inertia.js v3', 'category' => 'Frontend & 3D WebGL'],
            ['name' => 'Tailwind CSS v4', 'category' => 'Frontend & 3D WebGL'],
            ['name' => 'Framer Motion', 'category' => 'Frontend & 3D WebGL'],

            // AI/ML & Data Systems
            ['name' => 'PyTorch & vLLM', 'category' => 'AI/ML & Data Systems'],
            ['name' => 'OpenCV & YOLO', 'category' => 'AI/ML & Data Systems'],
            ['name' => 'Apache Kafka', 'category' => 'AI/ML & Data Systems'],
            ['name' => 'PostgreSQL & MySQL', 'category' => 'AI/ML & Data Systems'],
            ['name' => 'Redis & Vector DBs', 'category' => 'AI/ML & Data Systems'],

            // Cloud & DevOps
            ['name' => 'Docker & Kubernetes', 'category' => 'Cloud & DevOps'],
            ['name' => 'AWS (ECS, Lambda, S3, RDS)', 'category' => 'Cloud & DevOps'],
            ['name' => 'Terraform & IaC', 'category' => 'Cloud & DevOps'],
            ['name' => 'GitHub Actions & CI/CD', 'category' => 'Cloud & DevOps'],
            ['name' => 'Prometheus & Grafana', 'category' => 'Cloud & DevOps'],
            ['name' => 'Linux Administration', 'category' => 'Cloud & DevOps'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
