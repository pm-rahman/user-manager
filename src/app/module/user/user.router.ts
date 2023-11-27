import express from "express"
import { userController } from "./user.controller";

const router = express.Router();

// router.get('/',)
router.post('/',userController.createUser)
router.get('/',userController.getAllUser)


export const userRouter = router;