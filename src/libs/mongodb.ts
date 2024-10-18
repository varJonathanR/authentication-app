import mongoose from "mongoose"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) throw new Error("MONGODB_URI must be defined");

export const connectDB = async () => {
    await mongoose.connect(DATABASE_URL);
};