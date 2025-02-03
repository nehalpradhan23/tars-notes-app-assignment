import connectDB from "@/lib/mongodb";
import SingleNote from "@/models/Note";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      userId,
      title,
      noteContent,
      isFavorite,
      noteIsRecorded,
      creationDate,
    } = await req.json();
    await connectDB();

    const note = new SingleNote({
      userId,
      title,
      noteContent,
      isFavorite,
      noteIsRecorded,
      creationDate,
    });

    const savedNote = await note.save();

    return NextResponse.json({ success: true, note: savedNote });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
