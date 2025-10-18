# 🚀 DevConnect Frontend Microservice

**DevConnect** is a professional networking platform built exclusively for developers — think of it as "LinkedIn for Devs." This repository contains the **frontend microservice**, built using **React.js**, **Tailwind CSS**, **Redux Toolkit** for state management, **React Router DOM**, and **Socket.IO Client** for real-time communication. It integrates seamlessly with the DevConnect Backend Microservice.

---

## ⚙️ Tech Stack

- ⚛️ **React.js** – Frontend framework
- 🎨 **Tailwind CSS** – Utility-first CSS styling
- 🔁 **Redux Toolkit** – Scalable state management
- 🌐 **React Router DOM** – Client-side routing
- 📡 **Axios** – API communication with backend
- 🔌 **Socket.IO Client** – Real-time WebSocket communication
- 💾 **localStorage** – JWT token persistence

---

## ✨ Features

### 1. 🛂 Authentication

- **Login**: Users can log in using email and password.
- **Signup**: New users can create an account by entering details and uploading a profile picture.
- **JWT Token**: On successful login/signup, JWT token is stored in **localStorage** for persistent authentication.
- **Authorization Header**: All API requests include `Bearer <token>` in the Authorization header.
- **Auto-login**: Token verified on app load to automatically authenticate returning users.
- On successful authentication, users are redirected to the Feed page.

### 2. 📰 Feed Page (/)

- Users see developer profile cards (excluding their own and existing connections).
- **Pagination**: Loads 10 developer profiles at a time for optimal performance.
- Options per card:
  - ✅ **Send Connection Request**
  - ❌ **Skip to Next Developer**
  - 💬 **Send Message** (adds user to chat list without connection)
- Cards are dynamically rendered one at a time.
- Automatically loads next batch when current batch is exhausted.

### 3. 👤 Profile Page

- View and edit your profile details, bio, and profile picture.
- Option to upgrade/change password securely.
- Profile updates synced with backend via Cloudinary for image storage.

### 4. 🤝 Requests Page

- View all incoming connection requests with sender details.
- Accept ✅ or Reject ❌ requests directly from this page.
- Real-time updates when new requests arrive.

### 5. 🔗 Connections Page

- View all accepted developer connections.
- See connection details: name, age, skills, about.
- Option to remove connections from your list.
- Navigate to chat with any connection.

### 6. 💬 Chat Feature ✨ *NEW*

Real-time messaging system powered by **Socket.IO Client** for instant developer-to-developer communication.

#### Key Features:
- **Real-Time Messaging**: Send and receive messages instantly without page refresh.
- **Online/Offline Status**: See which connections are currently online with visual indicators.
- **Message History**: All messages persisted and retrieved from backend.
- **Image Sharing**: Send images in chat using Cloudinary integration.
- **Chat List**: 
  - Shows all accepted connections
  - Shows users with message history (even if not connected)
  - Sorted by recent activity
- **Dual Chat Views**:
  - **ChatPage**: List of all chat users (mobile-friendly)
  - **ChatContainer**: Full conversation view with message input
- **Socket Events**:
  - Auto-connects on login with userId
  - Listens for `newMessage` events for real-time delivery
  - Listens for `getOnlineUsers` to update online status
  - Auto-disconnects on logout/unmount

#### Chat Components:
- **ChatPage.jsx**: Displays list of all available chat users
- **ChatContainer.jsx**: Full chat interface with message history and send functionality
- **Message Components**: Display text and image messages with timestamps

### 7. 🔓 Logout

- User can log out, which:
  - Clears JWT token from localStorage
  - Disconnects Socket.IO connection
  - Clears Redux state
  - Redirects to login page

---

## 📦 State Management (Redux Toolkit)

Centralized app store via `configureStore`.

### Redux Slices:

1. **userSlice**: 
   - `addUser`, `removeUser`
   - Stores logged-in user data

2. **feedSlice**: 
   - `addFeed`, `removeFeedCard`
   - Manages paginated feed of developers

