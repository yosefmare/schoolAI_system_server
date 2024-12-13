import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, default: "student" },
  studentClass: { type: String, required: true },
  lesson: { type: String, required: true },
  grade: { type: Number, default: 0 },
});

export default model("student", StudentSchema)