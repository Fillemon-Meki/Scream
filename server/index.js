import express from "express";
import cors from "cors";
import http from "http";
const socketIO = require("socket.io"); // Use CommonJS syntax for 'socket.io'
import User from "./mongodb/models/register.js";
import connectDB from "./mongodb/connection.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to protect routes (authorization)
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ success: false, message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Register a new user
app.post("/api/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.lastLogin !== null).length;

    res.status(200).json({
      success: true,
      data: users,
      totalUsers: totalUsers,
      activeUsers: activeUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a user
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Default route
app.use("/", (req, res) => {
  res.send("Hello, this is the backend");
});

// WebSocket server setup
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

// Store connected clients (users) and their sockets
const connectedUsers = new Map();

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle location updates from clients
  socket.on("location-update", async (location) => {
    try {
      const { userId, latitude, longitude } = location;

      // Store the location data in the database, associated with the user's unique identifier (userId)
      // Replace this with your logic to update the user's location in the database
      // For example, you can use the User.findByIdAndUpdate() method

      // Broadcast the updated location to all connected clients (users) except the sender
      socket.broadcast.emit("location-update", { userId, latitude, longitude });
    } catch (error) {
      console.error("Error updating location:", error.message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the disconnected user from the connectedUsers map
    for (const [userId, userSocket] of connectedUsers.entries()) {
      if (userSocket === socket) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});
