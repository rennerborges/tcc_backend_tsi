import express from 'express';

import userController from '../controllers/user-controller';
import ValidationUserPost from '../validation/user-post-validation';
import ValidatorLogin from '../validation/login-validarion';
import authController from '../controllers/auth-controller';

const router = express.Router();

router.post('/login', ValidatorLogin, authController.login);

router.get('/users', userController.getUsers);
router.get('/user/:email', userController.getUser);
router.post('/user', ValidationUserPost, userController.createUser);
// router.patch('/user', Auth('g'), ValidationUserEdit, userController.updateUser);
// router.delete('/user/:id', Auth('g'), userController.deleteUser);

export default router;
