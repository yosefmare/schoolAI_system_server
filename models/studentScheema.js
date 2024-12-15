import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, default: "student" },
  studentClass: { type: String, required: true },
  lesson: { type: String, required: true },
  grade: { type: Number, default: 0 },
});

StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
export default model("student", StudentSchema)