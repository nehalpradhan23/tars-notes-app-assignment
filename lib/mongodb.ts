import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("DB connected...");
  } catch (error) {
    console.error(error);
  }
}

export default connectDB;
