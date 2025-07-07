# NoteSync - Note Taking Application

## Overview

NoteSync is a full-stack note-taking application built with React, Express, and PostgreSQL. It provides a modern, responsive interface for creating, organizing, and managing personal notes with user authentication and category management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: JWT tokens with bcrypt for password hashing
- **API Design**: RESTful API with JSON responses

## Key Components

### Authentication System
- JWT-based authentication with secure token storage
- Email/password registration with OTP verification
- Password hashing using bcrypt
- Protected routes with middleware authentication
- Session management with token expiration

### Database Schema
- **Users**: User profiles with email verification and Google OAuth support
- **Notes**: Note content with title, body, category, and timestamps
- **OTP Codes**: Email verification codes with expiration tracking
- Foreign key relationships ensuring data integrity

### User Interface
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables
- Component-based architecture with reusable UI elements
- Form validation with real-time feedback
- Loading states and error handling

## Data Flow

### Authentication Flow
1. User registers with email/password
2. OTP sent to email for verification
3. User verifies OTP and receives JWT token
4. Token stored in localStorage for subsequent requests
5. Protected routes validate token on each request

### Note Management Flow
1. User creates note with title, content, and category
2. Client sends POST request to /api/notes with authentication header
3. Server validates token and saves note to database
4. Client updates cache and displays success message
5. Notes list refreshes with new data

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting
- **Validation**: Zod for schema validation

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL
- **Authentication**: jsonwebtoken and bcryptjs
- **WebSocket**: ws for Neon database connections
- **Development**: tsx for TypeScript execution

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with hot module replacement
- Express server with nodemon for backend auto-restart
- Environment variables for database and JWT configuration
- Replit integration with development banners

### Production Build
- Vite builds optimized frontend bundle
- esbuild bundles backend for Node.js deployment
- Static assets served from Express server
- Database migrations managed through Drizzle Kit

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for PostgreSQL connection
- `JWT_SECRET` for token signing
- Replit-specific configuration for development tools

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 07, 2025. Initial setup