import {z} from "zod";

const fullNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).trim(),
    lastName: z.string().min(1).max(20).trim(),
  });
  
  const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  });
  
  const ordersValidationSchema = z.object({
    productName: z.string().min(1),
    price: z.number(),
    quantity: z.number(),
  });
  
  const userValidationSchema = z.object({
    userId: z.string(),
    username: z.string(),
    password: z.string().min(6).max(10),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: addressValidationSchema,
    orders: z.array(ordersValidationSchema),
  });

  export default userValidationSchema;