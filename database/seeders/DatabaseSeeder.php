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
            'email' => 'abid@example.com',
            'password' => bcrypt('password'),
        ]);

        $projects = [
            [
                'title' => 'HyperScale AI Inference Pipeline',
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
                'title' => 'EdgeVision - Autonomous Video Analytics',
                'description' => 'Edge-deployed computer vision engine running TensorRT-optimized YOLO models on NVIDIA Jetson devices for multi-camera object tracking in industrial environments.',
                'tags' => ['C++', 'TensorRT', 'CUDA', 'OpenCV', 'MQTT'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'CloudForge - Automated Infrastructure Engine',
                'description' => 'Infrastructure-as-Code automated provisioning and drift detection platform connecting Terraform state with gitops CI/CD pipelines.',
                'tags' => ['Terraform', 'AWS', 'Python', 'GitHub Actions', 'PostgreSQL'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'NexusStudio - Full Stack Enterprise ERP',
                'description' => 'Modern reactive enterprise dashboard with real-time WebSocket state synchronization, role-based access control, and automated PDF reporting.',
                'tags' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
            ],
            [
                'title' => 'QuantPredict - Algorithmic Market Intelligence',
                'description' => 'Backtesting engine for quantitative trading algorithms analyzing multi-year order book data using pandas, polars, and custom C++ extensions.',
                'tags' => ['Python', 'C++', 'Polars', 'TimescaleDB', 'GraphQL'],
                'url' => 'https://github.com/Abidur-Rahman-CSE',
                'image' => 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800&h=400',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        $skills = [
            // Backend & Systems
            ['name' => 'Golang', 'category' => 'Backend & Systems'],
            ['name' => 'Python & FastAPI', 'category' => 'Backend & Systems'],
            ['name' => 'Laravel & PHP 8.4', 'category' => 'Backend & Systems'],
            ['name' => 'Rust (Async Tokio)', 'category' => 'Backend & Systems'],
            ['name' => 'C++ / CUDA', 'category' => 'Backend & Systems'],
            ['name' => 'Node.js & Express', 'category' => 'Backend & Systems'],

            // Frontend & User Interface
            ['name' => 'TypeScript', 'category' => 'Frontend & UX'],
            ['name' => 'React 19 & Next.js', 'category' => 'Frontend & UX'],
            ['name' => 'Inertia.js', 'category' => 'Frontend & UX'],
            ['name' => 'Tailwind CSS v4', 'category' => 'Frontend & UX'],
            ['name' => 'Framer Motion', 'category' => 'Frontend & UX'],
            ['name' => 'State Management (Zustand/Redux)', 'category' => 'Frontend & UX'],

            // AI/ML & Data Engineering
            ['name' => 'PyTorch & vLLM', 'category' => 'AI/ML & Data'],
            ['name' => 'LangChain & LlamaIndex', 'category' => 'AI/ML & Data'],
            ['name' => 'HuggingFace & Transformers', 'category' => 'AI/ML & Data'],
            ['name' => 'OpenCV & YOLO', 'category' => 'AI/ML & Data'],
            ['name' => 'Apache Kafka', 'category' => 'AI/ML & Data'],
            ['name' => 'PostgreSQL / TimescaleDB', 'category' => 'AI/ML & Data'],
            ['name' => 'Redis & Vector DBs (Chroma/Pinecone)', 'category' => 'AI/ML & Data'],

            // Cloud & DevOps
            ['name' => 'Docker & Kubernetes', 'category' => 'Cloud & DevOps'],
            ['name' => 'AWS (ECS, Lambda, S3, RDS)', 'category' => 'Cloud & DevOps'],
            ['name' => 'Terraform (IaC)', 'category' => 'Cloud & DevOps'],
            ['name' => 'GitHub Actions & CI/CD', 'category' => 'Cloud & DevOps'],
            ['name' => 'Prometheus & Grafana', 'category' => 'Cloud & DevOps'],
            ['name' => 'Linux Kernel & System Administration', 'category' => 'Cloud & DevOps'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
