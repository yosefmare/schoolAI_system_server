import { Schema, model } from "mongoose";

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher"},
});

export default model("teacher", TeacherSchema)
