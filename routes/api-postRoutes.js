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
router.get("/api/user-posts", postController.getUserPosts); 
router.get("/api/lenght", postController.getLenght); 
router.get("/api/user-post-length", postController.getUserPostsLength); 
router.patch("/api/post-add-comment", checkAuth, postController.setAddComment);
router.patch("/api/post-remove-comment", checkAuth, postController.setRemoveComment);
router.patch("/api/post-set-like", checkAuth, postController.setUpdateLikes);
router.patch("/api/post-set-dislike", checkAuth, postController.setUpdateDislike);

export const postRouter = router;


