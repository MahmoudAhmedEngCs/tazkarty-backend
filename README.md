# Tazkarty Backend

A RESTful backend API for a football ticket booking system, built with TypeScript, Node.js, Express, PostgreSQL, and Prisma.

The project follows a Clean Architecture approach with a clear separation between domain, application, infrastructure, and presentation layers.

## Features

### Authentication & Users
- User registration
- User login
- JWT authentication
- Get current authenticated user
- Change password
- Forgot password
- Reset password
- Role-based authorization

### Matches
- Get all matches
- Get match by ID
- Filter matches by team
- Filter upcoming/past matches
- Sort matches
- Pagination

### Stadium & Seating
- Get sections for a specific match
- Get available seats for a specific section
- Seats are filtered based on existing bookings

### Tickets
- Book a ticket for a match
- Prevent booking an already reserved seat
- One ticket per user for the same match
- Database-level unique constraint to prevent duplicate bookings

### API Documentation
Swagger / OpenAPI documentation is available through:

`/docs`

## Tech Stack

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- bcrypt
- Swagger / OpenAPI
- Helmet
- express-rate-limit

## Architecture

The project uses Clean Architecture principles:

```text
src/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── services/
│
├── application/
│   └── useCases/
│
├── infrastructure/
│   ├── container/
│   ├── database/
│   ├── repositories/
│   ├── security/
│   ├── notifications/
│   └── swagger.ts
│
├── presentation/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── types/
│   └── validation/
│
└── errors/
