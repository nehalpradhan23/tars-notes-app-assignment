import connectDB from "@/lib/mongodb";
import User from "@/models/User";
// import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({
        success: false,
        error: "user already exists",
        status: 400,
      });
    }
    // const hashPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "POST error",
      status: 400,
    });
  }
}
