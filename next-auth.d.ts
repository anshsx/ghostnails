import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Ensure User type includes id
  }

  interface Session {
    user: User; // Ensure Session.user includes the id
  }
}