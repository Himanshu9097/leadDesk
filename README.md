# LeadDesk Mini

A production-ready MERN stack CRM and Lead Management application. It features a public-facing landing page to capture leads and a secure Admin Dashboard to manage them.

## Tech Stack
**Frontend:** React 19, Vite, React Router DOM, Tailwind CSS, Zod, React Hook Form, React Three Fiber (for 3D assets), GSAP (for animations).
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT Auth, Helmet, Express Validator.

---

## Deliverables & Setup

### 1. Test Credentials
To access the Admin Dashboard, navigate to `/admin/login` and use the following credentials:
- **Email:** `admin@example.com`
- **Password:** `admin123`

*(Note: If the database is completely empty, you can register a new admin by navigating to `/admin/register` first).*

### 2. Loom Walkthrough Instructions
To create your Loom walkthrough video, we recommend covering the following flow:
1. **Landing Page:** Show the public landing page with its beautiful Beige & Forest Green aesthetic, including the 3D rotating sphere.
2. **Form Submission:** Fill out the contact form with a test lead (Name, Email, Budget in ₹ Rupees, Message). Click submit and mention that this sends data to both the local DB and the configured Formspree endpoint.
3. **Admin Login:** Navigate to the admin portal (`/admin/login`) and log in using the test credentials above.
4. **Dashboard:** Show the LeadDesk Admin Dashboard where the newly captured lead appears. Demonstrate the ability to view leads and change their status (New -> Contacted -> Closed).

### 3. Deployment Guide

**Vercel**
1. Connect the repository root to Vercel, not just the `client` folder.
2. Keep the root-level `vercel.json` so Vercel serves the React app and the `/api` serverless function together.
3. Vercel will run the client build command from `vercel.json`: `npm --prefix client run build`.
4. Add these Environment Variables in Vercel:
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_secure_random_string`
   - `CLIENT_URL=https://your-vercel-domain.vercel.app` if the frontend and API are on different domains
5. If you deploy the frontend separately from the API, also set `VITE_API_URL` to the deployed API base URL.

**Important**
- If you previously set `MONGO_URI`, the app will now still accept it, but `MONGODB_URI` is the preferred name.
- Registration will fail until MongoDB, JWT, and the deployed API URL are all configured correctly.

---

## Local Development

1. **Install dependencies:**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. **Setup environment variables:**
   - In `server`, copy `.env.example` to `.env` and fill in your `MONGODB_URI` and `JWT_SECRET`.

3. **Start the development servers:**
   ```bash
   # Terminal 1: Start the backend
   cd server && npm run dev
   
   # Terminal 2: Start the frontend
   cd client && npm run dev
   ```
