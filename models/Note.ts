import mongoose, { Schema } from "mongoose";

const SingleNoteSchema = new Schema({
  userId: { type: String, required: true, default: "" },
  title: { type: String, required: true, default: "" },
  noteContent: { type: String, required: true, default: "" },
  isFavorite: { type: Boolean, default: false },
  noteIsRecorded: { type: Boolean, default: false },
  creationDate: { type: String, required: true, default: "" },
  images: { type: [String], default: [] },
});

const SingleNote =
  mongoose.models.SingleNote || mongoose.model("SingleNote", SingleNoteSchema);

export default SingleNote;
