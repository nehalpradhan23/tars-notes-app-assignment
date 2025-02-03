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

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    const notes = await SingleNote.find({ userId });

    return NextResponse.json({ success: true, userNotes: notes });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function DELETE(request: Request) {
  try {
    const { noteId } = await request.json();
    console.log("noteid: ", noteId);

    if (!noteId) {
      return NextResponse.json({
        success: false,
        message: "Need id to delete",
      });
    }

    await connectDB();
    const noteToDelete = await SingleNote.findOneAndDelete({ _id: noteId });

    if (!noteToDelete) {
      return NextResponse.json({ success: false, message: "Note not found" });
    }

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log("error deleting note", error);
    return NextResponse.json({
      success: false,
      error,
      message: "Error deleting note",
    });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, noteContent, isFavorite } = await req.json();
    await connectDB();

    const updateNote = await SingleNote.findByIdAndUpdate(
      { _id: id },
      {
        title,
        noteContent,
        isFavorite,
      }
    );

    if (updateNote) {
      return NextResponse.json({
        success: true,
        note: updateNote,
        message: "Note updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update note",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}
