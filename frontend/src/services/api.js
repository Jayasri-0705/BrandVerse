import axios from 'axios';

// Create Axios client with base API path
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('brandverse_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('brandverse_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = res.data.access;
          localStorage.setItem('brandverse_access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('brandverse_access_token');
          localStorage.removeItem('brandverse_refresh_token');
          localStorage.removeItem('brandverse_user');
          if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Public API Services
export const companyApi = {
  getCompanyInfo: () => api.get('/company/'),
  getSiteSettings: () => api.get('/company/settings/'),
  getTeamMembers: () => api.get('/team/'),
  getTestimonials: () => api.get('/testimonials/'),
};

export const servicesApi = {
  getServices: (params) => api.get('/services/', { params }),
  getServiceBySlug: (slug) => api.get(`/services/${slug}/`),
};

export const projectsApi = {
  getProjects: (params) => api.get('/projects/', { params }),
  getProjectBySlug: (slug) => api.get(`/projects/${slug}/`),
};

export const careersApi = {
  getJobs: (params) => api.get('/jobs/', { params }),
  getJobBySlug: (slug) => api.get(`/jobs/${slug}/`),
  submitApplication: (formData) =>
    api.post('/applications/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const enquiriesApi = {
  submitEnquiry: (data) => api.post('/enquiries/', data),
};

// Admin API Services
export const authApi = {
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/me/'),
  updateProfile: (data) => api.put('/auth/me/', data),
};

export const adminApi = {
  getDashboardOverview: () => api.get('/admin/dashboard/'),
  getProfile: () => api.get('/admin/profile/'),
  updateProfile: (data) => api.put('/admin/profile/', data),
  
  // Services
  getServices: () => api.get('/admin/services/'),
  createService: (data) => api.post('/admin/services/', data),
  updateService: (id, data) => api.put(`/admin/services/${id}/`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}/`),

  // Projects
  getProjects: () => api.get('/admin/projects/'),
  createProject: (data) => api.post('/admin/projects/', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}/`),

  // Jobs
  getJobs: () => api.get('/admin/jobs/'),
  createJob: (data) => api.post('/admin/jobs/', data),
  updateJob: (id, data) => api.put(`/admin/jobs/${id}/`, data),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}/`),

  // Applications
  getApplications: () => api.get('/admin/applications/'),
  getApplication: (id) => api.get(`/admin/applications/${id}/`),
  updateApplication: (id, data) => api.patch(`/admin/applications/${id}/`, data),
  deleteApplication: (id) => api.delete(`/admin/applications/${id}/`),

  // Enquiries
  getEnquiries: () => api.get('/admin/enquiries/'),
  getEnquiry: (id) => api.get(`/admin/enquiries/${id}/`),
  updateEnquiry: (id, data) => api.patch(`/admin/enquiries/${id}/`, data),
  deleteEnquiry: (id) => api.delete(`/admin/enquiries/${id}/`),

  // Team
  getTeam: () => api.get('/admin/team/'),
  createTeamMember: (data) => api.post('/admin/team/', data),
  updateTeamMember: (id, data) => api.put(`/admin/team/${id}/`, data),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}/`),

  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials/'),
  createTestimonial: (data) => api.post('/admin/testimonials/', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}/`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}/`),

  // Company Info & Settings
  getCompany: () => api.get('/admin/company/'),
  updateCompany: (data) => api.put('/admin/company/', data),
  getSettings: () => api.get('/admin/settings/'),
  updateSettings: (data) => api.put('/admin/settings/', data),
};
