import NextAuth from "next-auth";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.Google_Client_ID,
      clientSecret: process.env.Google_Client_Secret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        //   Check if user exists in the database
        const userExists = await User.findOne({ email: profile.email });
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
