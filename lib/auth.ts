import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user;

      // ✅ Check if user exists in YOUR `users` table
      const { data } = await supabase.from("users").select("id").eq("email", email).single();

      // ✅ If user doesn't exist, insert it
      if (!data) {
        const { data: newUser } = await supabase.from("users").insert([{ email, name, image }]).select("id").single();
        user.id = newUser?.id || ""; // Assign the new user ID
      } else {
        user.id = data.id; // Assign existing user ID
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string; // ✅ Ensure user ID is passed
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // ✅ Store user ID in token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // ✅ Ensure this is set
  session: {
    strategy: "jwt", // ✅ Use JWT for sessions
  },
};

export default authOptions;