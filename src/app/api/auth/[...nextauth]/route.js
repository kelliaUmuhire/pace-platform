import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        
        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('No user found with this email.');
        }

        const isValid = await verifyPassword(password, user.password);
        
        if (!isValid) {
          throw new Error('Invalid password.');
        }
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          language: user.preferredLanguage || 'en',
          image: user.profileImage,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Add custom profile handling to include role information
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'student', // Default role for OAuth users
          language: 'en',
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.language = user.language;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.language = token.language;
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };