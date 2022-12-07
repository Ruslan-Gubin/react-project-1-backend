import * as express from 'express';
import { authController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors } from '../utils/index.js';
import { registerValedation, loginValedation } from "../validations/authValudation.js";

const router: express.Router =  express.Router();

router.post("/api/register", registerValedation, handleValidationErrors, authController.createUser);
router.post("/api/login", loginValedation, handleValidationErrors, authController.authorization);
router.get("/api/auth", checkAuth, authController.getUserInfo);
router.get("/api/auth-all", checkAuth, authController.getAllUsers);   
router.get("/api/auth-likes", checkAuth, authController.getUsersLikes);   
router.get("/api/auth/:id",  authController.getUserSinglPage);   

router.route('/api/auth-remove')
.delete(checkAuth, authController.removeUser);

router.patch('/api/auth-update', checkAuth,registerValedation,handleValidationErrors, authController.updateUser);
router.get('/api/auths-email', authController.getEmails)
router.patch('/api/auth-friend-request', checkAuth, authController.setFriendRequest)
router.patch('/api/auth-remove-friend-request', checkAuth, authController.setRemoveFriendRequest)
router.patch('/api/auth-add-friend', checkAuth, authController.setAddFriend)
router.patch('/api/auth-add-dialog', checkAuth, authController.setAddDialog)
router.patch('/api/auth-delete-friend', checkAuth, authController.setDeleteFriend)
router.patch('/api/auth-online', checkAuth, authController.setAuthOnline)
router.get('/api/auth-users-array',  authController.getUsersArray)

export const authRouter = router;
 
 