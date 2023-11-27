import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await userServices.createUserIntoDB(user);
        res.json({
            success: true,
            message: "User Created Successfully!",
            data: result
        })
    } catch (error:any) {
        res.json({
            success: false,
            message: "Failed to create User",
            error:{
                status:404,
                description:error?.message||error,
            }
        })
    }
}

export const userController = {
    createUser
}