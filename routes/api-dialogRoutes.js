import Router from 'express';
import { dialogController }  from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";

const router = new Router()

router.post('/api/dialog-create', checkAuth, dialogController.createDialog)
router.get('/api/dialog/:id', checkAuth, dialogController.getOneDialog)
router.patch('/api/dialog-add-comment', checkAuth, dialogController.setAddComment)
router.patch('/api/dialog-remove-comment', checkAuth, dialogController.setRemoveComment)


// router.route('/api/post/:id')
// .get( postController.getOnePost)
// .delete( checkAuth, postController.deletePost)
// .patch( checkAuth, postCreateValedation, handleValidationErrors,postController.updatePost);


// router.route('/api/post')
// .get( postController.getAllPosts)
// .post( checkAuth, postCreateValedation, handleValidationErrors, postController.createPost);

// router.get("/api/tags", postController.getTags); 
// router.get("/api/user-posts", postController.getUserPosts); 
// router.get("/api/lenght", postController.getLenght); 
// router.get("/api/user-post-length", postController.getUserPostsLength); 
// router.patch("/api/post-add-comment", checkAuth, postController.setAddComment);
// router.patch("/api/post-remove-comment", checkAuth, postController.setRemoveComment);
// router.patch("/api/post-set-like", checkAuth, postController.setUpdateLikes);
// router.patch("/api/post-set-dislike", checkAuth, postController.setUpdateDislike);

export const dialogRouter = router;