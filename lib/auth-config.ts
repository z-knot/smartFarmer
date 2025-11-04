import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key",
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { data: authData } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });
          if (!authData.user) return null;
          const { data: userData } = await supabase
            .from('users').select('*').eq('id', authData.user.id).maybeSingle();
          return {
            id: authData.user.id,
            email: authData.user.email || '',
            name: userData?.full_name || '',
            role: userData?.role || 'farmer',
          };
        } catch {
          return null;
        }
      }
    })
  ],
  pages: { signIn: "/auth/login", newUser: "/auth/register" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.sub || '';
      }
      return session;
    }
  }
};
