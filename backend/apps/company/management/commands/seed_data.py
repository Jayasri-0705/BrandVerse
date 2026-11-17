from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.company.models import CompanyInfo, TeamMember, Testimonial, SiteSettings
from apps.services.models import Service
from apps.projects.models import Project
from apps.careers.models import JobOpening, JobApplication
from apps.enquiries.models import ContactEnquiry

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds initial professional data for BrandVerse'

    def handle(self, *args, **options):
        self.stdout.write("Seeding BrandVerse database...")

        # 1. Admin User
        admin_user, created = User.objects.get_or_create(username='admin', defaults={
            'email': 'admin@brandverse.tech',
            'first_name': 'BrandVerse',
            'last_name': 'Admin',
            'role': 'admin',
            'is_staff': True,
            'is_superuser': True,
        })
        if created:
            admin_user.set_password('AdminPassword123!')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Admin user created (admin / AdminPassword123!)"))
        else:
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.set_password('AdminPassword123!')
            admin_user.save()
            self.stdout.write("Admin user updated.")

        # 2. Company Info
        CompanyInfo.objects.all().delete()
        company = CompanyInfo.objects.create(
            name="BRANDVERSE",
            tagline="Innovating Ideas. Building Digital Futures.",
            description=(
                "BrandVerse is a technology-driven software development company focused on creating innovative digital solutions for businesses, startups, and enterprises. "
                "We specialize in web development, mobile application development, AI and machine learning, UI/UX design, cloud solutions, and custom software development."
            ),
            mission="To transform business ideas into powerful, high-performance digital products through creativity, innovation, and state-of-the-art engineering.",
            vision="To be the global benchmark in digital transformation, engineering resilient solutions that empower enterprises to excel in the digital era.",
            core_values=[
                {
                    "title": "Innovation-Driven",
                    "description": "We explore beyond conventional boundaries to craft forward-thinking digital architectures.",
                    "icon": "Zap"
                },
                {
                    "title": "Engineering Excellence",
                    "description": "We enforce uncompromising standards of code quality, security, and performance.",
                    "icon": "ShieldCheck"
                },
                {
                    "title": "Client Partnership",
                    "description": "We operate as an extension of our clients' core teams, committed directly to their growth metrics.",
                    "icon": "Users"
                },
                {
                    "title": "Agile Delivery",
                    "description": "Transparent milestones, iterative sprints, and rapid delivery cycles tailored to market demands.",
                    "icon": "Repeat"
                }
            ],
            journey=[
                {"year": "2018", "title": "Foundation", "description": "Founded with a vision to build modern cloud-native web architectures for emerging tech startups."},
                {"year": "2020", "title": "Global Expansion", "description": "Expanded client footprint across North America and Europe, delivering 50+ enterprise apps."},
                {"year": "2022", "title": "AI & Cloud Practice", "description": "Inaugurated dedicated AI/ML engineering lab and premier AWS/GCP cloud consulting practice."},
                {"year": "2024", "title": "Enterprise Tier", "description": "Recognized as a leading digital transformation partner with 250+ enterprise rollouts completed."},
                {"year": "2026", "title": "BrandVerse 2.0", "description": "Scaling next-generation intelligent platforms, autonomous agent systems, and microservices."}
            ],
            stats={
                "completed_projects": "250+",
                "happy_clients": "140+",
                "team_experts": "50+",
                "years_experience": "8+",
                "client_retention_rate": "98%",
                "global_reach_countries": "18+"
            },
            email="contact@brandverse.tech",
            phone="+1 (555) 349-2810",
            address="742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025",
            working_hours="Mon - Fri: 9:00 AM - 6:00 PM PST"
        )
        self.stdout.write(self.style.SUCCESS("Company Info seeded."))

        # 3. Site Settings
        SiteSettings.objects.all().delete()
        SiteSettings.objects.create(
            site_title="BrandVerse - IT & Software Development Company",
            contact_email="contact@brandverse.tech",
            contact_phone="+1 (555) 349-2810",
            office_address="742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025",
            google_maps_url="https://maps.google.com/?q=San+Francisco+CA",
            facebook_url="https://facebook.com/brandverse",
            twitter_url="https://twitter.com/brandverse",
            linkedin_url="https://linkedin.com/company/brandverse",
            instagram_url="https://instagram.com/brandverse",
            github_url="https://github.com/brandverse",
            meta_title="BrandVerse | Innovating Ideas. Building Digital Futures.",
            meta_description="BrandVerse is a premier technology & software development company specializing in Web, Mobile, AI, Cloud, and Custom Software Solutions.",
            maintenance_mode=False
        )

        # 4. 8 Services
        Service.objects.all().delete()
        services_data = [
            {
                "title": "Web Development",
                "slug": "web-development",
                "icon": "Globe",
                "image": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Custom, responsive web applications engineered for speed, scalability, and seamless user experiences across all devices.",
                "full_description": "Our web development practice builds modern web platforms from progressive single-page applications to high-throughput enterprise portals. Utilizing React, Next.js, Django, Node.js, and cloud-native microservices, we craft solutions that load instantaneously, rank high on search engines, and convert visitors into loyal customers.",
                "benefits": [
                    "High-speed load performance with Lighthouse scores exceeding 95+",
                    "Responsive layouts tailored for desktop, tablet, and mobile browsers",
                    "SEO-optimized semantic architectures that enhance search visibility",
                    "Strict security controls including CSP, CSRF protection, and OWASP compliance",
                    "Scalable cloud deployment ready to handle traffic spikes effortlessly"
                ],
                "technologies": ["React.js", "Vite", "Django REST Framework", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis"],
                "process_steps": [
                    {"step": 1, "title": "Requirement Discovery", "description": "Analyzing business objectives, target audience demographics, and functional specifications."},
                    {"step": 2, "title": "Architecture & Prototyping", "description": "Designing technical architectures, database schemas, and interactive component wireframes."},
                    {"step": 3, "title": "Sprint-Based Development", "description": "Executing clean, modular frontend and backend code with continuous code review."},
                    {"step": 4, "title": "Rigorous QA & Testing", "description": "Automated unit tests, cross-browser compatibility checks, and load stress testing."},
                    {"step": 5, "title": "Deployment & CI/CD", "description": "Seamless production rollouts with automated Docker container pipelines and monitoring."}
                ],
                "order": 1,
                "is_featured": True
            },
            {
                "title": "Mobile App Development",
                "slug": "mobile-app-development",
                "icon": "Smartphone",
                "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Native and cross-platform iOS and Android applications with intuitive UX, real-time sync, and fluid performance.",
                "full_description": "We build mobile experiences that users love. From consumer apps with millions of interactions to enterprise mobility suites, our mobile team delivers native-speed performance using React Native, Flutter, Swift, and Kotlin. We handle the complete lifecycle from App Store / Play Store submission to post-launch optimization.",
                "benefits": [
                    "Single codebase efficiency with React Native & Flutter for lower TCO",
                    "Native hardware acceleration: camera, biometrics, GPS, and Bluetooth BLE",
                    "Offline-first synchronization with SQLite and optimistic UI updates",
                    "Smooth 60fps animations with intuitive gesture controls",
                    "Comprehensive App Store and Google Play Store compliance guaranteed"
                ],
                "technologies": ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL", "WebSockets"],
                "process_steps": [
                    {"step": 1, "title": "User Journey Mapping", "description": "Defining touchpoints, navigation flows, and mobile ergonomical design patterns."},
                    {"step": 2, "title": "Interactive Figma Prototypes", "description": "Clickable high-fidelity mockups tested with real target user cohorts."},
                    {"step": 3, "title": "Cross-Platform Build", "description": "Robust architecture with shared business logic and native bridges."},
                    {"step": 4, "title": "Device Cloud Testing", "description": "Testing against 50+ real physical phone and tablet hardware configurations."},
                    {"step": 5, "title": "Store Submission", "description": "Handling store guidelines, screenshots, metadata, and production release."}
                ],
                "order": 2,
                "is_featured": True
            },
            {
                "title": "AI & Machine Learning Solutions",
                "slug": "ai-machine-learning-solutions",
                "icon": "Cpu",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Intelligent automation, predictive analytics, NLP, and custom generative AI models tailored to your enterprise workflow.",
                "full_description": "Unlock data-driven intelligence with BrandVerse AI solutions. We develop custom LLM integrations, retrieval-augmented generation (RAG) engines, computer vision systems, and automated predictive models that optimize operational costs and generate actionable revenue insights.",
                "benefits": [
                    "Enterprise RAG pipelines connecting proprietary knowledge to LLMs securely",
                    "Automated predictive forecasting for customer retention and supply chains",
                    "Natural Language Processing for document summarization and customer support",
                    "Privacy-preserving AI deployments ensuring zero data leaks",
                    "Cost-optimized inference architectures running on modern GPU clusters"
                ],
                "technologies": ["Python", "PyTorch", "OpenAI / Gemini APIs", "LangChain", "Vector Databases (pgvector, Pinecone)", "FastAPI", "HuggingFace"],
                "process_steps": [
                    {"step": 1, "title": "Data Audit & Feasibility", "description": "Auditing data quality, security posture, and identifying high-impact AI use cases."},
                    {"step": 2, "title": "Model Selection & Architecture", "description": "Evaluating proprietary vs fine-tuned open-source models for cost and accuracy."},
                    {"step": 3, "title": "Pipeline Engineering", "description": "Building data ingestion pipelines, vector embeddings, and evaluation benchmarks."},
                    {"step": 4, "title": "Integration & Tuning", "description": "Connecting AI models to existing CRM, ERP, and product microservices."},
                    {"step": 5, "title": "Monitoring & Guardrails", "description": "Implementing latency tracking, hallucination safeguards, and drift detection."}
                ],
                "order": 3,
                "is_featured": True
            },
            {
                "title": "UI/UX Design",
                "slug": "ui-ux-design",
                "icon": "Palette",
                "image": "https://images.unsplash.com/photo-1581291518655-9523c93269c8?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Human-centered digital interfaces, cohesive design systems, and delightful visual design that elevate brand trust.",
                "full_description": "Exceptional digital products start with thoughtful design. Our UI/UX design studio combines deep user research, information architecture, visual design, and interactive prototyping to produce interfaces that are effortless to navigate and visually memorable.",
                "benefits": [
                    "Data-backed UX wireframes based on empirical user research and heatmaps",
                    "Scalable design tokens and component libraries built for design system parity",
                    "WCAG 2.1 AA accessibility compliance across contrast, typography, and keyboard nav",
                    "High-fidelity clickable prototypes that eliminate implementation guesswork",
                    "Elevated corporate aesthetics that establish immediate credibility"
                ],
                "technologies": ["Figma", "Design Tokens", "Tailwind CSS", "Storybook", "Framer", "Adobe CC", "Miro"],
                "process_steps": [
                    {"step": 1, "title": "User Research", "description": "Conducting stakeholder interviews, user persona creation, and competitor audits."},
                    {"step": 2, "title": "Information Architecture", "description": "Sitemaps, user flows, and wireframes validating structural navigation."},
                    {"step": 3, "title": "Visual Design System", "description": "Color palettes, typography hierarchies, icon sets, and micro-interactions."},
                    {"step": 4, "title": "Interactive Prototyping", "description": "Developing clickable prototypes for usability validation and user signoff."},
                    {"step": 5, "title": "Engineering Handoff", "description": "Detailed token specifications and developer documentation for pixel-perfect build."}
                ],
                "order": 4,
                "is_featured": True
            },
            {
                "title": "Cloud Computing Solutions",
                "slug": "cloud-computing-solutions",
                "icon": "Cloud",
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Cloud migration, DevOps automation, Kubernetes container orchestration, and serverless architectures.",
                "full_description": "Modernize your infrastructure with BrandVerse Cloud Solutions. We design, deploy, and manage secure multi-cloud environments on AWS, Azure, and Google Cloud, implementing automated CI/CD pipelines, Infrastructure as Code, and 24/7 reliability monitoring.",
                "benefits": [
                    "99.99% uptime architectures with multi-availability zone failover",
                    "DevOps automation via Terraform, Docker, and GitHub Actions",
                    "Cloud cost optimization reducing monthly compute bills by up to 35%",
                    "SOC 2, ISO 27001, and HIPAA-compliant cloud architectures",
                    "Zero-downtime blue/green and canary deployment strategies"
                ],
                "technologies": ["AWS", "Google Cloud Platform", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus & Grafana"],
                "process_steps": [
                    {"step": 1, "title": "Cloud Assessment", "description": "Evaluating existing infrastructure, dependencies, bandwidth, and cost benchmarks."},
                    {"step": 2, "title": "Target Architecture Design", "description": "Designing secure VPCs, IAM boundaries, container clusters, and storage tiers."},
                    {"step": 3, "title": "Infrastructure as Code", "description": "Scripting entire environments with Terraform and automated configuration management."},
                    {"step": 4, "title": "Migration & Validation", "description": "Executing phased data and traffic migration with continuous rollback capabilities."},
                    {"step": 5, "title": "24/7 Monitoring", "description": "Setting up real-time telemetry, automated healing, and alert escalations."}
                ],
                "order": 5,
                "is_featured": False
            },
            {
                "title": "Custom Software Development",
                "slug": "custom-software-development",
                "icon": "Code",
                "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Tailor-made software architectures designed to solve unique organizational challenges and scale enterprise operations.",
                "full_description": "Off-the-shelf software often forces businesses into rigid constraints. BrandVerse engineers bespoke enterprise software solutions including internal ERPs, custom SaaS platforms, legacy modernization, and complex API integrations that fit your exact business workflows.",
                "benefits": [
                    "100% intellectual property ownership tailored to your unique workflows",
                    "Modular domain-driven architecture that adapts as your business evolves",
                    "Seamless interoperability with legacy databases and third-party APIs",
                    "High security posture designed to protect mission-critical business data",
                    "Elimination of recurring per-seat licensing fees of commercial SaaS"
                ],
                "technologies": ["Django", "Python", "React", "PostgreSQL", "Kafka", "Docker", "REST & GraphQL"],
                "process_steps": [
                    {"step": 1, "title": "Business Process Modeling", "description": "Documenting exact operational workflows, constraints, and business logic rules."},
                    {"step": 2, "title": "Domain-Driven Design", "description": "Creating domain entities, event streams, and decoupled service boundaries."},
                    {"step": 3, "title": "Iterative Development", "description": "Bi-weekly sprint releases giving stakeholders direct hands-on testing."},
                    {"step": 4, "title": "Integration & Migration", "description": "Writing ETL data migration scripts from legacy systems with zero data loss."},
                    {"step": 5, "title": "Staff Training & Support", "description": "Comprehensive documentation, user training sessions, and SLA-backed maintenance."}
                ],
                "order": 6,
                "is_featured": False
            },
            {
                "title": "E-commerce Development",
                "slug": "ecommerce-development",
                "icon": "ShoppingCart",
                "image": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
                "short_description": "High-converting online shopping platforms, headless storefronts, multi-vendor marketplaces, and payment integrations.",
                "full_description": "Grow your online revenue with performant e-commerce platforms. From headless Shopify and WooCommerce implementations to custom marketplace solutions with multi-currency checkout, Stripe integrations, inventory syncing, and automated fulfillment workflows.",
                "benefits": [
                    "Sub-second page speeds increasing conversion rates by up to 25%",
                    "Frictionless checkout experiences with Apple Pay, Google Pay, and Stripe",
                    "Real-time inventory synchronization across warehouses and sales channels",
                    "Personalized product recommendation algorithms powered by customer behavior",
                    "Robust fraud prevention and PCI-DSS compliance assurance"
                ],
                "technologies": ["React.js", "Next.js", "Shopify Storefront API", "Stripe API", "PostgreSQL", "Tailwind CSS", "Redis"],
                "process_steps": [
                    {"step": 1, "title": "Catalog & Flow Strategy", "description": "Mapping product hierarchies, inventory logic, discounting rules, and checkout paths."},
                    {"step": 2, "title": "Custom Storefront Design", "description": "Designing brand-aligned shopping journeys with high conversion emphasis."},
                    {"step": 3, "title": "Payment & Logistics Setup", "description": "Configuring payment gateways, multi-currency engines, and shipping APIs."},
                    {"step": 4, "title": "Performance Optimization", "description": "Edge caching, responsive media compression, and checkout speed audits."},
                    {"step": 5, "title": "Launch & A/B Analytics", "description": "Conversion tracking setup, GA4 e-commerce events, and continuous optimization."}
                ],
                "order": 7,
                "is_featured": False
            },
            {
                "title": "Software Testing and QA",
                "slug": "software-testing-and-qa",
                "icon": "CheckCircle",
                "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Comprehensive automated testing, security vulnerability assessments, and performance profiling to ensure zero-defect software.",
                "full_description": "Quality is never an accident. BrandVerse provides end-to-end quality assurance services, from automated regression testing suites with Playwright and Cypress to penetration testing, load testing, and continuous integration validation.",
                "benefits": [
                    "Over 85% test automation coverage reducing release turnaround times",
                    "Comprehensive security penetration testing against OWASP Top 10 vulnerabilities",
                    "Performance load testing simulating tens of thousands of concurrent users",
                    "Cross-browser and cross-device testing ensuring consistent visual fidelity",
                    "Detailed bug tracking reports with reproduction steps and resolution metrics"
                ],
                "technologies": ["Cypress", "Playwright", "Jest", "PyTest", "JMeter", "Postman", "SonarQube"],
                "process_steps": [
                    {"step": 1, "title": "Test Strategy & Matrix", "description": "Defining test coverage parameters, device matrices, and acceptance criteria."},
                    {"step": 2, "title": "Automation Framework", "description": "Architecting resilient CI/CD test suites running on every pull request."},
                    {"step": 3, "title": "Execution & Stress Testing", "description": "Running functional, regression, API, and peak load stress scenarios."},
                    {"step": 4, "title": "Vulnerability Assessment", "description": "Security auditing covering authentication, injection, and authorization leaks."},
                    {"step": 5, "title": "Sign-Off & QA Reporting", "description": "Delivering comprehensive quality assurance certifications before production release."}
                ],
                "order": 8,
                "is_featured": False
            }
        ]

        for s_data in services_data:
            Service.objects.create(**s_data)
        self.stdout.write(self.style.SUCCESS("8 Professional Services seeded."))

        # 5. Projects Portfolio across all 5 categories
        Project.objects.all().delete()
        projects_data = [
            {
                "title": "ApexCloud - Enterprise DevOps & Cloud Infrastructure Portal",
                "slug": "apexcloud-devops-portal",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
                "short_description": "A mission-critical cloud management portal providing multi-cloud telemetry, cost analytics, and Kubernetes cluster provisioning.",
                "full_description": "BrandVerse engineered ApexCloud from scratch to help modern DevOps teams manage cloud spend and container fleets across AWS and Google Cloud. The portal handles billions of telemetry events daily, visualizing cluster health with interactive real-time dashboards and reducing idle resource costs by 32%.",
                "client_name": "ApexCloud Systems Inc.",
                "completion_date": "January 2026",
                "technologies": ["React.js", "Django REST Framework", "PostgreSQL", "Docker", "Tailwind CSS", "Chart.js"],
                "live_link": "https://brandverse.tech/portfolio/apexcloud",
                "github_link": "https://github.com/brandverse/apexcloud-demo",
                "is_featured": True,
                "order": 1
            },
            {
                "title": "PulseHealth - Telemedicine & Patient Monitoring App",
                "slug": "pulsehealth-telemedicine-app",
                "category": "Mobile Applications",
                "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
                "short_description": "HIPAA-compliant cross-platform mobile application connecting patients with specialists via encrypted HD video and wearable telemetry.",
                "full_description": "PulseHealth bridges the gap between remote patients and medical practitioners. With built-in WebRTC video consultations, Apple HealthKit integration for real-time vitals monitoring, and biometric prescription authorizations, PulseHealth achieved over 150,000 active patient downloads within six months of launch.",
                "client_name": "Global Health Partners",
                "completion_date": "November 2025",
                "technologies": ["React Native", "WebRTC", "Django", "PostgreSQL", "AWS S3", "Redis"],
                "live_link": "https://brandverse.tech/portfolio/pulsehealth",
                "github_link": "https://github.com/brandverse/pulsehealth-demo",
                "is_featured": True,
                "order": 2
            },
            {
                "title": "CogniFlow - Autonomous Enterprise Document AI & RAG",
                "slug": "cogniflow-enterprise-ai",
                "category": "AI Solutions",
                "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
                "short_description": "An enterprise intelligence engine that reads, indexes, and answers complex queries across millions of corporate contracts and PDFs in milliseconds.",
                "full_description": "CogniFlow transformed legal and compliance workflows for Fortune 500 financial clients. By building a high-speed vector retrieval pipeline with pgvector and semantic re-ranking models, CogniFlow slashed contract auditing times from 14 days to under 15 minutes with 99.4% factual precision.",
                "client_name": "Vanguard Financial Group",
                "completion_date": "February 2026",
                "technologies": ["Python", "FastAPI", "pgvector", "LangChain", "React.js", "Docker"],
                "live_link": "https://brandverse.tech/portfolio/cogniflow",
                "github_link": "https://github.com/brandverse/cogniflow-demo",
                "is_featured": True,
                "order": 3
            },
            {
                "title": "AuraLuxury - High-Performance Headless E-commerce",
                "slug": "auraluxury-headless-store",
                "category": "E-commerce",
                "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Ultra-fast headless luxury fashion storefront with dynamic 3D apparel previews, multi-currency checkout, and sub-second page loads.",
                "full_description": "AuraLuxury needed an online shopping experience matching the prestige of their physical boutiques. We engineered a headless e-commerce experience using React, Tailwind CSS, and Stripe Elements. The platform achieved a 41% boost in mobile checkout completions and handled Black Friday traffic peaks without a glitch.",
                "client_name": "Aura Fashion House Europe",
                "completion_date": "December 2025",
                "technologies": ["React.js", "Tailwind CSS", "Stripe API", "Node.js", "PostgreSQL", "Redis"],
                "live_link": "https://brandverse.tech/portfolio/auraluxury",
                "github_link": "https://github.com/brandverse/auraluxury-demo",
                "is_featured": True,
                "order": 4
            },
            {
                "title": "Finova - Wealth Management & Trading Design System",
                "slug": "finova-wealth-design-system",
                "category": "UI/UX Design",
                "image": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
                "short_description": "A unified corporate design system and high-fidelity interface design for institutional financial dashboards and algorithmic trading.",
                "full_description": "BrandVerse UI/UX specialists overhauled Finova's complex trading suite, reducing cognitive overload for financial analysts. We created 120+ accessible design tokens, dark/light mode themes, and ultra-dense data grids that allow traders to monitor market volatility with zero friction.",
                "client_name": "Finova Capital Markets",
                "completion_date": "October 2025",
                "technologies": ["Figma", "Tailwind CSS", "Storybook", "React Components", "Design Tokens"],
                "live_link": "https://brandverse.tech/portfolio/finova",
                "github_link": "https://github.com/brandverse/finova-design",
                "is_featured": False,
                "order": 5
            },
            {
                "title": "UrbanFleet - Smart Logistics & Route Optimization Platform",
                "slug": "urbanfleet-smart-logistics",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                "short_description": "Real-time fleet tracking, automated dispatching algorithms, and delivery route optimization platform handling 10,000+ commercial vehicles.",
                "full_description": "UrbanFleet leverages geospatial algorithms and live IoT GPS feeds to compute optimal delivery routes in real time. We built a reactive Django & React architecture with WebSockets that cut vehicle fuel consumption by 18% across three nationwide courier fleets.",
                "client_name": "Urban Logistics Corp",
                "completion_date": "September 2025",
                "technologies": ["React.js", "Django", "PostgreSQL", "PostGIS", "WebSockets", "Mapbox GL"],
                "live_link": "https://brandverse.tech/portfolio/urbanfleet",
                "github_link": "",
                "is_featured": False,
                "order": 6
            }
        ]

        for p_data in projects_data:
            Project.objects.create(**p_data)
        self.stdout.write(self.style.SUCCESS("6 Portfolio Projects seeded."))

        # 6. Team Members
        TeamMember.objects.all().delete()
        team_data = [
            {
                "name": "Alexander Hayes",
                "role": "Chief Executive Officer & Co-Founder",
                "department": "Executive Leadership",
                "bio": "15+ years leading software engineering and enterprise digital strategy. Former tech director at Silicon Valley startups.",
                "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                "linkedin_url": "https://linkedin.com",
                "github_url": "https://github.com",
                "email": "alexander@brandverse.tech",
                "order": 1
            },
            {
                "name": "Dr. Elena Rostova",
                "role": "Chief Technology Officer & Head of AI",
                "department": "AI & Engineering",
                "bio": "Ph.D. in Computer Science with focus on machine intelligence and distributed systems. Passionate about ethical AI architectures.",
                "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
                "linkedin_url": "https://linkedin.com",
                "github_url": "https://github.com",
                "email": "elena@brandverse.tech",
                "order": 2
            },
            {
                "name": "Marcus Vance",
                "role": "VP of Engineering",
                "department": "Engineering",
                "bio": "Full-stack architect specializing in high-throughput Django, React, and Kubernetes cloud infrastructure.",
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
                "linkedin_url": "https://linkedin.com",
                "github_url": "https://github.com",
                "email": "marcus@brandverse.tech",
                "order": 3
            },
            {
                "name": "Sophia Lin",
                "role": "Head of UI/UX & Design Systems",
                "department": "Product Design",
                "bio": "Award-winning design lead passionate about human-centered design, accessibility, and clean corporate aesthetics.",
                "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
                "linkedin_url": "https://linkedin.com",
                "github_url": "https://github.com",
                "email": "sophia@brandverse.tech",
                "order": 4
            }
        ]

        for tm in team_data:
            TeamMember.objects.create(**tm)
        self.stdout.write(self.style.SUCCESS("Team members seeded."))

        # 7. Testimonials
        Testimonial.objects.all().delete()
        testimonials_data = [
            {
                "client_name": "David Sterling",
                "client_title": "Chief Information Officer",
                "company_name": "Nexus Financial Technologies",
                "content": "BrandVerse transformed our legacy banking portal into an ultra-modern, lightning-fast platform. Their engineering depth in React and Django made complex compliance requirements straightforward. We couldn't be more pleased.",
                "rating": 5,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
                "is_featured": True
            },
            {
                "client_name": "Sarah Jenkins",
                "client_title": "Head of Product",
                "company_name": "Aura European Fashion",
                "content": "The UI/UX design and headless e-commerce engineering BrandVerse delivered exceeded every expectation. Our conversion rates increased by 40% within 30 days of release. Truly a world-class technology partner.",
                "rating": 5,
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
                "is_featured": True
            },
            {
                "client_name": "Michael Zhang",
                "client_title": "Founder & CEO",
                "company_name": "Cognitive Health Ventures",
                "content": "Building an AI-driven medical application requires utmost precision and data security. BrandVerse built our RAG pipeline and mobile app on schedule, with zero compromise on quality or HIPAA compliance.",
                "rating": 5,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
                "is_featured": True
            }
        ]

        for testm in testimonials_data:
            Testimonial.objects.create(**testm)
        self.stdout.write(self.style.SUCCESS("Testimonials seeded."))

        # 8. Job Openings
        JobOpening.objects.all().delete()
        jobs_data = [
            {
                "title": "Senior Full-Stack Engineer (React & Django)",
                "slug": "senior-full-stack-engineer-react-django",
                "department": "Engineering",
                "location": "Remote / Hybrid",
                "job_type": "Full-time",
                "experience_level": "Senior Level",
                "salary_range": "$130,000 - $165,000",
                "description": "We are seeking a seasoned Senior Full-Stack Engineer to architect, build, and scale enterprise web applications using modern React, TypeScript, Django REST Framework, and PostgreSQL.",
                "requirements": [
                    "5+ years professional experience building production web applications",
                    "Strong proficiency in React.js, modern JavaScript/TypeScript, and state management",
                    "Deep knowledge of Python, Django, DRF, and relational database design with PostgreSQL",
                    "Experience with Docker, CI/CD pipelines, and cloud environments (AWS/GCP)",
                    "Passionate about clean architecture, test automation, and code craftsmanship"
                ],
                "responsibilities": [
                    "Lead development of core features from architectural design to deployment",
                    "Mentor junior and mid-level software engineers through pairing and code reviews",
                    "Collaborate directly with product managers and UI/UX designers to translate requirements into robust technical specifications",
                    "Maintain 99.9% uptime by profiling application bottlenecks and optimizing database queries"
                ],
                "benefits": [
                    "Comprehensive health, dental, and vision insurance",
                    "Flexible remote-first work culture with home office stipend",
                    "Annual learning & development allowance ($2,500/year)",
                    "Generous paid time off, parental leave, and company retreats"
                ],
                "is_active": True
            },
            {
                "title": "AI & Machine Learning Solutions Engineer",
                "slug": "ai-machine-learning-solutions-engineer",
                "department": "AI & Data Science",
                "location": "Remote",
                "job_type": "Full-time",
                "experience_level": "Mid Level",
                "salary_range": "$125,000 - $155,000",
                "description": "Join our AI engineering team to design and deploy custom enterprise LLM workflows, retrieval-augmented generation (RAG) systems, and computer vision models.",
                "requirements": [
                    "3+ years experience in Python, PyTorch, and NLP / modern GenAI architectures",
                    "Experience deploying vector databases (pgvector, Pinecone, Qdrant) in production",
                    "Strong background in API development with FastAPI or Django",
                    "Understanding of prompt engineering, model evaluation, and hallucination reduction"
                ],
                "responsibilities": [
                    "Design and implement end-to-end RAG pipelines for enterprise clients",
                    "Fine-tune open-weights models (Llama, Mistral) for proprietary vertical applications",
                    "Monitor model latency, cost, and output consistency in production systems"
                ],
                "benefits": [
                    "Access to state-of-the-art GPU clusters and modern AI tooling",
                    "Flexible hours and remote setup",
                    "Health and wellness budget",
                    "Competitive equity compensation package"
                ],
                "is_active": True
            },
            {
                "title": "Lead UI/UX Designer & Design Systems Architect",
                "slug": "lead-ui-ux-designer-design-systems",
                "department": "Product Design",
                "location": "Hybrid (San Francisco / Remote)",
                "job_type": "Full-time",
                "experience_level": "Lead / Architect",
                "salary_range": "$120,000 - $150,000",
                "description": "We are looking for a Lead UI/UX Designer to establish design directions, create scalable Figma design systems, and build world-class digital user interfaces for our clients.",
                "requirements": [
                    "5+ years UI/UX design experience for SaaS, web apps, and enterprise software",
                    "Mastery of Figma, component variants, auto-layout, and design tokens",
                    "Proven track record creating cohesive corporate design systems",
                    "Strong understanding of modern frontend constraints (HTML/CSS/Tailwind)"
                ],
                "responsibilities": [
                    "Shape the visual language and user experience across diverse client projects",
                    "Conduct discovery workshops, user interviews, and usability tests",
                    "Work hand-in-hand with frontend developers to ensure pixel-perfect delivery"
                ],
                "benefits": [
                    "Top-of-the-line MacBook Pro & 4K monitor hardware allowance",
                    "Complete healthcare coverage",
                    "Flexible hybrid schedule",
                    "Annual design conference sponsorships"
                ],
                "is_active": True
            },
            {
                "title": "Cloud & DevOps Infrastructure Engineer",
                "slug": "cloud-devops-infrastructure-engineer",
                "department": "Cloud & Infrastructure",
                "location": "Remote",
                "job_type": "Full-time",
                "experience_level": "Senior Level",
                "salary_range": "$135,000 - $165,000",
                "description": "Lead the modernization of client infrastructure through Infrastructure as Code, Kubernetes orchestration, and automated CI/CD pipelines.",
                "requirements": [
                    "4+ years with AWS or GCP cloud administration and Terraform IaC",
                    "Solid hands-on experience running Kubernetes clusters in production",
                    "Proficiency with Linux shell, Docker, and GitHub Actions",
                    "Knowledge of monitoring tools like Prometheus, Grafana, and Datadog"
                ],
                "responsibilities": [
                    "Design resilient multi-region cloud infrastructures",
                    "Automate testing and deployment pipelines for zero-downtime releases",
                    "Audit cloud spend and configure auto-scaling policies"
                ],
                "benefits": [
                    "Generous remote office equipment budget",
                    "Full medical coverage and 401(k) matching",
                    "Unlimited PTO policy",
                    "Continuous certification sponsorship (AWS/GCP/CKA)"
                ],
                "is_active": True
            }
        ]

        for j_data in jobs_data:
            JobOpening.objects.create(**j_data)
        self.stdout.write(self.style.SUCCESS("4 Job Openings seeded."))

        # 9. Sample Contact Enquiries & Job Applications
        ContactEnquiry.objects.all().delete()
        enquiries_data = [
            {
                "name": "Jonathan Reed",
                "email": "jonathan.reed@acmecorp.com",
                "phone": "+1 (555) 782-9012",
                "company_name": "Acme Global Solutions",
                "service_interested_in": "Web Development",
                "message": "We are seeking a technology partner to overhaul our customer portal and migrate our backend to Django and PostgreSQL. Would love to schedule an introductory discovery call this week.",
                "status": "new"
            },
            {
                "name": "Claire Dupont",
                "email": "c.dupont@aerotech.io",
                "phone": "+1 (555) 431-8899",
                "company_name": "AeroTech Innovations",
                "service_interested_in": "AI & Machine Learning Solutions",
                "message": "We have approximately 500,000 technical manuals and want to implement an intelligent RAG knowledge base for our field engineers. Please send your capability deck and budget estimates.",
                "status": "in_progress"
            },
            {
                "name": "Brian Miller",
                "email": "bmiller@apexretail.com",
                "phone": "+1 (555) 902-1243",
                "company_name": "Apex Retail Group",
                "service_interested_in": "E-commerce Development",
                "message": "Looking to build a headless multi-currency online store with seamless Stripe integration. Target launch is Q3 2026.",
                "status": "resolved"
            }
        ]
        for enq in enquiries_data:
            ContactEnquiry.objects.create(**enq)
        self.stdout.write(self.style.SUCCESS("Sample enquiries seeded."))

        JobApplication.objects.all().delete()
        first_job = JobOpening.objects.first()
        JobApplication.objects.create(
            job=first_job,
            job_position=first_job.title if first_job else "Senior Full-Stack Engineer",
            full_name="Liam Foster",
            email="liam.foster@example.com",
            phone="+1 (555) 234-5678",
            cover_letter="I have over 6 years of experience building modern React and Django REST APIs for high-growth SaaS applications. I admire BrandVerse's dedication to engineering craft and would be thrilled to join the team.",
            status="reviewing",
            admin_notes="Solid GitHub portfolio with modern React and Django projects. Scheduled for initial technical screen."
        )
        JobApplication.objects.create(
            job=first_job,
            job_position=first_job.title if first_job else "Senior Full-Stack Engineer",
            full_name="Samantha Wei",
            email="samantha.wei@example.com",
            phone="+1 (555) 987-6543",
            cover_letter="With 5 years in TypeScript and Python full-stack engineering, I've architected microservices and interactive web dashboards. Excited to contribute to BrandVerse's enterprise client projects.",
            status="applied"
        )
        self.stdout.write(self.style.SUCCESS("Sample job applications seeded."))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
