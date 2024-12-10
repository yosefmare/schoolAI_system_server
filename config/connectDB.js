import { connect } from "mongoose";



// Connect to MongoDB asynchronously in function
async function connectDB() {
  try {
    await connect(process.env.MONGODB_URI );
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export default connectDB;