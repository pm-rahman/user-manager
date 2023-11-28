import express from "express"
import { userController } from "./user.controller";
// import { User } from "./user.model";

const router = express.Router();

// router.get('/',)
router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get("/:userId", userController.getSingleUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)
router.put('/:userId/orders',userController.ordersUpdate)
router.get('/:userId/orders',userController.getUserOrders)
router.get('/:userId/orders/total-price',userController.getUserTotalOrders)


export const userRouter = router;