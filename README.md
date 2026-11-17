# BRANDVERSE — Professional IT Company Full-Stack Platform

> **Innovating Ideas. Building Digital Futures.**  
> A complete, modern, responsive full-stack enterprise web application and admin management system for **BRANDVERSE**, an IT & Software Development company.

---

## 🚀 Key Highlights & Architectural Overview

- **Frontend**: Built with **React 18**, **Vite**, **Tailwind CSS**, **Lucide React**, **React Router v7**, **Axios**, and **React Hook Form**.
- **Backend**: Built with **Python 3.13**, **Django 6**, **Django REST Framework (DRF)**, **Simple JWT (JSON Web Tokens)**, and **django-cors-headers**.
- **Database**: **PostgreSQL 17** dedicated database cluster with complete relations, constraints, indices, and migrations.
- **Security**: JWT authorization with token refresh, password hashing, staff-only admin endpoints, input validation, resume upload validation, and CORS restrictions.
- **Admin Control Center**: Custom, secure, staff-protected responsive dashboard with complete CRUD operations across all business verticals.

---

## 🎨 Design System & Visual Palette

| Token | Color Code | Purpose |
|---|---|---|
| **Primary** | `#142B4A` | Corporate deep blue for headers, footers, and brand authority |
| **Secondary** | `#2563EB` | Vibrant blue for primary CTAs, active links, and brand highlights |
| **Accent** | `#38BDF8` | Cyan glow, hover transitions, and tech tags |
| **Background** | `#F5F7FA` | Clean slate background for readability |
| **White** | `#FFFFFF` | Card surfaces, modals, and input fields |
| **Typography** | **Poppins** (Headings) & **Inter** (Body) | Crisp corporate typography hierarchy |

---

## 🌐 Full Website Pages & Routes

### Public Pages
1. **Home (`/`)**: Hero with animated glowing accents, configurable company statistics, About BrandVerse, 8 services grid, Why Choose BrandVerse, featured project case studies, tech stack matrix, 5-stage development process, testimonials, and contact CTA.
2. **About Us (`/about`)**: Detailed company overview, mission statement, vision statement, core corporate values, interactive company journey timeline (2018–2026), leadership & engineering team directory.
3. **Services (`/services`)**: Full catalog of 8 services with real-time search and filter.
4. **Service Details (`/services/:slug`)**: In-depth architecture breakdown, benefits, technologies used, development process, and embedded quote request form.
5. **Portfolio (`/portfolio`)**: Interactive project case studies filterable across categories (*Web Development*, *Mobile Applications*, *AI Solutions*, *E-commerce*, *UI/UX Design*) and live search.
6. **Project Details (`/portfolio/:slug`)**: High-res cover image, architecture narrative, client name, completion date, tech stack badges, and direct links to live platforms and repositories.
7. **Careers (`/careers`)**: Company culture, employee benefits & stipends, department filter, and active job listings.
8. **Job Details (`/careers/:slug`)**: Role description, responsibilities, requirements, benefits, and an embedded **Job Application Form** supporting resume uploads.
9. **Contact Us (`/contact`)**: Headquarters address, phone, email, working hours, social accounts, Google Maps embed, and an interactive **Contact Enquiry Form**.
10. **Privacy Policy (`/privacy`)**: Comprehensive GDPR & CCPA compliant privacy disclosures.
11. **Terms & Conditions (`/terms`)**: Enterprise software terms of service.
12. **Custom 404 Page (`*`)**: Stylized BrandVerse error page with quick navigation back to safety.

### Protected Admin Dashboard (`/admin/dashboard`)
*Access Route: `/admin/login`*
- **Overview**: Real-time KPI analytics cards, recent client enquiries, recent job applications, and project distribution.
- **Services Management**: Complete CRUD to add, modify, reorder, feature, and delete services.
- **Projects Management**: Complete CRUD for portfolio case studies with live URLs and category tags.
- **Job Openings**: Create, edit, toggle active status, and manage recruitment roles.
- **Job Applications**: View applicant dossiers, download resumes, update recruitment pipeline status (`applied`, `reviewing`, `interviewed`, `offered`, `rejected`), and maintain internal interviewer notes.
- **Contact Enquiries**: View incoming lead messages, update resolution status (`new`, `in_progress`, `resolved`, `closed`), and record sales notes.
- **Team Management**: Complete CRUD for company executives and software architects.
- **Testimonials Management**: Complete CRUD for client ratings, quotes, and avatars.
- **Company Information**: Live updates to company description, mission, vision, and configurable stats.
- **Website Settings**: SEO meta tags, social accounts, Google Maps URL, and maintenance mode.
- **Admin Profile**: Manage staff credentials, bio, and contact information.

---

## 🗄️ PostgreSQL Database Models

