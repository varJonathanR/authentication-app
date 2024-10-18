import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export async function PATCH(req: Request) {
    try {
        await connectDB();

        const { userId, username, email, password, bio, profilePicture, phoneNumber } = await req.json();
    
        if (password && password.length < 6) return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });

        if (phoneNumber && !/^\d{8,15}$/.test(phoneNumber)) {
            return NextResponse.json({ message: "Phone number must be between 8 and 15 digits" }, { status: 400 });
        }

        const id = new mongoose.Types.ObjectId(userId);

        const userFound = await User.findOne({_id: id});

        if (!userFound) return NextResponse.json({ message: "Invalid credential" }, { status: 400 });

        let hashedPassword;
        
        if (password) {
            hashedPassword = await bcryptjs.hash(password, 12);
        }

        if (username) userFound.username = username;
        if (email) userFound.email = email;
        if (password) userFound.password = hashedPassword;
        if (bio) userFound.bio = bio;
        if (profilePicture) userFound.profilePicture = profilePicture;
        if (phoneNumber) userFound.phoneNumber = phoneNumber;

        await userFound.save();
        
        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
    }
}