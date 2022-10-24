import Router from 'express';
import { checkAuth } from "../service/checkAuth.js";
import { handleValidationErrors } from "../service/handleValidationErrors.js";
import AuthController from '../controllers/api-auth-controlers.js';
import { registerValedation, loginValedation } from "../validations/authValudation.js";
const router = new Router()


router.post("/api/register", registerValedation, handleValidationErrors, AuthController.createUser);
router.post("/api/login", loginValedation, handleValidationErrors, AuthController.authorization);
router.get("/api/auth", checkAuth, AuthController.getInforUsers);

export default router; 
 