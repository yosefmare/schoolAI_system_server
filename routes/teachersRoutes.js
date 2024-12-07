import { Router } from "express";
import { login } from "../controllers/teachersControllers.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";
import { addStudent } from "../controllers/teachersControllers.js";

const router = Router();

router.route('/login').post(login)
router.route("/addStudent").post(protect, isTeacher).post(addStudent)



export default router;