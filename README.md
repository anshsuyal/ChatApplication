<div align="center">

# 💬 ChatApplication

### A Real-Time MERN Stack Messaging App

[![Stars](https://img.shields.io/github/stars/anshsuyal/ChatApplication?style=for-the-badge&color=yellow)](https://github.com/anshsuyal/ChatApplication/stargazers)
[![Forks](https://img.shields.io/github/forks/anshsuyal/ChatApplication?style=for-the-badge&color=blue)](https://github.com/anshsuyal/ChatApplication/network/members)
[![Made with MERN](https://img.shields.io/badge/stack-MERN-61DAFB?style=for-the-badge&logo=react)](#-tech-stack)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](#)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?logo=socket.io&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](#)

A full-stack, one-to-one **real-time chat application** built with the MERN stack and Socket.io — featuring live messaging, online presence, typing indicators, image sharing, and a polished dark/light UI.

[Live Demo](#-live-demo) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Reference](#-api-endpoints)

</div>

---

## 📖 Overview

**ChatApplication** is a full-stack real-time messaging platform inspired by modern chat apps. It allows users to sign up, log in securely, browse other registered users, and exchange text/image messages instantly using WebSockets.

The backend (Node.js + Express + Socket.io) handles authentication, message persistence, and real-time event broadcasting, while the frontend (React 19 + Redux Toolkit + Tailwind CSS) delivers a fast, responsive, theme-aware chat UI.

---

## ✨ Features

- 💬 **Real-time one-to-one messaging** powered by Socket.io
- 🟢 **Online/offline presence tracking** for all users
- ⌨️ **Live typing indicators** (`typing` / `stopTyping` socket events)
- 🔐 **Secure JWT authentication** stored in `httpOnly` cookies
- 🖼️ **Image sharing in chat** via Multer + Cloudinary
- 🙍 **Profile management** — update name, email, and avatar
- 🗑️ **Message deletion** (sender-only, enforced server-side)
- 😀 **Emoji picker** for expressive messaging
- 🌗 **Dark / Light theme toggle** with persisted context
- 🛡️ **Protected routes** on the frontend via React Router
- 🗂️ **Centralized state management** with Redux Toolkit

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Redux Toolkit, React Router DOM, Tailwind CSS, Axios, Socket.io-client, emoji-picker-react, react-icons |
| **Backend** | Node.js, Express 5, Socket.io |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) + `httpOnly` cookies, bcryptjs for password hashing |
| **File Storage** | Multer (upload handling) + Cloudinary (image hosting/CDN) |
| **Deployment** | Vercel (separate deployments for `frontend/` and `backend/`) |

---

## 📁 Project Structure

```
ChatApplication/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary upload config
│   │   ├── db.js               # MongoDB connection
│   │   └── token.js            # JWT generation
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   ├── message.controllers.js
│   │   └── user.controllers.js
│   ├── middlewares/
│   │   ├── isAuth.js           # JWT verification middleware
│   │   └── multer.js           # File upload middleware
│   ├── models/
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   ├── socket/
│   │   └── socket.js           # Socket.io server & event handlers
│   ├── public/                 # Temp storage for Multer uploads
│   ├── .env.example
│   ├── index.js                # App entry point
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── component/
│   │   │   ├── MessageArea.jsx
│   │   │   ├── ReceiverMessage.jsx
│   │   │   ├── SenderMessage.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── useTheme.js
│   │   ├── customHooks/
│   │   │   ├── getCurrentUser.jsx
│   │   │   ├── getMessages.jsx
│   │   │   └── getOtherUser.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SignUp.jsx
│   │   ├── redux/
│   │   │   ├── messageSlice.js
│   │   │   ├── store.js
│   │   │   └── userSlice.js
│   │   ├── utils/
│   │   │   └── messageUtils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md
```

---

## 🖼️ Screenshots

> Replace these placeholders with actual screenshots/GIFs of the app.

| Login | Chat Window | Profile |
|-------|-------------|---------|
| ![Login Screenshot](./screenshots/login.png) | ![Chat Screenshot](./screenshots/chat.png) | ![Profile Screenshot](./screenshots/profile.png) |

---

## ⚙️ Installation

This is a **two-part project** — backend and frontend are separate apps that run independently.

### 1. Clone the repository

```bash
git clone https://github.com/anshsuyal/ChatApplication.git
cd ChatApplication
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in your real values
npm run dev
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API/socket requests to the backend during development.

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/` (use `backend/.env.example` as a starting point):

```env
PORT=8000
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
NODE_ENV=development
CLIENT_URL="http://localhost:5173"
```

| Variable | Description |
|----------|--------------|
| `PORT` | Port the Express server listens on |
| `MONGODB_URL` | MongoDB Atlas/local connection string |
| `JWT_SECRET` | Secret key used to sign/verify JWTs |
| `CLOUD_NAME` | Cloudinary cloud name (for image uploads) |
| `API_KEY` | Cloudinary API key |
| `API_SECRET` | Cloudinary API secret |
| `NODE_ENV` | `development` or `production` (controls cookie `secure` flag) |
| `CLIENT_URL` | Frontend origin, used for CORS and Socket.io CORS config |

The frontend also expects an API base URL, read via `import.meta.env.VITE_API_URL`. Create a `.env` file in `frontend/`:

```env
VITE_API_URL="http://localhost:8000"
```

---

## 📜 Available Scripts

**Backend** (`backend/package.json`):

```bash
npm run dev     # Starts the server with nodemon (auto-restart on changes)
npm start       # Starts the server with plain node (production)
```

**Frontend** (`frontend/package.json`):

```bash
npm run dev       # Starts the Vite development server
npm run build     # Builds an optimized production bundle into dist/
npm run preview   # Serves the production build locally for testing
npm run lint      # Runs ESLint across the codebase
```

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/auth/signup` | Register a new user (`userName`, `email`, `password`) |
| `POST` | `/api/auth/login` | Log in with `email` + `password`, sets JWT cookie |
| `POST` | `/api/auth/logout` | Clears the auth cookie |

### User — `/api/user` *(requires auth)*

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/api/user/current` | Get the logged-in user's profile |
| `GET` | `/api/user/others` | Get all other registered users |
| `PUT` | `/api/user/profile` | Update `name`, `email`, and/or profile `image` (multipart) |

### Message — `/api/message` *(requires auth)*

| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/message/send/:receiver` | Send a text and/or image message to a user |
| `GET` | `/api/message/get/:receiver` | Get the full conversation with a specific user |
| `DELETE` | `/api/message/:id` | Delete a message (only the original sender can delete it) |

### Socket.io Events

| Event | Direction | Purpose |
|-------|-----------|---------|
| `connection` (with `userId` query) | Client → Server | Registers a user's active socket |
| `getOnlineUsers` | Server → Client | Broadcasts the current list of online user IDs |
| `typing` / `stopTyping` | Bi-directional | Relays typing status to the relevant chat partner |
| `newMessage` | Server → Client | Pushes a new message to the receiver in real time |
| `messageDeleted` | Server → Client | Syncs message deletion across both clients |
| `disconnect` | Client → Server | Removes the user from the online users map |

---

## 🗄️ Database Schema

**User**
```js
{ name, userName (unique), email (unique), password (hashed), image, timestamps }
```

**Message**
```js
{ sender: ObjectId(User), receiver: ObjectId(User), message, image, timestamps }
```

**Conversation**
```js
{ participants: [ObjectId(User)], messages: [ObjectId(Message)], timestamps }
```

**Relationships:** Each `Conversation` links exactly two `User` participants and holds an array of `Message` references. Every `Message` independently references its `sender` and `receiver`, so messages remain queryable even outside the conversation thread.

---

## ☁️ Deployment Guide

The repo already includes `vercel.json` in both `frontend/` and `backend/`, so deployment to **Vercel** is the most direct path:

1. **Database:** Create a free MongoDB Atlas cluster and whitelist `0.0.0.0/0` (or Vercel's IPs) for access.
2. **Backend:**
   - Import the `backend/` folder as a separate Vercel project.
   - Add all backend environment variables (`MONGODB_URL`, `JWT_SECRET`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `CLIENT_URL`, `NODE_ENV=production`) in Vercel's dashboard.
   - Deploy and copy the resulting backend URL.
3. **Frontend:**
   - Import the `frontend/` folder as another Vercel project.
   - Set `VITE_API_URL` to your deployed backend URL.
   - Deploy and copy the resulting frontend URL.
4. **Final step:** Update `CLIENT_URL` on the backend project to match your live frontend URL (for CORS + Socket.io to work), then redeploy the backend.

> ⚠️ Note: Vercel's serverless functions don't natively support persistent WebSocket connections at scale. For production-grade real-time reliability, consider **Render** or **Railway** for the backend instead.

---

## ⚡ Performance Optimizations

- **Code-splitting:** Manual Vite chunking (`vendor`, `redux`, `ui`) to reduce initial bundle size.
- **CDN-hosted media:** Images are offloaded to Cloudinary instead of being served from the app server.
- **Targeted Socket.io emits:** Messages and typing events are sent only to the relevant receiver's socket, not broadcast to all clients.
- **Memoized selectors:** Derived values (like online status) are memoized with `useMemo` to avoid unnecessary re-renders.

---

## 🔮 Future Improvements

- [ ] Add **pagination/infinite scroll** for conversations instead of loading the full message history at once
- [ ] Add **MongoDB indexes** on `participants`, `sender`, and `receiver` for query performance at scale
- [ ] Add a **request validation layer** (e.g. Zod/Joi) on signup, login, and message routes
- [ ] Stop returning raw internal error messages in API responses — return generic messages to clients and log details server-side
- [ ] Add **rate limiting** and `helmet` for production hardening
- [ ] Add **automated tests** (unit + integration) — currently none exist
- [ ] Add **group chat** support and **message read receipts**
- [ ] Add **CI/CD** (lint + test on every PR)
---

## 👤 Author

**Ansh Suyal**
Full Stack Developer (MERN) · Final-Year BCA Student, Graphic Era Hill University

- 💻 GitHub: [@anshsuyal](https://github.com/anshsuyal)
- 🔗 LinkedIn: www.linkedin.com/in/ansh-sharma-14072005w22
- 📧 Email: sharmaansh9386@gmail.com
- 🌐 Portfolio: anshusuyalportfolio.vercel.app

> Passionate about building real-time, production-ready web applications with the MERN stack. Open to internship and entry-level Full Stack Developer opportunities.

---

<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