1. **`User`** (`apps.accounts.models.User`): Extended AbstractUser with role-based access (`admin`, `staff`, `manager`), phone, avatar, and bio.
2. **`CompanyInfo`** (`apps.company.models.CompanyInfo`): Corporate identity, mission, vision, JSON core values, JSON journey timeline, JSON stats, and contact details.
3. **`Service`** (`apps.services.models.Service`): Title, unique slug, Lucide icon name, image URL, short and full descriptions, JSON benefits list, JSON tech stack, JSON process workflow, sort order, and active/featured flags.
4. **`Project`** (`apps.projects.models.Project`): Title, unique slug, category, image, short and full descriptions, client name, completion date, JSON technologies, live URL, GitHub URL, and featured flag.
5. **`TeamMember`** (`apps.company.models.TeamMember`): Name, role, department, bio, photo URL, LinkedIn, GitHub, email, and sort order.
6. **`Testimonial`** (`apps.company.models.Testimonial`): Client name, title, company, rating (1–5), testimonial quote, avatar URL, and featured flag.
7. **`JobOpening`** (`apps.careers.models.JobOpening`): Title, unique slug, department, location, job type, experience level, salary range, description, JSON requirements, JSON responsibilities, JSON benefits, and active flag.
8. **`JobApplication`** (`apps.careers.models.JobApplication`): ForeignKey to `JobOpening`, candidate full name, email, phone, uploaded resume file (`media/resumes/`), cover letter, status pipeline, and recruiter notes.
9. **`ContactEnquiry`** (`apps.enquiries.models.ContactEnquiry`): Sender name, email, phone, company, interested service, message, status pipeline, and internal admin notes.
10. **`SiteSettings`** (`apps.company.models.SiteSettings`): Global site title, SEO meta title, SEO meta description, social links, Google Maps URL, and maintenance toggle.

---

## 🔌 Complete REST API Specification

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/company/` | Retrieve company info, mission, vision, journey & stats |
| `GET` | `/api/company/settings/` | Retrieve public site settings & social URLs |
| `GET` | `/api/services/` | List all active services (supports `?featured=true`) |
| `GET` | `/api/services/<slug>/` | Retrieve detailed service specification by slug |
| `GET` | `/api/projects/` | List all portfolio projects (supports `?category=...&search=...`) |
| `GET` | `/api/projects/<slug>/` | Retrieve project case study by slug |
| `GET` | `/api/team/` | List active team members |
| `GET` | `/api/testimonials/` | List verified client testimonials |
| `GET` | `/api/jobs/` | List open career vacancies (supports `?department=...`) |
| `GET` | `/api/jobs/<slug>/` | Retrieve job details by slug |
| `POST` | `/api/applications/` | Submit candidate application with multipart resume upload |
| `POST` | `/api/enquiries/` | Submit prospective client project enquiry |

### Authentication Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login/` | Obtain JWT access and refresh tokens with user payload |
| `POST` | `/api/auth/refresh/` | Refresh expired access token |
| `POST` | `/api/auth/logout/` | Invalidate session |
| `GET` | `/api/auth/me/` | Retrieve current authenticated staff profile |

### Admin Endpoints (Require Bearer JWT & Staff Permission)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard/` | Real-time dashboard KPI analytics and recent items |
| `CRUD` | `/api/admin/services/` | Full create, read, update, delete for services |
| `CRUD` | `/api/admin/projects/` | Full create, read, update, delete for projects |
| `CRUD` | `/api/admin/jobs/` | Full create, read, update, delete for job vacancies |
| `CRUD` | `/api/admin/applications/` | Manage candidate applications, download resumes, update status |
| `CRUD` | `/api/admin/enquiries/` | Manage incoming client enquiries and update discussion status |
| `CRUD` | `/api/admin/team/` | Manage executive and engineering team members |
| `CRUD` | `/api/admin/testimonials/` | Manage client reviews and ratings |
| `GET/PUT` | `/api/admin/company/` | Read or update company profile and statistics |
| `GET/PUT` | `/api/admin/settings/` | Read or update SEO, metadata, and social URLs |
| `GET/PUT` | `/api/admin/profile/` | Read or update administrator profile |

---

## 💻 Local Setup & Development Guide

### Prerequisites
- Python 3.10+ (Tested on Python 3.13)
- Node.js 18+ (Tested on Node 26)
- PostgreSQL 14+ (Tested on PostgreSQL 17)

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `AdminPassword123!`
- **Admin Login URL**: `http://localhost:5174/admin/login`

### Quick Start (Single Command)
Run the automated launcher:
```bash
./start_brandverse.sh
```

### Manual Step-by-Step Instructions

#### 1. Backend Setup (Django & PostgreSQL)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed rich initial data
python manage.py seed_data

# Start Django API server on port 8001
python manage.py runserver 0.0.0.0:8001
```

#### 2. Frontend Setup (React & Vite)
```bash
cd frontend
npm install

# Start Vite dev server on port 5174 (with automatic proxy to Django on 8001)
npx vite --port 5174 --host
```

Access the application in your browser:
- **Public Website**: `http://localhost:5174/`
- **Admin Control Center**: `http://localhost:5174/admin/login`
- **Backend API Root**: `http://localhost:8001/api/company/`

---

## 🔒 Security & Best Practices Implemented

1. **JWT Authentication**: Short-lived access tokens with automatic silent refresh via Axios interceptors.
2. **Role-Based Authorization**: Administrative APIs strictly enforce `IsAuthenticated` and `IsAdminUser`.
3. **File Validation**: Strict MIME-type and extension validation (`.pdf`, `.doc`, `.docx`) and 10MB file size limits on resumes.
4. **Environment Isolation**: Database passwords, secret keys, and CORS configurations stored in `.env`.
5. **SQL Injection & XSS Protection**: Powered by Django ORM parameterized queries and React automatic output escaping.
6. **SEO Architecture**: Semantic HTML5 tags, page titles, Open Graph tags, robots.txt, and sitemap.xml.
