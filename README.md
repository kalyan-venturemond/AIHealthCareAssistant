# AI HealthCare Assistant (Frontend Only)

This repository contains the frontend application for the AI HealthCare Assistant.
It has been optimized for Vercel deployment and decoupled from the backend services.

## Features
- **Frontend Only**: All backend logic has been mocked for demo purposes.
- **Vercel Ready**: Configured for continuous deployment.
- **Mock Data**: Uses `axios-mock-adapter` to simulate API responses.

## Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Locally**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

Connect this repository to Vercel. select "Create React App" as the framework preset (automatic).
The build command `npm run build` and output directory `build` will be automatically detected.

## Notes
- Backend services (Blockchain, Python, Server) have been removed.
- API calls are intercepted by `src/mock-api.js` and return static JSON data.
