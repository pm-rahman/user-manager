"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const getAllUserIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1
    });
    return result;
});
const getSingleUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId });
        return result;
    }
    else {
        throw new Error("User is not found!");
    }
});
const updateUserIntoDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
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
        };
        const result = yield user_model_1.User.updateOne({ userId }, updatedUser);
        return result;
    }
    else {
        throw new Error("User is not found!");
    }
});
const deleteUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.deleteOne({ userId });
        return result;
    }
    else {
        throw new Error("User is not found!");
    }
});
const ordersUpdateIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const updatedOrders = {
            $push: { orders: order }
        };
        const result = yield user_model_1.User.updateOne({ userId }, updatedOrders);
        return result;
    }
    else
        throw new Error("User is not found!");
});
const getUserOrdersIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.findOne({ userId }, { orders: 1 });
        return result;
    }
    else
        throw new Error("User is not found!");
});
const getUserTotalOrdersIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userId)) {
        const result = yield user_model_1.User.aggregate([
            { $match: { userId: userId } },
            { $unwind: "$orders" },
            {
                $group: {
                    _id: "$_id",
                    totalPrice: { $sum: { $multiply: ["$orders.price", "$orders.quantity"] } },
                }
            },
            { $project: { totalPrice: 1 } }
        ]);
        return result;
    }
    else
        throw new Error("User is not found!");
});
exports.userServices = {
    getAllUserIntoDB,
    getUserOrdersIntoDB,
    getSingleUserIntoDB,
    getUserTotalOrdersIntoDB,
    createUserIntoDB,
    updateUserIntoDB,
    ordersUpdateIntoDB,
    deleteUserIntoDB,
};
