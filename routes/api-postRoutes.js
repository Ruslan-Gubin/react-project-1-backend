import Router from 'express';
import { handleValidationErrors } from "../service/handleValidationErrors.js";
import { postCreateValedation } from "../validations/postValidation.js";
import { checkAuth } from "../service/checkAuth.js";
import  PostController  from "../controllers/api-post-controlers.js";
const router = new Router()


router.patch("/api/post/:id", checkAuth, postCreateValedation, handleValidationErrors,PostController.updatePost);
router.post("/api/post", checkAuth, postCreateValedation, handleValidationErrors, PostController.createPost);
router.delete("/api/post/:id", checkAuth, PostController.deletePost);
router.get("/api/post/:id", PostController.getOnePost);
router.get("/api/post", PostController.getAllPosts); 
router.get("/api/tags", PostController.getLastTags); 

export default router;
