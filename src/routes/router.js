import express from "express";
import userController from "../controllers/userController";

const router = express();

router.post('/createAccount', userController.createUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
