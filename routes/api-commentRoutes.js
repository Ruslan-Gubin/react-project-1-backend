import Router from 'express';
import { checkAuth } from "../utils/index.js";
import { handleValidationErrors } from "../utils/index.js";
import { commentController } from '../controllers/index.js';
import { commentValedation } from '../validations/commentValidation.js';

const router = new Router()

router.route('/api/comments')
.get(commentController.getAll)
.post(checkAuth, commentValedation, handleValidationErrors, commentController.create);

router.route('/api/comments/:id')
.get(commentController.getOne)
.delete(checkAuth, commentController.remove)
.patch(checkAuth, commentValedation, handleValidationErrors,commentController.update);


export const commentRouter = router;