3. **requestsSlice**: 
   - `addRequests`, `removeRequests`
   - Manages incoming connection requests

4. **connectionsSlice**: 
   - `addConnections`, `removeConnections`
   - Manages accepted connections list

5. **chatsSlice**: ✨ *NEW*
   - `addChatUser`, `removeChatUser`, `setChats`
   - Manages chat users list (connections + message history users)

6. **selectedUserSlice**: ✨ *NEW*
   - `setSelectedUser`, `clearSelectedUser`
   - Tracks currently selected chat user

7. **socketSlice**: ✨ *NEW*
   - `connectSocket`, `disconnectSocket`, `setOnlineUsers`
   - Manages Socket.IO connection and online users state
   - Stores socket instance in Redux for global access

### Socket.IO Integration:

- **Connection Management**: Socket connects on user login with userId in query params
- **Event Listeners**: 
  - `newMessage`: Receives real-time messages
  - `getOnlineUsers`: Updates online users array
- **Cleanup**: Socket disconnects on logout or component unmount
- **Global Access**: Socket instance stored in Redux for use across components

---

## 📁 Folder Structure

```
DevConnect_Frontend_Microservice/
├── components/
│   ├── Feed.jsx
│   ├── Profile.jsx
│   ├── Requests.jsx
│   ├── Connections.jsx
│   ├── ChatPage.jsx           # ✨ NEW
│   ├── ChatContainer.jsx      # ✨ NEW
│   ├── UserCard.jsx
│   ├── Body.jsx
│   ├── EditPassword.jsx
│   ├── EditProfile.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── NavBar.jsx
│   ├── BottomNavigation.jsx   # ✨ NEW
│   └── Footer.jsx
├── utils/
│   ├── appStore.js
│   ├── axiosInstance.js
│   ├── userSlice.js
│   ├── feedSlice.js
│   ├── requestsSlice.js
│   ├── connectionsSlice.js
│   ├── chatsSlice.js          # ✨ NEW
│   ├── selectedUserSlice.js   # ✨ NEW
│   └── socketSlice.js         # ✨ NEW
├── App.jsx
└── main.jsx
```

---

## 🔐 Protected Routes & Auth Flow

### Authentication System:
- JWT token stored in **localStorage** as `authToken`
- All protected API requests include `Authorization: Bearer <token>` header
- Token verified on app initialization via `/profile/view` endpoint
- Invalid/expired tokens trigger redirect to login page

### Protected Routes:
Only authenticated users can access:
- `/` (Feed)
- `/profile` (Profile)
- `/requests` (Connection Requests)
- `/connections` (Connections)
- `/chats` (Chat List) ✨ *NEW*
- `/chatcontainer` (Chat Interface) ✨ *NEW*

If unauthenticated, users are automatically redirected to `/login`.

### Socket.IO Connection:
- Socket connects automatically on successful authentication
- Uses userId from Redux user state for identification
- Maintains persistent connection during session
- Automatically reconnects on network interruptions

---

## 🌐 API Integration

### Base URL Configuration:
- **Development**: `http://localhost:3000`
- **Production**: `https://dev-connect-backend.onrender.com`

### API Endpoints Used:

#### Authentication:
- `POST /auth/login` – Login with credentials
- `POST /auth/signup` – Register new user
- `GET /profile/view` – Get logged-in user profile

#### Profile:
- `PATCH /profile/edit` – Update user profile
- `PATCH /profile/password` – Change password

#### Feed & Connections:
- `GET /users/feed?page=1&limit=10` – Get paginated feed
- `POST /request/send/:status/:userId` – Send connection request
- `GET /user/requests/received` – Get connection requests
- `GET /user/connections` – Get accepted connections
- `DELETE /user/deleteconnection/:userId` – Remove connection

#### Messages: ✨ *NEW*
- `GET /message/connections` – Get all chat users
- `GET /message/:userToChatId` – Get message history
- `POST /message/:receiverId` – Send message (text/image)

---

## 🌟 Highlights

