# Nexora Healthcare Platform

A comprehensive digital healthcare platform for managing your health journey with AI-powered insights, medication tracking, and personalized care recommendations.

## Project Overview

Nexora is a full-stack healthcare application that provides:

- **Telemedicine**: Virtual consultations with healthcare providers
- **Symptom Checker**: AI-powered symptom analysis and recommendations
- **Medication Management**: Track medications and adherence
- **Health Monitoring**: Record and visualize health metrics
- **User Profiles**: Manage medical history and personal information
- **Health Education**: Access to health articles and resources

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/59dc16ba-40fc-4aed-91fb-5e4521abcd03) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to run the full-stack application:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Run the setup script to install all dependencies (frontend and backend).
.\setup.ps1

# Step 4: Start the full application (both frontend and backend).
npm run dev:full
```

Alternatively, you can run the frontend and backend separately:

```sh
# Run only the frontend
npm run dev

# Run only the backend
.\start-server.ps1
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technology Stack

### Frontend
- **Vite**: Fast build tool and development server
- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript
- **shadcn-ui**: High-quality UI components
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Query**: Data fetching and state management

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database (with fallback to in-memory storage for development)
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

## Architecture

Nexora follows a modern full-stack architecture:

1. **Frontend**: React single-page application (SPA) with component-based UI
2. **Backend API**: RESTful API built with Express
3. **Database**: MongoDB for persistent storage
4. **Authentication**: JWT-based authentication flow
5. **Services**: Modular service layer for business logic

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/59dc16ba-40fc-4aed-91fb-5e4521abcd03) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
