import express from "express";
import userController from "../controllers/userController";
import carController from "../controllers/carController";
import adminController from "../controllers/adminController";
import orderController from "../controllers/orderController";
import addressController from "../controllers/addressController";

const router = express();

router.post('/createAccount', userController.createUser, carController.createCar);
router.get('/listAllUsers', adminController.verifyJWTAdmin, userController.listAllUsers);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.post('/createOrder', userController.verifyJWT, addressController.createAddress, orderController.createOrder);
router.get('/order', userController.verifyJWT, orderController.listOrderByUser);

router.get('/allOrders', adminController.verifyJWTAdmin, orderController.listAllOrders);
router.post('/loginAdmin', adminController.loginAdmin);
router.post('/createAccountAdmin', adminController.createUserAdmin);

router.get('/car/:idUser', carController.getCar);

export default router;
