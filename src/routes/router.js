import express from "express";
import userController from "../controllers/userController";
import carController from "../controllers/carController";

const router = express();

router.post('/createAccount', userController.createUser, carController.createCar);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router;
