import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcryptjs from "bcryptjs"

export async function POST(req: Request) {
    try {
        await connectDB();

        const { username, email, password } = await req.json();
    
        if (password.length < 6) return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });

        const userFound = await User.findOne({email});

        if (userFound) return NextResponse.json({ message: "Invalid credential" }, { status: 400 });

        const hashedPassword = await bcryptjs.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        
        return NextResponse.json({ username, email }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
    }
}