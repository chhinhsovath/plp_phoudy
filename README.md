# PLP Education Platform API

This is the backend API for the PLP Education Platform, built with NestJS and PostgreSQL.

## Description

The PLP Education Platform API provides endpoints for managing schools, teachers, students, subjects, lessons, exercises, and more. It's designed to handle a large number of users and high traffic.

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose (for database setup)
- npm or yarn
- Google Gemini API key (for AI features)
- OpenRouter API key (for Gemma 3 features)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd plp-backend-nest
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content (adjust values as needed):

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=plp_edtech_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d

# App Configuration
PORT=3000
NODE_ENV=development

# AI API Keys
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Docker Setup (Recommended)

1. Start PostgreSQL database with Docker:

```bash
docker-compose up -d postgres
```

2. The database will be automatically initialized with the schema and initial data.

3. Start the application:

```bash
npm run start:dev
```

## Manual Database Setup

If you prefer to set up PostgreSQL manually:

1. Install PostgreSQL on your system
2. Create a database named `plp_edtech_db`
3. Run the SQL scripts in the `init-db` directory:
   - `01-init-structure.sql` - Creates the database schema
   - `02-init-data.sql` - Inserts initial data

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api/docs
```

## Database Schema

The application uses a PostgreSQL database with the schema defined in the SQL migration file. The database schema includes tables for:

- Users (admin, teachers, students, parents)
- Schools
- Classes
- Subjects
- Lessons
- Exercises
- Questions and answers
- Student progress tracking
- And more

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Role-Based Access Control

The API implements role-based access control with the following roles:

- ADMIN: Full access to all features
- OFFICER: Administrative access with some restrictions
- TEACHER: Access to teaching-related features
- STUDENT: Access to learning materials and exercises
- PARENT: Access to their children's information and progress

## AI Integration

The API integrates with multiple AI models to provide intelligent responses for math education in Khmer language:

### Google Gemini
The original AI integration that provides:
- Specialized math tutoring for primary school students (grades 1-6)
- Responses in Khmer language
- Context-aware conversations
- Teacher-oriented interface

### Google Gemma 3 (NEW)
Recently added integration with Google's Gemma 3 27B model via OpenRouter:
- Enhanced multilingual support including Khmer
- Improved reasoning capabilities
- Free tier with $0/M tokens cost
- 96,000 context window
- Provides more detailed and accurate responses

For detailed setup instructions for both AI models, please see [AI Models Setup Guide](README-AI-MODELS.md).

## License

[MIT](LICENSE)
# plp_phoudy
