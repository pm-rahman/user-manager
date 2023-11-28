import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result
}
const getAllUserIntoDB = async () => {
    const result = await User.find({}, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1
    });
    return result;
}
const getSingleUserIntoDB = async (userId: string) => {
    const result = await User.findOne({ userId });
    return result;
}
const updateUserIntoDB = async (userId: string, user: TUser) => {
    const filter = { userId }
    const result = await User.updateOne(filter, {
        username: user.username,
        fullName: user.fullName,
        password: user.password,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
        orders: user.orders
    });
    // const result = await User.updateOne(filter, update);
    return result;
}

export const userServices = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingleUserIntoDB,
    updateUserIntoDB
}