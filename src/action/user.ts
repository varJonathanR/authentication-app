"use server"

import { connectDB } from "@/libs/mongodb";
import prisma from "@/libs/mongodb";
import User from "@/models/user";

import bcryptjs from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const register = async (formData: FormData) => {
    const email = formData.get("email")?.toString().toLowerCase() as string;
    const password = formData.get("password") as string;
    let username = formData.get("username") as string;
    let redirectPath: string | null = null;

    if (!username) username = "New User";

    if (password.length < 6) throw new Error("Password must have at least 6 characters");

    try {
        /* await connectDB(); */

        /* const userFound = await User.findOne({ email }); */
        const userFound = await prisma.users.findUnique({
            where: { email }
        });

        if (userFound) throw new Error("Invalid credentials");

        const hashedPassword = await bcryptjs.hash(password, 12);

        await prisma.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                provider: "local"
            }
        });

        /* await User.create({
            username,
            email,
            password: hashedPassword,
            provider: "local"
        }); */

        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password
        });

        redirectPath = "/dashboard/profile"
    } catch (error) {
        console.log(error)
    } finally {
        if (redirectPath) redirect(redirectPath);
    }
};

const login = async (formData: FormData) => {
    const email = formData.get("email")?.toString().toLowerCase() as string;
    const password = formData.get("password") as string;
    let redirectPath: string | null = null;

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password
        });

        redirectPath = "/dashboard/profile"
    } catch (error) {
        const credentialError = error as CredentialsSignin;
        return credentialError.cause;
    } finally {
        if (redirectPath) redirect(redirectPath);
    }
};

const oauth = async (formData: FormData) => {
    const action = formData.get("action") as string;

    await signIn(action, { redirectTo: "/dashboard/profile" });
};

export { register, login, oauth };