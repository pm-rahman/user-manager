import { Request, Response } from "express";
import { userServices } from "./user.services";
import userValidationSchema from "./user.validation";

// create user
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        // data validation with zod
        const validatedUser=userValidationSchema.parse(user);
        const result = await userServices.createUserIntoDB(validatedUser);
        res.json({
            success: true,
            message: "User Created Successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to create User",
            error: {
                status: 404,
                description: "Failed to create user!",
            }
        })
    }
}

// get user
const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserIntoDB();
        res.json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch Users",
            error: {
                status: 404,
                description: error || "Users not found",
            }
        })
    }
}

// get single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.getSingleUserIntoDB(userId);
        res.json({
            success: true,
            message: "User found successfully!",
            data: result,
        })
    } catch (error) {
        res.json({
            success: false,
            message: "User not found",
            error: {
                status: 404,
                description: "User not found!",
            }
        })
    }
}
// update user
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = req.body;
        // validation with zod
        const validateUser= userValidationSchema.parse(user);
        const result = await userServices.updateUserIntoDB(userId, validateUser);
        if (result.modifiedCount === 0) {
            res.json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            })
        }
        else {
            res.json({
                success: true,
                message: "User updated successfully!",
                data: result
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: "User not Updated",
            error: {
                code: 404,
                description: "User not updated!"
            }
        })
    }

}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.deleteUserIntoDB(userId);
        res.json({
            success: true,
            message: "User deleted successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        })
    }
}

const ordersUpdate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = req.body;
        const result = await userServices.ordersUpdateIntoDB(userId, orders);
        res.send({
            success: true,
            message: "Order created successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Orders not updated",
            error: {
                code: 404,
                description: error || "Orders not updated"
            }
        })
    }
}

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getUserOrdersIntoDB(userId);
        res.json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Orders not fetched",
            error: {
                code: 404,
                description: error || "Orders not fetched!"
            }
        })
    }
}

const getUserTotalOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getUserTotalOrdersIntoDB(userId);
        res.json({
            success: true,
            message: "Total price calculated successfully!",
            data: result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Orders not fetched",
            error: {
                code: 404,
                description: error || "Orders not fetched!"
            }
        })
    }
}

export const userController = {
    getUserOrders,
    getAllUser,
    getSingleUser,
    getUserTotalOrders,
    createUser,
    updateUser,
    ordersUpdate,
    deleteUser
}