- ⚡️ **Fast and responsive UI** with Tailwind CSS
- 🔄 **Centralized and clean state** with Redux Toolkit
- 🔗 **Smooth integration** with backend microservice
- 📸 **Profile uploads** synced with backend using Cloudinary
- 🔐 **Secure auth flow** using JWT Bearer tokens in localStorage
- 💬 **Real-time messaging** with Socket.IO Client for instant communication
- 👥 **Online status tracking** for all connections
- 📱 **Mobile-responsive design** with bottom navigation
- 🎯 **Optimized performance** with paginated feed loading
- 🖼️ **Image sharing** in chats with Cloudinary integration
- 🔌 **Persistent WebSocket connection** with auto-reconnect

---

## 🚀 Recent Updates

### ✅ Real-Time Chat System
- **Socket.IO Client integration** for bidirectional real-time communication
- **Online/offline status tracking** with visual indicators
- **Instant message delivery** without page refresh
- **Message history persistence** retrieved from backend
- **Image sharing capability** in chats
- **Chat user management** in Redux state
- **Dedicated chat pages** for list view and conversation view

### ✅ Authentication Enhancement
- **Migrated from HTTP-only cookies to JWT in localStorage**
- **Bearer token authorization** for all API requests
- **Auto-login on app load** with token verification
- **Improved security** with token expiration handling

### ✅ Feed Pagination
- **Lazy loading** of developer profiles (10 at a time)
- **Automatic next batch loading** when current batch exhausted
- **Improved performance** for large user databases

### ✅ UI/UX Improvements
- **Bottom navigation** for mobile devices
- **Responsive design** for all screen sizes
- **Loading states** for better user feedback
- **Error handling** with user-friendly messages

---

## 🎯 Socket.IO Implementation Details

### Connection Flow:
1. User logs in successfully
2. `connectSocket(userId)` action dispatched from Redux
3. Socket connects to backend with userId in handshake query
4. Socket stored in Redux `socketSlice` for global access
5. Event listeners registered for `newMessage` and `getOnlineUsers`
6. On logout/unmount, `disconnectSocket()` cleans up connection

### Real-Time Features:
- **Instant Message Delivery**: Messages appear immediately in both sender and receiver chat
- **Online Users Update**: Green dot indicator shows online connections
- **Auto-Reconnection**: Socket.IO handles network interruptions gracefully
- **Typing Indicators**: Foundation ready for future implementation

### Code Example:
```javascript
// Socket connection in App.jsx
useEffect(() => {
  if (user && !window.socketConnected) {
    dispatch(connectSocket(user._id));
    window.socketConnected = true;
  }
  
  return () => {
    dispatch(disconnectSocket());
    window.socketConnected = false;
  };
}, [user]);
```

---

## 🔮 Future Enhancements

- 🔔 **Push Notifications** for new messages and connection requests
- ✍️ **Typing Indicators** in chat interface
- ✅ **Read Receipts** for messages
- 🎤 **Voice Messages** support
- 📹 **Video Call** integration
- 👥 **Group Chat** for developer communities
- 🔍 **Search & Filter** in chat list
- 📌 **Pin Important Chats** for quick access
- 🌙 **Dark Mode** toggle
- 📊 **Message Analytics** (sent/received stats)

---

## 💡 Key Technical Decisions

### Why localStorage for JWT?
- More flexible than HTTP-only cookies for mobile apps
- Easier to implement with Socket.IO authentication
- Simpler CORS handling
- Client-side token management

### Why Socket.IO?
- Bidirectional real-time communication
- Auto-reconnection on network failures
- Fallback mechanisms (polling if WebSocket unavailable)
- Easy integration with Redux

### Why Redux Toolkit?
- Simplified Redux setup with less boilerplate
- Built-in immutable state updates with Immer
- Integrated Redux DevTools support
- Better TypeScript support for future migration

---

## 📝 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

---

## 🛠️ Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "axios": "^1.x",
  "socket.io-client": "^4.x",
  "tailwindcss": "^3.x"
}
```

---

## ✍️ Author

**Shourya Jain**

---

## 📄 License

This project is open source and available for educational purposes.