import { TOrders, TUser } from "./user.interface";
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
    if (await User.isUserExists(userId)) {
        const result = await User.findOne({ userId });
        return result;
    }
    else {
        throw new Error("User is not found!");
    }
}
const updateUserIntoDB = async (userId: string, user: TUser) => {
    if (await User.isUserExists(userId)) {
        const { username, fullName, password, age, email, isActive, hobbies, address, orders } = user;
        const updatedUser = {
            username,
            fullName,
            password,
            age,
            email,
            isActive,
            hobbies,
            address,
            orders
        }
        const result = await User.updateOne({ userId }, updatedUser);
        return result;
    }
    else {
        throw new Error("User is not found!");
    }
}

const deleteUserIntoDB = async (userId: string) => {
    if (await User.isUserExists(userId)) {
        const result = await User.deleteOne({ userId });
        return result;
    } else {
        throw new Error("User is not found!");
    }
}

const ordersUpdateIntoDB = async (userId: string, order: TOrders) => {
    if (await User.isUserExists(userId)) {
        const updatedOrders = {
            $push: { orders: order }
        }
        const result = await User.updateOne({ userId }, updatedOrders)
        return result;
    } else throw new Error("User is not found!")
}

const getUserOrdersIntoDB = async (userId: string) => {
    if (await User.isUserExists(userId)) {
        const result = await User.findOne({ userId }, { orders: 1 })
        return result;
    } else throw new Error("User is not found!")
}

export const userServices = {
    getAllUserIntoDB,
    getUserOrdersIntoDB,
    getSingleUserIntoDB,
    createUserIntoDB,
    updateUserIntoDB,
    ordersUpdateIntoDB,
    deleteUserIntoDB,
}