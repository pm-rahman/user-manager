import { Schema, model } from "mongoose";
import { TUser, TFullName, TOrders, TAddress } from "./user.interface";

const fullName = new Schema<TFullName>({
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
const address = new Schema<TAddress>({
    street: String,
    city: String,
    country: String
});
const orders = new Schema<TOrders>({
    productName: String,
    price: Number,
    quantity: String
});

const userSchema = new Schema<TUser>({
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

export const User = model('User', userSchema)