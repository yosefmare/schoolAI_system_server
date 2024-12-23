import expressAsyncHandler from "express-async-handler";
import signToken from "../utils/signToken.js";
import Teacher from "../models/teachersSchema.js";
import Student from "../models/studentScheema.js"

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email, password });

  if (teacher) {
    res.status(200).json({
      message: "Logged in successfully",
      teacher: {
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
        token: signToken(teacher._id, teacher.role)
      }
    })
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }
})

const addStudent = expressAsyncHandler(async (req, res) => {
  const { name, password, role, studentClass, grade, lesson} = req.body;

  const isRegistered = await Student.findOne({ password }); // Fix: Check by email, not password

  if (!isRegistered) {
    const newStudent = new Student({
      name,
      password,
      role,
      studentClass,
      grade,
      lesson,
    });

    const student = await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        _id: student._id,
        name: student.name,
        studentClass: student.studentClass,
        token: signToken(student._id, student.role) 
      }
    });
  } else {
    res.status(409).json({ message: "Student already exists" });
  }
});
export {
  login,
  addStudent
}