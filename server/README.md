# Nexora Healthcare Platform - Backend API

This is the backend API for the Nexora Healthcare Platform, a comprehensive digital healthcare solution.

## Features

- **Authentication**: User registration, login, and password reset
- **User Management**: Profile management with medical history
- **Medication Management**: Track medications and adherence
- **Health Monitoring**: Record and analyze health metrics
- **Symptom Checker**: AI-powered symptom analysis
- **Telemedicine**: Schedule and manage virtual appointments
- **Health Education**: Access to health articles and resources

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/nexora
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:resetToken` - Reset password

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/profile/update` - Update user profile
- `PUT /api/users/medical-history/update` - Update medical history

### Medications
- `GET /api/medications` - Get all medications for user
- `GET /api/medications/:id` - Get medication by ID
- `POST /api/medications` - Create new medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication
- `PUT /api/medications/:id/adherence` - Update medication adherence

### Health Data
- `GET /api/health-data` - Get all health data for user
- `GET /api/health-data/type/:type` - Get health data by type
- `GET /api/health-data/:id` - Get health data by ID
- `POST /api/health-data` - Create new health data
- `PUT /api/health-data/:id` - Update health data
- `DELETE /api/health-data/:id` - Delete health data

### Symptoms
- `GET /api/symptoms` - Get all symptom checks for user
- `GET /api/symptoms/:id` - Get symptom check by ID
- `POST /api/symptoms` - Create new symptom check
- `PUT /api/symptoms/:id` - Update symptom check
- `DELETE /api/symptoms/:id` - Delete symptom check
- `POST /api/symptoms/analyze` - Analyze symptoms

### Telemedicine
- `GET /api/telemedicine/appointments` - Get all appointments
- `GET /api/telemedicine/appointments/:id` - Get appointment by ID
- `POST /api/telemedicine/appointments` - Create new appointment
- `PUT /api/telemedicine/appointments/:id` - Update appointment
- `DELETE /api/telemedicine/appointments/:id` - Delete appointment
- `GET /api/telemedicine/doctors` - Get all doctors
- `GET /api/telemedicine/doctors/:id` - Get doctor by ID
- `GET /api/telemedicine/doctors/:id/slots` - Get available slots

### Health Education
- `GET /api/education/articles` - Get all articles
- `GET /api/education/articles/:id` - Get article by ID
- `POST /api/education/articles` - Create new article
- `PUT /api/education/articles/:id` - Update article
- `DELETE /api/education/articles/:id` - Delete article
- `GET /api/education/categories` - Get article categories
- `GET /api/education/search` - Search articles
