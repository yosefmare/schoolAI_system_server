import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/connectDB.js";
import teachersRoutes from "./routes/teachersRoutes.js";
import studentsRoutes from "./routes/studentsRoutes.js";


const app = express()


// Load environment variables from .env file
dotenv.config()

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()

// Routes
app.use("/api/teachers", teachersRoutes )
app.use("/api/students", studentsRoutes )


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));