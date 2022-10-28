import Router from 'express';
import { handleValidationErrors } from "../service/handleValidationErrors.js";
import { checkAuth } from "../service/checkAuth.js";
import { commentController } from '../controllers/api-comment-controllers.js';
import { commentValedation } from '../validations/commentValidation.js';
const router = new Router()


router.post("/api/comments", checkAuth, commentValedation, handleValidationErrors, commentController.create);
router.get("/api/comments", commentController.getAll); 
router.get("/api/comments/:id", commentController.getOne);
router.delete("/api/comments/:id", checkAuth, commentController.remove);
router.patch("/api/comments/:id", checkAuth, commentValedation, handleValidationErrors,commentController.update);


export const commentRouter = router;