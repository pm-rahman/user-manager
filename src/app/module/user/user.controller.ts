import { Request, Response } from "express";
import { userServices } from "./user.services";

// create user
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await userServices.createUserIntoDB(user);
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
        // TODO: password will be show hashed to response
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
                description: error || "User not found!",
            }
        })
    }
}
// update user
const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = req.body;
        const result = await userServices.updateUserIntoDB(userId, user);
        if (!result.matchedCount) {
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
            if (result.modifiedCount === 0) {
                res.json({
                    success: false,
                    message: "User not Updated",
                    error: {
                        code: 404,
                        description: "User not Updated!"
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

export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser
}