import Note from "@/models/Note";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/utils/database";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const notes = await Note.find({ creator: session.user.id });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all notes", { status: 500 });
  }
};
