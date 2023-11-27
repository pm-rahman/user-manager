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
    } catch (error: any) {
        res.json({
            success: false,
            message: "Failed to create User",
            error: {
                status: 404,
                description: error?.message || error,
            }
        })
    }
}

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
const getSingleUser=async(req:Request,res:Response)=>{
    try{
        const {userId}= req.params
        // TODO: password will be show hashed to response
        const result = await userServices.getSingleUserIntoDB(userId);
        res.json({
            success:true,
            message:"Failed to fetch user",
            data:result,
        })
    }catch(error){
        res.json({
            success: false,
            message: "Failed to fetch User",
            error: {
                status: 404,
                description: error || "User not found",
            }
        })
    }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUser
}