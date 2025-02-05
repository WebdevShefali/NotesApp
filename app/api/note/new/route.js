import Note from "@/models/Note";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/utils/database";
import { authOptions } from "../../auth/[...nextauth]/route";

export const POST = async (req) => {
  const { note, tag } = await req.json();
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const newNote = new Note({ creator: session.user.id, note, tag });
    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new note", { status: 500 });
  }
};
