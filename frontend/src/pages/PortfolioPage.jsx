import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { projectsApi } from '../services/api';
import ProjectCard from '../components/cards/ProjectCard';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CATEGORIES = [
  'All',
  'Web Development',
  'Mobile Applications',
  'AI Solutions',
  'E-commerce',
  'UI/UX Design',
];

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsApi.getProjects();
        setProjects(res.data || []);
        setFilteredProjects(res.data || []);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }
    setFilteredProjects(result);
  }, [selectedCategory, searchQuery, projects]);

  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Portfolio' }]} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 uppercase tracking-wider">
              Case Studies & Works
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-primary mb-6">
              Our Featured Projects & Case Studies
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Explore how we solve tough business challenges through high-performance web applications,
              intelligent AI platforms, and enterprise cloud architectures.
            </p>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects by name, keyword, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-brandBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-secondary text-white shadow-md shadow-secondary/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <LoadingSpinner text="Loading portfolio projects..." />
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 font-medium text-lg mb-2">No projects match the selected criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-secondary hover:underline text-sm font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
