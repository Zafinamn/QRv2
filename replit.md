# Overview

This is a full-stack QR code generator application built with React and Express.js. The application allows users to create customizable QR codes with various configuration options including size, error correction levels, and background transparency. It features a modern, responsive interface built with Tailwind CSS and shadcn/ui components.

The application follows a monorepo structure with clear separation between client-side (React) and server-side (Express) code, along with shared type definitions and database schemas.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built using React with TypeScript and follows a component-based architecture:

- **UI Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Build Tool**: Vite for fast development and optimized builds
- **QR Code Generation**: qrcode library for generating QR codes on HTML5 canvas

The frontend uses a clean component structure with reusable UI components and proper separation of concerns between configuration panels and preview functionality.

## Backend Architecture

The server-side follows a minimal Express.js architecture:

- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: Simple route-based architecture with modular storage interface
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database integration)
- **Development**: Integrated with Vite for hot module replacement in development

## Data Storage Solutions

- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but not yet implemented in routes)
- **Schema**: User management schema with username/password fields
- **Migration System**: Drizzle-kit for database migrations

The storage layer uses an interface pattern allowing easy swapping between in-memory storage (current) and database implementations.

## Authentication and Authorization

Basic user schema is defined with username and password fields, though authentication routes and middleware are not yet implemented. The foundation is in place for adding authentication:

- User model with unique username constraint
- Password storage capability
- Zod validation schemas for input validation

## Project Structure

- `/client` - React frontend application
- `/server` - Express.js backend
- `/shared` - Shared TypeScript types and database schemas
- `/components.json` - shadcn/ui configuration
- Root level configuration files for build tools and database

# External Dependencies

## Core Frameworks
- **React** - Frontend framework with TypeScript support
- **Express.js** - Backend web framework
- **Vite** - Build tool and development server

## UI and Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives
- **@radix-ui/** - Accessible UI primitives for complex components

## Database and ORM
- **Drizzle ORM** - Type-safe ORM for PostgreSQL
- **@neondatabase/serverless** - PostgreSQL driver for serverless environments
- **PostgreSQL** - Primary database (configured but not actively used yet)

## Development Tools
- **TypeScript** - Type safety across frontend and backend
- **PostCSS** - CSS processing with autoprefixer
- **ESBuild** - Fast bundling for production builds

## QR Code Generation
- **qrcode** - Library for generating QR codes on canvas
- **date-fns** - Date utility library

## State Management and HTTP
- **@tanstack/react-query** - Server state management and caching
- **wouter** - Lightweight client-side routing

The application is designed to be deployed on Replit with development-specific integrations for hot reloading and error handling.