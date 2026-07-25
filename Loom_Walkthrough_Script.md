# Loom Walkthrough Script: LeadDesk Mini

**Duration Goal: 5 Minutes**

### [0:00 - 0:30] Introduction & Landing Page
"Hi, my name is [Your Name], and this is LeadDesk Mini—a full-stack CRM built with the MERN stack. 
We're currently looking at the Landing Page. I designed this to feel like a premium SaaS product with a modern, clean aesthetic using Tailwind CSS. 
It features a clear Hero section, value propositions, and a lead capture form."

### [0:30 - 1:15] Submitting a Lead & Frontend Validation
"Let's submit a lead. You'll notice I'm using React Hook Form combined with Zod for strict validation. 
If I try to submit an empty form, it instantly catches the errors without refreshing the page. 
Let me fill this out correctly... [Fill out form]. 
When I hit submit, we get a nice React Hot Toast success message, and the form resets. Behind the scenes, this sent a POST request to our Node/Express backend."

### [1:15 - 2:00] Admin Login & Security
"Now, let's head over to the Admin Dashboard. 
I'll log in using the credentials we created via our backend seed script. 
Security is a priority here: the password is hashed with bcrypt, and upon successful login, the server issues an HTTP-only JSON Web Token (JWT) cookie. 
This means our token isn't exposed to cross-site scripting attacks. I've also implemented Helmet and CORS on the backend."

### [2:00 - 3:00] Admin Dashboard & Optimistic UI
"Welcome to the Dashboard. Here we have some quick analytics pulled from the database.
If we navigate to the 'Leads' page, you'll see the lead we just created!
Notice how smooth the UI is. If I change the status of this lead from 'New' to 'Contacted', it updates instantly on the screen—this is an Optimistic UI update, providing immediate feedback to the user while the API call finishes in the background."

### [3:00 - 4:00] Search, Filter, and Export
"As the database grows, finding leads is crucial. 
I've built a real-time search that debounces the user's input—meaning it doesn't spam the server with requests on every keystroke. It waits until you stop typing.
We can also filter by status. 
And as a bonus feature, I've added a frontend CSV export. Clicking this button takes the currently loaded data and downloads it as a CSV file for your team."

### [4:00 - 4:45] Codebase & Architecture
"Briefly looking at the code, it's structured in a clean MVC architecture on the backend, using Mongoose for our models and Express Validator for server-side validation to ensure we never trust the client.
On the frontend, we're using React 19 with Vite, structured with custom hooks like `useAuth` and reusable UI components. It's completely responsive and mobile-ready."

### [4:45 - 5:00] Deployment & Conclusion
"Finally, the app is fully deployed. The Express backend is running on Render, connected to a MongoDB Atlas cluster, and the React frontend is hosted on Vercel. 
That's LeadDesk Mini. Thank you for watching!"
