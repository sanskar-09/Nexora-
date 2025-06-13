# Auth System

This project implements a user authentication system allowing users to sign up, log in, and manage their accounts. It utilizes Express.js for the server framework and JSON Web Tokens (JWT) for secure authentication.

## Features

- User sign-up
- User login
- Password reset
- User account management (fetch, update, delete)

## Technologies Used

- Node.js
- Express.js
- TypeScript
- JSON Web Tokens (JWT)
- (Optional) A database of your choice (e.g., MongoDB, PostgreSQL)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- A package manager (npm or yarn)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd auth-system
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The application will be running on `http://localhost:3000` (or the port specified in your configuration).

### API Endpoints

- **Authentication Routes**
  - `POST /api/auth/signup` - Sign up a new user
  - `POST /api/auth/login` - Log in an existing user
  - `POST /api/auth/reset-password` - Reset user password

- **User Routes**
  - `GET /api/users/:id` - Fetch user details
  - `PUT /api/users/:id` - Update user information
  - `DELETE /api/users/:id` - Delete user account

## License

This project is licensed under the MIT License.