# LuxeStay — Editorial Stays Booking, Map Discovery & 3D Virtual Tour Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933.svg?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1.svg?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7.x-DC382D.svg?style=flat-square&logo=redis)](https://redis.io/)
[![Stripe](https://img.shields.io/badge/Stripe-API-008CDD.svg?style=flat-square&logo=stripe)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

LuxeStay is a full-stack, enterprise-grade luxury hotel booking and map discovery platform. Built with an editorial design aesthetic, it combines interactive Leaflet tilemaps, immersive 360° 3D VR room walkthroughs, natural language AI search processing, instant SWR prefetching, multi-role access control, and seamless Stripe checkout integration.

---

## 📸 Application Showcase

### 1. Split Map & Stay Discovery Interface
A dual-pane view pairing live room cards with an interactive Leaflet Positron map. Selecting any property automatically projects surrounding Michelin-starred dining, beaches, and historic landmarks as gold star markers with distance metrics.

![Split Map & Search Discovery](docs/assets/hero_map_discovery.jpg)

---

### 2. Immersive 3D Virtual Suite Walkthrough & Booking
Experience room interiors before reserving using PhotoSphereViewer & Three.js spatial navigation. Integrated with dynamic Stripe Checkout, transparent tax breakdowns, and amenity highlights.

![Room Details & 3D VR Tour](docs/assets/room_details_3d_tour.jpg)

---

### 3. Super Admin & Staff Analytics Dashboard
Dark-mode management portal featuring real-time financial KPI cards, occupancy charts, inventory CRUD operations, and user role administration.

![Admin Control Panel & Analytics](docs/assets/admin_analytics_dashboard.jpg)

---

## ✨ Key Features & Engineering Highlights

### 🗺️ Split Map & Geographic Discovery Engine
* **Leaflet Positron Integration:** Ultra-clean, minimal tilemaps powered by Geoapify tiles for a high-end luxury feel.
* **Curated Attraction Projections:** Interactively displays nearby points of interest (Michelin dining, beaches, culture) upon room selection.
* **Dynamic Filter Badges:** Slider drawer filters update global search state in real-time with removable pill badges.

### 🤖 4-Tier Resilient Natural Language AI Search
Converts complex natural language queries (e.g., *"Beachfront luxury villa under $1500 with private pool in Paris"*) into structured database filter parameters via a resilient 4-stage fallback pipeline:
1. **Primary:** Google Gemini 2.5 Flash API with JSON Schema constraint enforcement.
2. **Fallback 1:** NVIDIA NIM Inference API (`openai/gpt-oss-120b`).
3. **Fallback 2:** OpenRouter Gateway endpoint.
4. **Fallback 3:** Local deterministic Regex keyphrase extraction engine.

### 🔮 360° 3D Virtual Tours
* Powered by `@photo-sphere-viewer/core` and `three.js`.
* Admins can attach custom Matterport or VR tour URLs directly via the management dashboard.
* Fallbacks gracefully to high-resolution preset panoramas when offline or missing VR config.

### ⚡ Performance & Stale-While-Revalidate (SWR) Prefetching
* **Instant Hover Prefetching:** Hovering or clicking a map pin pre-fetches room payload details into an in-memory `roomCache` store before navigation occurs.
* **Optimized Skeleton Loaders:** Context-aware pulsing skeleton templates eliminate cumulative layout shifts (CLS).
* **Zustand Reactive State:** Micro-stores (`authStore`, `bookingStore`, `filterStore`, `wishlistStore`, `uiStore`) minimize re-render cycles.

### 🔒 Enterprise Security & Inactivity Watchdog
* **Automatic Inactivity Logout:** Continuous event listener tracking mouse movement, keypresses, touch, and scrolling automatically invalidates JWT tokens after 10 minutes of idleness.
* **Role-Based Access Control (RBAC):** Middleware route protection distinguishing Super Admins, Staff Admins, and Standard Customers.
* **Zero-Trust Token Management:** HttpOnly cookie sessions with Redis token blacklist validation on logout.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client ["Frontend (React 18 + Vite + Tailwind CSS)"]
        UI[Editorial UI Components]
        Map[Leaflet Positron Map Engine]
        VR[PhotoSphere 3D Tour Viewer]
        Zustand[Zustand Global State Management]
    end

    subgraph API ["Backend API Layer (Node.js + Express + TypeScript)"]
        AuthMW[JWT Auth & Security Middleware]
        RoomsCtrl[Rooms & Inventory Controller]
        AICtrl[AI Search Service Controller]
        BookingCtrl[Bookings & Stripe Service]
    end

    subgraph Storage ["Database & Caching Layer"]
        Prisma[Prisma ORM]
        PostgreSQL[(PostgreSQL Database)]
        Redis[(Redis Cache & Session Store)]
    end

    subgraph External ["Third-Party External Services"]
        Stripe[Stripe Payment Gateway]
        Cloudinary[Cloudinary Media CDN]
        AIModels[Gemini / NVIDIA NIM APIs]
    end

    UI --> Zustand
    Zustand --> API
    Map --> API
    VR --> API
    API --> AuthMW
    AuthMW --> RoomsCtrl
    AuthMW --> AICtrl
    AuthMW --> BookingCtrl
    RoomsCtrl --> Prisma
    AICtrl --> AIModels
    BookingCtrl --> Stripe
    RoomsCtrl --> Cloudinary
    Prisma --> PostgreSQL
    RoomsCtrl --> Redis
```

---

## 🔑 Seeded Test Accounts

The system comes pre-seeded with test accounts across all authorization levels:

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@luxestay.com` | `AdminPassword123!` | Full CMS dashboard, revenue metrics, global room CRUD, user role management. |
| **Admin (Staff)** | `staff@luxestay.com` | `StaffPassword123!` | Management panel, room inventory CRUD, reservations tracking. |
| **Customer User** | `john@example.com` | `UserPassword123!` | Room search & map discovery, 3D tour walkthrough, Stripe booking, wishlist. |

---

## 🛠️ Installation & Setup Guide

### Prerequisites
* **Node.js** v18+ 
* **PostgreSQL** Database instance
* **Redis** Server (optional, fallbacks supported)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables in backend/.env
# Example configuration:
DATABASE_URL="postgresql://postgres:password@localhost:5432/luxestay?schema=public"
JWT_SECRET_STANDARD_KEY="your-super-secret-jwt-key"
GEOAPIFY_MAPS_PLACE_API_KEY="your-geoapify-api-key"
STRIPE_SECRET_KEY="sk_test_..."
GEMINI_API_KEY="AIzaSy..."

# Sync Prisma Schema with Database
npx prisma db push
npx prisma generate

# Seed database with luxury stays & demo users
npm run prisma:seed

# Start development server
npm run dev
```

### 2. Frontend Setup

```bash
# Open new terminal in frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite hot-reloading development server
npm run dev
```

Visit `http://localhost:3000` in your browser to view the live application.

---

## 🧪 Technical Quality & Engineering Practices

* **Clean Architecture:** Strict Controller-Service pattern separation on the backend; feature-driven directory layout on the frontend.
* **Type Safety:** 100% strict TypeScript across both frontend and backend without `any` types.
* **Database Optimization:** Indexed foreign keys and spatial coordinate fields for instant geo-radius querying.
* **Component Boundaries:** Max 300-line modular component rule to maintain readability and testability.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
