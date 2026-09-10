# Tazkarty Backend

A RESTful backend API for a football ticket booking system, built with TypeScript, Node.js, Express, PostgreSQL, and Prisma.

The project follows Clean Architecture principles with a clear separation between the domain, application, infrastructure, and presentation layers.

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
- Filter upcoming and past matches
- Sort matches
- Pagination

### Stadium & Seating

- Get sections for a specific match
- Get available seats for a specific section
- Automatically exclude booked seats

### Tickets

- Book a ticket for a match
- Prevent booking an already reserved seat
- Restrict users to one ticket per match
- Database-level unique constraint to prevent duplicate bookings

### API Documentation

Swagger / OpenAPI documentation is available at:

```text
[https://tazkarty-backend-zvix-k9l6nk2y8-mahmoudahmedengcs-projects.vercel.app/]
```

---

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

---

## Architecture

The project follows a Clean Architecture approach.

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
```

### Layer Responsibilities

#### Domain

Contains:

- Entities
- Repository interfaces
- Domain services

The domain layer does not depend on Express, Prisma, or other infrastructure details.

#### Application

Contains the application's use cases and business flow.

Examples:

- RegisterUser
- LoginUser
- ChangePassword
- ForgotPassword
- ResetPassword
- GetAllMatches
- GetMatchById
- GetSectionsForMatch
- GetAvailableSeatsForMatchSection
- BookTicket

#### Infrastructure

Contains implementation details such as:

- Prisma repositories
- Database connection
- Password hashing
- JWT implementation
- Password reset token generation
- Password reset notifications
- Swagger configuration

#### Presentation

Contains HTTP-related concerns:

- Express routes
- Controllers
- Validation middleware
- Authentication middleware
- Authorization middleware

---

## API Endpoints

### Users

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/users/register` | No |
| POST | `/users/login` | No |
| GET | `/users/me` | Yes |
| PATCH | `/users/change-password` | Yes |
| POST | `/users/forgot-password` | No |
| POST | `/users/reset-password` | No |

### Matches

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/matches` | No |
| GET | `/matches/:id` | No |
| GET | `/matches/:matchId/sections` | No |
| GET | `/matches/:matchId/sections/:sectionName/seats` | No |

### Tickets

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/matches/:matchId/tickets` | Yes |

---

## Match Query Examples

Get all matches:

```http
GET /matches
```

Filter matches by team:

```http
GET /matches?team=Al%20Ahly
```

Get upcoming matches:

```http
GET /matches?upcoming=true
```

Sort matches:

```http
GET /matches?sort=matchDatetime&order=asc
```

Pagination:

```http
GET /matches?page=1&limit=10
```

Combine filters:

```http
GET /matches?team=Al%20Ahly&upcoming=true&page=1&limit=10
```

---

## Ticket Booking Flow

The booking flow is:

```text
Get Matches
     ↓
Select Match
     ↓
Get Match Sections
     ↓
Get Available Seats
     ↓
Book Seat
```

Example:

```http
GET /matches/1
```

Then:

```http
GET /matches/1/sections
```

Then:

```http
GET /matches/1/sections/A/seats
```

Finally:

```http
POST /matches/1/tickets
```

Request body:

```json
{
  "sectionName": "A",
  "seatName": "B1"
}
```

The booking endpoint requires a JWT Bearer token.

---

## Authentication

Protected endpoints use JWT Bearer authentication.

Example:

```http
Authorization: Bearer <your-jwt-token>
```

In Swagger, use the **Authorize** button and enter your JWT token.

---

## Booking Rules

The system enforces the following rules:

### One ticket per user per match

A user can book only one ticket for the same match.

Example:

```text
User 34
    ↓
Match 1
    ↓
B1
```

The same user cannot book another seat for Match 1.

However, the same user can book a ticket for another match.

### Prevent double booking

A seat cannot be booked twice for the same match.

The database contains a unique constraint on:

```text
match_id
stadium_name
section_name
seat_name
```

This prevents duplicate reservations for the same seat and match.

---

## Database Relationships

The main database relationships are:

```text
Team
  ↓
Match
  ↓
Stadium
  ↓
Section
  ↓
Seat
  ↓
Ticket
  ↓
User
```

A `Match` belongs to a `Stadium`.

A `Stadium` contains multiple `Sections`.

A `Section` contains multiple `Seats`.

A `Ticket` connects a `User`, a `Match`, and a specific `Seat`.

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- PostgreSQL
- npm

### 1. Clone the repository

```bash
git clone https://github.com/MahmoudAhmedEngCs/tazkarty-backend.git
cd tazkarty-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/tazkarty
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

Do not commit the real `.env` file.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

For local development:

```bash
npx prisma migrate dev
```

For an existing production database:

```bash
npx prisma migrate deploy
```

### 6. Seed demo data

```bash
npx prisma db seed
```

The seed creates demo data including:

- Teams
- Stadiums
- Sections
- Seats
- Matches
- Demo users
- Sample tickets

### 7. Run the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### 8. Open Swagger

```text
http://localhost:3000/docs
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Runs the server using `tsx` with watch mode.

### Build

```bash
npm run build
```

Compiles the TypeScript source into the `dist` directory.

### Production

```bash
npm start
```

Runs the compiled application.

### Seed

```bash
npm run seed
```

Seeds the database with demo data.

---

## Demo Account

The seed creates a demo user:

```text
Phone: 01011111111
Password: Password123!
```

Login with this account to receive a JWT and test protected endpoints.

---

## Security

The API includes several security-related mechanisms:

- JWT authentication
- bcrypt password hashing
- Zod request validation
- Helmet security headers
- Rate limiting
- Database constraints for ticket uniqueness
- Generic authentication error messages
- Password reset token hashing

---

## Password Reset Flow

The password reset flow is:

```text
Forgot Password
      ↓
Generate Reset Token
      ↓
Hash Token
      ↓
Store Hash in Database
      ↓
Send Reset Token
      ↓
Reset Password
      ↓
Invalidate Token
```

During development, password reset notifications are logged to the console.

---

## Project Structure

```text
tazkarty-backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── application/
│   │   └── useCases/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── services/
│   │
│   ├── infrastructure/
│   │   ├── container/
│   │   ├── database/
│   │   ├── notifications/
│   │   ├── repositories/
│   │   ├── security/
│   │   └── swagger.ts
│   │
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── types/
│   │   └── validation/
│   │
│   ├── errors/
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

## Future Improvements

Possible future improvements include:

- Ticket retrieval endpoints
- Ticket cancellation
- Ownership authorization for ticket cancellation
- More comprehensive automated tests
- Improved transaction handling for concurrent bookings
- Production deployment
- Docker
- Expanded Swagger schemas and examples
- SMS integration for production password reset notifications

---

## Author

**Mahmoud Ahmed**

GitHub:

https://github.com/MahmoudAhmedEngCs
