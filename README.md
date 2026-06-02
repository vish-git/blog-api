# Real-Time Blog API

A simple, modular Node.js backend for a blog with authentication, posts, comments, and real-time comment updates via Socket.IO. Designed for clarity and easy extension: add validation, rate limiting, caching, or a frontend client quickly.

---

## Features

- User authentication with JWT tokens  
- Create, read posts with tags and author info  
- Add and list comments per post  
- Real-time comments broadcast to viewers of the same post via Socket.IO rooms  
- Clear separation of concerns: models, repositories, services, controllers, middleware, sockets  
- Error handling middleware and simple auth middleware  

---

## Quick Start

### Requirements

- Node.js v16+  
- MongoDB (local or remote)  
- Basic familiarity with terminal and npm  

---

## Install

```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

---

## Environment

Create a `.env` file in the project root:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your_jwt_secret_here
```

---

## Run (development)

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## API Reference

### Auth

**POST /auth/register**  
Register user  
Body:
```json
{ "username": "...", "email": "...", "password": "..." }
```

Success: 201 → `{ user, token }`

---

**POST /auth/login**  
Login user  
Body:
```json
{ "email": "...", "password": "..." }
```

Success: 200 → `{ user, token }`

---

### Posts

**GET /posts**  
List posts  
Query: `?limit=&skip=`

---

**GET /posts/:id**  
Get single post  

---

**POST /posts (protected)**  
Headers: `Authorization: Bearer <token>`  
Body:
```json
{ "title": "...", "content": "...", "tags": ["..."] }
```

---

### Comments

**GET /comments/:postId**  
List comments  

---

**POST /comments/:postId (protected)**  
Body:
```json
{ "comment": "Nice post!" }
```

Side effect: emits `newComment` via Socket.IO room = postId

---

## Real-Time (Socket.IO)

### Client emits
- `joinPost` → join room  
- `leavePost` → leave room  

### Server emits
- `newComment` → broadcast to post room  

---

## Minimal Client Example

```js
const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  socket.emit("joinPost", "<POST_ID>");
});

socket.on("newComment", (comment) => {
  console.log("newComment", comment);
});
```

---

## Testing Flow

1. Register user  
2. Login and get token  
3. Create post  
4. Open two socket clients and join same post  
5. Add comment → both clients receive update  

---

## Project Structure

```
src/
├─ controllers/
├─ services/
├─ repositories/
├─ models/
├─ middleware/
├─ sockets/
├─ routes/
└─ server.js
```

---

## Deployment Notes

- Use environment variables for secrets  
- Use MongoDB Atlas or managed DB  
- Use Redis adapter for Socket.IO scaling  
- Enable HTTPS in production  
- Rotate JWT secrets periodically  

---

## Contributing

- Fork repo  
- Create feature branch  
- Add tests if possible  
- Submit PR  

---

## License

Add MIT / Apache-2.0 / custom license as needed.
