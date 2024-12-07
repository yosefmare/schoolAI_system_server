import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import Teacher from "../schemas/teachersSchema.js";


const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.teacher = await Teacher.findById( decoded.id );
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Token Faild!");
    }
  }
  if (!token) {
    res.status(401).json({ msg: "You are not logged in!" });
  }
});

const isTeacher = (req, res, next) => {
  if (req.teacher && req.teacher.role) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized as an admin" });
  }
};

export {
  protect, isTeacher
};