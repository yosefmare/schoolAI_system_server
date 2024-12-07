import expressAsyncHandler from "express-async-handler";
import signToken from "../utils/signToken.js";
import Teacher from "../schemas/teachersSchema.js";
import Student from "../schemas/studentScheema.js"

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
  const { name, email, password, role, studentClass, grade } = req.body;

  // Check if the student already exists by email
  const isRegistered = await Student.findOne({ password }); // Fix: Check by email, not password

  if (!isRegistered) {
    // Create a new student
    const newStudent = new Student({
      name,
      email,
      password,
      role,
      studentClass,
      grade
    });

    const student = await newStudent.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        _id: student._id,
        name: student.name,
        studentClass: student.studentClass,
        token: signToken(student._id, student.role),
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