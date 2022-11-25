import Router from 'express';
import { dialogController }  from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";

const router = new Router()

router.post('/api/dialog-create', checkAuth, dialogController.createDialog)
router.get('/api/dialog/:id', checkAuth, dialogController.getOneDialog)
router.patch('/api/dialog-add-comment', checkAuth, dialogController.setAddComment)
router.patch('/api/dialog-remove-comment', checkAuth, dialogController.setRemoveComment)
router.delete('/api/dialog-delete', checkAuth, dialogController.setDeleteDialog)


export const dialogRouter = router;