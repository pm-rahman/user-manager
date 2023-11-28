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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = __importDefault(require("./user.validation"));
// create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // data validation with zod
        const validatedUser = user_validation_1.default.parse(user);
        const result = yield user_services_1.userServices.createUserIntoDB(validatedUser);
        res.json({
            success: true,
            message: "User Created Successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Failed to create User",
            error: {
                status: 404,
                description: "Failed to create user!",
            }
        });
    }
});
// get user
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAllUserIntoDB();
        res.json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Failed to fetch Users",
            error: {
                status: 404,
                description: error || "Users not found",
            }
        });
    }
});
// get single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.getSingleUserIntoDB(userId);
        res.json({
            success: true,
            message: "User found successfully!",
            data: result,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "User not found",
            error: {
                status: 404,
                description: "User not found!",
            }
        });
    }
});
// update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = req.body;
        // validation with zod
        const validateUser = user_validation_1.default.parse(user);
        const result = yield user_services_1.userServices.updateUserIntoDB(userId, validateUser);
        if (result.modifiedCount === 0) {
            res.json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        else {
            res.json({
                success: true,
                message: "User updated successfully!",
                data: result
            });
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: "User not Updated",
            error: {
                code: 404,
                description: "User not updated!"
            }
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.deleteUserIntoDB(userId);
        res.json({
            success: true,
            message: "User deleted successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
const ordersUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = req.body;
        const result = yield user_services_1.userServices.ordersUpdateIntoDB(userId, orders);
        res.send({
            success: true,
            message: "Order created successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Orders not updated",
            error: {
                code: 404,
                description: error || "Orders not updated"
            }
        });
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.getUserOrdersIntoDB(userId);
        res.json({
            success: true,
            message: "Order fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Orders not fetched",
            error: {
                code: 404,
                description: error || "Orders not fetched!"
            }
        });
    }
});
const getUserTotalOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_services_1.userServices.getUserTotalOrdersIntoDB(userId);
        res.json({
            success: true,
            message: "Total price calculated successfully!",
            data: result
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Orders not fetched",
            error: {
                code: 404,
                description: error || "Orders not fetched!"
            }
        });
    }
});
exports.userController = {
    getUserOrders,
    getAllUser,
    getSingleUser,
    getUserTotalOrders,
    createUser,
    updateUser,
    ordersUpdate,
    deleteUser
};
