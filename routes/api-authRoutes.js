import Router from 'express';
import { authController } from '../controllers/index.js';
import { checkAuth } from "../utils/index.js";
import { handleValidationErrors } from "../utils/index.js";
import { registerValedation, loginValedation } from "../validations/authValudation.js";

const router = new Router()


router.post("/api/register", registerValedation, handleValidationErrors, authController.createUser);
router.post("/api/login", loginValedation, handleValidationErrors, authController.authorization);
router.get("/api/auth", checkAuth, authController.getInforUsers);

export const authRouter = router;
 
 