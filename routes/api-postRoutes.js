import Router from 'express';
import { postController }  from "../controllers/index.js";
import { handleValidationErrors } from "../utils/index.js";
import { postCreateValedation } from "../validations/postValidation.js";
import { checkAuth } from "../utils/index.js";

const router = new Router()

router.route('/api/post/:id')
.get( postController.getOnePost)
.patch( checkAuth, postCreateValedation, handleValidationErrors,postController.updatePost)
.delete( checkAuth, postController.deletePost);

router.route('/api/post')
.post( checkAuth, postCreateValedation, handleValidationErrors, postController.createPost)
.get( postController.getAllPosts);

router.get("/api/tags", postController.getTags); 

export const postRouter = router;


