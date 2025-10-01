🚀 DevConnect Frontend Microservice

DevConnect is a professional networking platform built exclusively for developers — think of it as "LinkedIn for Devs." This repository contains the frontend microservice, built using React.js, Tailwind CSS, Redux JS (via Redux Toolkit) for state management, and React Router DOM, and integrates seamlessly with the DevConnect Backend Microservice.


⚙️ Tech Stack

⚛️ React.js – Frontend framework

🎨 Tailwind CSS – Utility-first CSS styling

🔁 Redux Toolkit – Scalable state management

🌐 React Router DOM – Client-side routing

📡 Axios – API communication with backend

✨ Features
1. 🛂 Authentication

Login: Users can log in using email and password.

Signup: New users can create an account by entering details and uploading a profile picture.

On successful login/signup, users are redirected to the Feed page.

2. 📰 Feed Page (/)

Users see developer profile cards (excluding their own).

Options:

✅ Send Connection Request

❌ Skip to Next Developer

Cards are dynamically rendered one at a time.

3. 👤 Profile Page

View and edit your profile details, bio, and profile picture.

Option to upgrade/change password securely.

4. 🤝 Requests Page

View all incoming connection requests.

Accept ✅ or Reject ❌ requests directly from this page.

5. 🔗 Connections Page

View all accepted developer connections.

Option to remove connections from your list.

6. 🔓 Logout

User can log out, which clears session data and redirects to the login page.

📦 State Management (Redux Toolkit)

Centralized app store via configureStore.

Four core Redux Slices:

userSlice: addUser, removeUser

feedSlice: addFeedCard, removeFeedCard

requestsSlice: addRequests, removeRequests

connectionsSlice: addConnections, removeConnections

API data from the backend is fetched via Axios, then stored using relevant slice actions.

📁 Folder Structure (Simplified)
DevConnect_Frontend_Microservice/
├── components/
│   ├── Feed.jsx
│   ├── Profile.jsx
│   ├── Requests.jsx
│   ├── Connections.jsx
│   └── UserCard.jsx
│   └── Body.jsx
│   └── EditPassword.jsx
│   └── EditProfile.jsx
│   └── Login.jsx
│   └── Signup.jsx
│   └── NavBar.jsx
│   └── Footer.jsx
├── utils/
│   ├── store.js
│   ├── userSlice.js
│   ├── feedSlice.js
│   ├── requestsSlice.js
│   └── connectionsSlice.js
├── App.jsx
├── Main.jsx

🔐 Protected Routes & Auth Flow

Only authenticated users (verified via cookies/token from backend) can access:

Feed

Profile

Requests

Connections

If unauthenticated, users are redirected to the login page.


🌟 Highlights

⚡️ Fast and responsive UI with Tailwind

🔄 Centralized and clean state with Redux Toolkit

🔗 Smooth integration with backend microservice

📸 Profile uploads synced with backend using Cloudinary via Multer

🔐 Secure auth flow using HTTP-only cookies


📍 Future Plans

💬 Real-time Chat Feature using Socket.IO (backend support coming soon)

🔔 Notification System for new requests and accepted connections

