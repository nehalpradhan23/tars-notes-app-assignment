import connectToDB from "@/lib/mongodb";
import User from "@/models/User";
// import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email, password } = await request.json();
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json({
        success: false,
        message: "user not registered",
        status: 401,
      });
    }
    // const checkPwd = await bcrypt.compare(password, userExists.password);
    if (password !== userExists.password) {
      // if (!checkPwd) {
      return NextResponse.json({
        success: false,
        message: "Wrong password",
        status: 401,
      });
    }

    const token = jwt.sign(
      {
        email: userExists.email,
      },
      "abcdefgh",
      // process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    // const token = jwt.sign(
    //   {
    //     id: userExists._id,
    //     email: userExists.email,
    //   },
    //   process.env.jwtSecret as string,
    //   { expiresIn: "1d" }
    // );

    const finalData = {
      token,
      user: {
        email: userExists.email,
        name: userExists.name,
        _id: userExists._id,
      },
    };
    return NextResponse.json({
      success: true,
      message: "login successful",
      status: 200,
      finalData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "POST error", status: 400 });
  }
}
