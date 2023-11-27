import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result
}
const getAllUserIntoDB = async () => {
    const result = await User.find({},{
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1
    });
    return result;
}
const getSingleUserIntoDB=async(userId:string)=>{
    const result = await User.findOne({userId});
    return result;
}

export const userServices = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingleUserIntoDB
}