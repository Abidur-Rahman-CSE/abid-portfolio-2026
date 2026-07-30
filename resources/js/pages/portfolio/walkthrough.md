# Walkthrough: Abidur Rahman - Senior Software & AI Engineer Portfolio

We have fully updated and personalized the portfolio application specifically for **Abidur Rahman**, Senior Software & AI Engineer. The site integrates interactive Three.js 3D WebGL scenes, real-world software engineering projects, authentic contact info, and an Inertia SPA multi-page structure.

---

## Portfolio Features & Updates

### 1. **Personal Branding & Hero Showcase (`home.tsx`)**
- **Personalized Intro**: "Hi, I'm Abidur Rahman &bull; Senior Software & AI Engineer".
- **Interactive Three.js WebGL Core**: Real-time 3D polyhedron canvas (`ThreeCanvas.tsx`) with cursor parallax tracking, floating particle field, and wireframe toggles.
- **Direct GitHub & Contact Buttons**: Link directly to `https://github.com/Abidur-Rahman-CSE`.
- **System Metrics**: `99.99% Uptime SLA`, `50k+ Events/sec`, `5+ Yrs Experience`, `15+ Shipped Systems`.
- **CLI IDE Terminal**: Interactive status, performance metrics, and technology stack tabs.

### 2. **Authentic Project Case Studies (`database/seeders/DatabaseSeeder.php` & `projects.tsx`)**
- **Genesis AI - Subject Choice & Allocation Engine**: High-concurrency automated university subject allocation engine in Laravel, PHP 8.4, React, MySQL, and Inertia.js.
- **HyperScale LLM Inference Pipeline**: Distributed GPU cluster orchestration in PyTorch, vLLM, Rust, Kubernetes, and gRPC.
- **EventPulse Telemetry Microservices**: High-throughput event processing platform handling 50k+ msgs/sec in Golang, Kafka, and Redis.
- **AbidPortfolio 3D**: Full-stack showcase in Laravel 13, Inertia v3, React 19, Tailwind v4, and Three.js 3D WebGL.
- **EdgeVision Analytics**: Edge computer vision engine in C++, TensorRT, CUDA, and OpenCV.
- **CloudForge IaC Automation**: Automated infrastructure provisioning platform in Terraform, AWS, Python, and PostgreSQL.

### 3. **Engineering Philosophy & Principles (`about.tsx`)**
- In-depth bio covering software engineering principles, SOLID design patterns, Domain-Driven Design (DDD), and test-driven reliability.
- Production engineering code playground (*LLM Inference Router*, *Go Kafka Consumer*, *Inertia Optimistic UI*).

### 4. **Career Experience Trajectory (`experience.tsx`)**
- Timeline detailing experience as Senior Software & AI Engineer, Full Stack Systems Engineer, and Software Developer.

### 5. **Categorized Software Arsenal (`skills.tsx`)**
- Grouped skill cards for **Languages & Core**, **Backend & Systems**, **Frontend & 3D WebGL**, **AI/ML & Data Systems**, and **Cloud & DevOps**.

### 6. **Direct Communication & Contact System (`contact.tsx`)**
- Working contact form with direct mail copy button for `abidur.rahman.dev@gmail.com` and instant flash feedback.

---

## Verification Results

- **Database Refresh**: Fresh database seeded with Abidur Rahman's software engineering projects and technical skills (`php artisan migrate:fresh --seed`).
- **Asset Build**: Vite compiled clean WebGL and TypeScript bundles (`npm run build`).
- **HTTP Endpoints**: Verified `HTTP 200 OK` across all portfolio routes:
  - `GET /` -> `200 OK`
  - `GET /about` -> `200 OK`
  - `GET /experience` -> `200 OK`
  - `GET /projects` -> `200 OK`
  - `GET /skills` -> `200 OK`
  - `GET /contact` -> `200 OK`
