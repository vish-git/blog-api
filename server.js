require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler.middleware');
const authMiddleware = require('./src/middleware/auth.middleware');

const AuthController = require('./src/controllers/AuthController');
const PostController = require('./src/controllers/PostController');
const CommentController = require('./src/controllers/CommentController');
const commentSocket = require('./src/sockets/commentSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

// attach io to requests so controllers can emit events
app.use((req, res, next) => { req.io = io; next(); });

// Auth routes
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);

// Post routes
app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/posts', authMiddleware, PostController.createPost);

// Comment routes
app.get('/comments/:postId', CommentController.getComments);
app.post('/comments/:postId', authMiddleware, CommentController.addComment);

// Error handler
app.use(errorHandler);

// Socket handlers
commentSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
