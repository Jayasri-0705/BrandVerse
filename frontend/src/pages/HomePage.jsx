import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Repeat,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight,
  Award,
  Globe2,
} from 'lucide-react';
import { servicesApi, projectsApi, companyApi } from '../services/api';
import ServiceCard from '../components/cards/ServiceCard';
import ProjectCard from '../components/cards/ProjectCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DynamicIcon from '../components/common/DynamicIcon';
import { useCompany } from '../context/CompanyContext';

const TECH_CATEGORIES = [
  {
    category: 'Frontend & Mobile',
    items: ['React.js', 'Vite', 'Next.js', 'React Native', 'Flutter', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend & APIs',
    items: ['Python', 'Django', 'Django REST Framework', 'Node.js', 'FastAPI', 'GraphQL'],
  },
  {
    category: 'AI & Data Science',
    items: ['PyTorch', 'LangChain', 'OpenAI / Gemini', 'pgvector', 'HuggingFace', 'Pandas'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    category: 'Databases & Storage',
    items: ['PostgreSQL', 'Redis', 'PostGIS', 'Pinecone', 'MongoDB', 'AWS S3'],
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your business objectives, target users, and technical requirements to formulate an architectural blueprint.',
    icon: 'Sparkles',
  },
  {
    number: '02',
    title: 'UI/UX & Prototyping',
    description: 'Creating high-fidelity Figma design systems and clickable prototypes to validate usability before writing a single line of code.',
    icon: 'Layers',
  },
  {
    number: '03',
    title: 'Agile Engineering',
    description: 'Bi-weekly sprint cycles with continuous integration, modular microservices, clean code, and transparent progress updates.',
    icon: 'Zap',
  },
  {
    number: '04',
    title: 'Rigorous QA & Security',
    description: 'Automated end-to-end testing, security penetration testing, and load simulation to ensure zero flaws in production.',
    icon: 'ShieldCheck',
  },
  {
    number: '05',
    title: 'Deployment & Scaling',
    description: 'Automated Docker/Kubernetes container deployments with zero downtime, telemetry monitoring, and 24/7 SLA maintenance.',
    icon: 'Globe2',
  },
];

const HomePage = () => {
  const { companyInfo } = useCompany();
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTechTab, setActiveTechTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, projRes, testRes] = await Promise.all([
          servicesApi.getServices({ featured: 'true' }),
          projectsApi.getProjects({ featured: 'true' }),
          companyApi.getTestimonials(),
        ]);
        setServices(servRes.data?.slice(0, 8) || []);
        setFeaturedProjects(projRes.data?.slice(0, 4) || []);
        setTestimonials(testRes.data?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load homepage content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-brandBg">
        {/* Glow Effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-secondary/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-[400px] h-[250px] bg-accent/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs sm:text-sm font-semibold mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Innovating Ideas. Building Digital Futures.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-primary tracking-tight leading-[1.15] mb-6">
              Transforming Ideas Into{' '}
              <span className="text-gradient">Powerful Digital Experiences.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              At BrandVerse, we combine creativity, technology, and innovation to build scalable
              digital solutions that help businesses grow, evolve, and succeed in the digital world.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-secondary hover:bg-secondary-700 shadow-lg shadow-secondary/25 hover:shadow-secondary/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-primary bg-white border border-slate-300 hover:border-primary hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
              </Link>
            </div>
          </div>

          {/* Hero Feature Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Architecture</p>
                <p className="text-sm font-bold text-primary">Enterprise Ready</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-secondary flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Security</p>
                <p className="text-sm font-bold text-primary">SOC2 & OWASP</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Performance</p>
                <p className="text-sm font-bold text-primary">Sub-Second Load</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Satisfaction</p>
                <p className="text-sm font-bold text-primary">98% Retention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Statistics */}
      <section className="py-14 bg-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-accent mb-2">
                {companyInfo?.stats?.completed_projects || '250+'}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Successful Projects
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-accent mb-2">
                {companyInfo?.stats?.happy_clients || '140+'}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Satisfied Clients
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-accent mb-2">
                {companyInfo?.stats?.team_experts || '50+'}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Engineers & Designers
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-accent mb-2">
                {companyInfo?.stats?.years_experience || '8+'}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About BrandVerse Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
                About BrandVerse
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-6 leading-tight">
                Engineering Next-Generation Software with Uncompromising Craft.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                BrandVerse is a technology-driven software development company focused on creating
                innovative digital solutions for businesses, startups, and enterprises. We specialize
                in web development, mobile application development, AI and machine learning, UI/UX design,
                cloud solutions, and custom software development.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Our mission is to transform business ideas into powerful digital products through
                creativity, innovation, and cutting-edge engineering. We operate as your dedicated
                technology co-architects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-heading font-bold text-primary mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    Our Mission
                  </h4>
                  <p className="text-xs text-slate-600">
                    Transforming business ideas into scalable, secure, and intuitive digital software.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-heading font-bold text-primary mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    Our Vision
                  </h4>
                  <p className="text-xs text-slate-600">
                    To be the global technology benchmark recognized for engineering resilient digital experiences.
                  </p>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                <span>Read our full company story & team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-brand-lg border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="BrandVerse Team Collaboration"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-brand-lg border border-slate-200 hidden sm:block max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-xl">
                    BV
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-primary text-sm">Full-Lifecycle IT</h5>
                    <p className="text-xs text-slate-500">From concept discovery to enterprise cloud scale.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Services Section */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Comprehensive Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Our Professional Services
            </h2>
            <p className="text-slate-600 text-base">
              End-to-end technology solutions tailored to modernize your operations, build new products,
              and accelerate enterprise digital transformation.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-800 transition-colors shadow"
            >
              <span>View All 8 Services with Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose BrandVerse? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              The BrandVerse Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Why Choose BrandVerse?
            </h2>
            <p className="text-slate-600 text-base">
              We eliminate typical outsourcing friction with transparent agile communication,
              senior-level engineering, and relentless focus on measurable business ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200/90 hover:border-secondary/40 shadow-sm hover:shadow-brand transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-primary mb-3">
                Speed & High Velocity
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We utilize modular microservice templates and rapid CI/CD deployment pipelines, cutting
                time-to-market by 40% without sacrificing code quality.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/90 hover:border-secondary/40 shadow-sm hover:shadow-brand transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-primary mb-3">
                Enterprise-Grade Security
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zero-trust architectures, end-to-end encryption, strict role-based access control, and
                continuous vulnerability testing built directly into the codebase.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200/90 hover:border-secondary/40 shadow-sm hover:shadow-brand transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-primary mb-3">
                Dedicated Senior Talent
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                You work directly with experienced software architects and engineers who understand
                complex business constraints and deliver dependable software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Projects Portfolio */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
                Proven Track Record
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              <span>Explore full portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technologies We Use */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Modern Tech Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Technologies We Use
            </h2>
            <p className="text-slate-600 text-base">
              We build scalable products using industry-standard, production-proven programming languages,
              frameworks, and cloud infrastructure.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TECH_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setActiveTechTab(idx)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTechTab === idx
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {TECH_CATEGORIES[activeTechTab].items.map((tech) => (
              <div
                key={tech}
                className="px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-sm hover:border-secondary hover:bg-white hover:text-secondary transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Our Development Process */}
      <section className="py-20 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Our Development Process
            </h2>
            <p className="text-slate-600 text-base">
              A structured 5-phase execution framework designed to ensure transparency, predict delivery
              timelines, and guarantee high-grade code quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative flex flex-col justify-between hover:shadow-brand transition-all"
              >
                <div>
                  <div className="text-3xl font-extrabold font-heading text-secondary/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-4">
              Trusted by Growing Startups & Global Enterprises
            </h2>
            <p className="text-slate-600 text-base">
              Here is what technology leaders and founders say about collaborating with BrandVerse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Contact CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary-800 to-secondary text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4 text-white">
                Ready to Build Your Next Digital Product?
              </h2>
              <p className="text-slate-200 text-base sm:text-lg">
                Let's discuss your project requirements, technical architecture, and implementation
                timeline with our principal software engineers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl font-heading font-semibold text-primary bg-white hover:bg-slate-100 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 rounded-xl font-heading font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span>Explore Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
