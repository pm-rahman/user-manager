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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullName = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"],
        maxlength: [20, "First Name cann't be longer then 20 character"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"],
        maxlength: [20, "Last Name cann't be longer then 20 character"],
        trim: true,
    }
});
const address = new mongoose_1.Schema({
    street: String,
    city: String,
    country: String
});
const orders = new mongoose_1.Schema({
    productName: { type: String, required: [true, "Product Name is Required"] },
    price: { type: Number, required: [true, "Product price is Required"] },
    quantity: { type: Number, required: [true, "Product price is Required"] },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        unique: true,
        required: [true, "Id is Required"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "User Name is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [6, "Password cann't be less then 10 character"],
        maxlength: [10, "Password cann't be longer then 10 character"]
    },
    fullName: {
        type: fullName,
        required: [true, "Name is Required"],
    },
    age: {
        type: Number,
        required: [true, "Age is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    isActive: Boolean,
    hobbies: { type: [String] },
    address: { type: address, required: [true, "Address is Required"] },
    orders: [orders]
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_code));
        next();
    });
});
userSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
