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
router.patch('/api/comment-update',checkAuth, commentValedation, handleValidationErrors,commentController.update);
router.patch('/api/comment-like', checkAuth, commentController.setAddLike);
router.patch('/api/comment-dislike', checkAuth, commentController.setAddDislaik); 
router.delete('/api/comments-remove', checkAuth, commentController.remove);


export const commentRouter = router; 