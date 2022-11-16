import Router from 'express';
import { postController }  from "../controllers/index.js";
import { handleValidationErrors } from "../utils/index.js";
import { postCreateValedation } from "../validations/postValidation.js";
import { checkAuth } from "../utils/index.js";

const router = new Router()

router.route('/api/post/:id')
.get( postController.getOnePost)
.delete( checkAuth, postController.deletePost)
.patch( checkAuth, postCreateValedation, handleValidationErrors,postController.updatePost);


router.route('/api/post')
.get( postController.getAllPosts)
.post( checkAuth, postCreateValedation, handleValidationErrors, postController.createPost);

router.get("/api/tags", postController.getTags); 
router.get("/api/lenght", postController.getLenght); 
router.patch("/api/post-add-comment", checkAuth, postController.setAddComment);
router.patch("/api/post-remove-comment", checkAuth, postController.setRemoveComment);

export const postRouter = router;


