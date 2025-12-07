# PM-AJAY (Adarsh Gram) Portal

## Overview

The PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) - Adarsh Gram Component is a government portal for developing SC-majority villages into model villages. The system manages village identification, household surveys, infrastructure development planning, progress tracking, and Adarsh Gram declarations.

**Core Purpose**: Enable district, state, and block officials to:
- Survey villages and households to identify gaps in infrastructure and services
- Create and manage Village Development Plans (VDPs)
- Track infrastructure works and beneficiary-oriented schemes
- Generate reports and declare villages as "Adarsh Gram" based on achievement scores

**Key Workflows**:
1. Village verification and Format I (village profile) data entry
2. Infrastructure indicator assessment (Format II)
3. Household surveys and beneficiary identification (Formats III-A, III-B)
4. Work estimation and funding allocation (Format IV)
5. VDP generation and approval
6. Progress tracking for infrastructure and beneficiary schemes
7. Score calculation and Adarsh Gram declaration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**:
- React 18 with TypeScript (TSX)
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling with shadcn/ui component library

**Design System**:
- Material Design-inspired approach with government portal conventions
- New York style variant from shadcn/ui
- Inter font family as primary typeface
- Neutral color scheme with customized HSL color variables
- Responsive grid layouts: mobile-first, 2-column forms on desktop
- Component library: Radix UI primitives with custom styling

**State Management**:
- AuthContext for user authentication state (JWT token in localStorage)
- React Query for API data caching and synchronization
- Local component state with useState for form data

**Route Structure**:
- Public routes: `/`, `/login`
- Protected routes: All other routes require authentication
- Main sections: Dashboard, Village Data Entry, Progress Tracking, Reports, VDP Management, Help

### Backend Architecture

**Server Framework**:
- Node.js with Express
- TypeScript with ESNext modules
- Environment-based configuration (development/production)

**Authentication & Authorization**:
- JWT-based authentication with bcrypt password hashing
- Role-based access control (RBAC): admin, state, district, block, village
- Middleware: `authMiddleware` for token verification, `requireRole` for permission checks
- Session secret from environment variables

**API Design**:
- RESTful endpoints under `/api` prefix
- Request validation using Zod schemas derived from Drizzle table schemas
- File upload support via Multer (diskStorage to `uploads/` directory)
- Structured error handling with HTTP status codes

**Business Logic Layer**:
- Storage interface abstraction (`IStorage`) for data operations
- Separation of concerns: routes.ts handles HTTP, storage.ts handles data access
- Validation schemas from shared schema definitions

**Build System**:
- esbuild for server bundling (reduces cold start syscalls)
- Selective dependency bundling (allowlist for critical packages)
- Vite for client builds
- Production bundle outputs to `dist/` directory

### Data Storage

**Database**: PostgreSQL via Neon serverless
- Connection pooling with @neondatabase/serverless
- WebSocket support for serverless environments

**ORM**: Drizzle ORM
- Schema-first approach with shared TypeScript definitions
- Type-safe queries with drizzle-orm operators (eq, and, desc, sql, count, sum)
- Zod schema generation for runtime validation
- Migration scripts in `migrations/` directory

**Schema Design** (shared/schema.ts):

**Core Tables**:
- `users`: Authentication and user profiles with role-based fields (state, district assignments)
- `villages`: Village master data including population, SC percentage, verification status, VDP status
- `committeMembers`: Village committee composition (required for VDP approval)
- `infrastructureIndicators`: Domain-wise infrastructure gap assessment (Formats II)
- `households`: Household registry with caste, income, contact details
- `householdSurveys`: Survey responses linked to domains and indicators
- `beneficiaryInitiatives`: Scheme linkages for households (Format III-B)
- `infrastructureWorks`: Planned and ongoing infrastructure projects (Format IV)
- `agencies`: Implementing agencies for convergence schemes
- `vdps`: Village Development Plans with status workflow (draft, submitted, finalized, locked)
- `villageScores`: Time-series scoring data for Adarsh Gram eligibility
- `adarshGramDeclarations`: Final declaration records with criteria verification
- `monthlyReports`: Progress reporting at district/state level
- `uploads`: File attachments (photos, documents) with metadata

**Key Relationships**:
- Villages → many Households, CommitteeMembers, InfrastructureIndicators, Works
- Households → many HouseholdSurveys, BeneficiaryInitiatives
- Villages → one VDP (1:1 with status tracking)

**Data Integrity**:
- Foreign key references via villageId, householdId
- Unique constraints on village codes, usernames
- Timestamp tracking (createdAt, updatedAt) on major entities

### External Dependencies

**Third-Party Services**:
- **Neon Database**: Serverless PostgreSQL hosting (DATABASE_URL environment variable required)
- **Email (Planned)**: Nodemailer for notifications on VDP submission, finalization, unlock requests

**File Storage**:
- **Local**: Multer disk storage to `uploads/` directory (10MB limit per file)
- **S3-compatible (Optional)**: Infrastructure exists for cloud storage via environment configuration

**Machine Learning Services** (Mentioned in requirements, not yet implemented):
- Prioritizer: XGBoost/LightGBM for VDP item ranking and budget allocation
- Photo Verifier: MobileNet/EfficientNet for work completion verification
- Satellite Change Detector: NDVI/NDBI analysis for infrastructure changes
- OCR + NER: Tesseract for convergence document extraction
- Anomaly Detector: IsolationForest for survey data validation
- Explainability: SHAP summaries for ML predictions

**Build & Development Tools**:
- Vite plugins: runtime error overlay, Replit cartographer, dev banner
- TypeScript compiler with strict mode
- ESBuild for server bundling with selective external dependencies

**UI Component Libraries**:
- Radix UI primitives (20+ components): dialog, dropdown, select, accordion, etc.
- Recharts for data visualization (bar charts, pie charts)
- class-variance-authority for component variants
- tailwind-merge and clsx for className utilities

**Validation & Schemas**:
- Zod for runtime type validation
- Drizzle-Zod for automatic schema generation from database models
- @hookform/resolvers for form validation integration

**Reference Documents**:
- PMAGY Guidelines (July 2024 revision)
- AGY User Manual
- Design Guidelines (design_guidelines.md)

**Environment Configuration**:
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: JWT signing key (defaults to "agy-portal-secret-key")
- `NODE_ENV`: development/production mode