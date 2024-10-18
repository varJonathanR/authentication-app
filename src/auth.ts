import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

import { connectDB } from "@/libs/mongodb";
import prisma from "@/libs/mongodb";
import User from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin("Please provide both email & password");

        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new CredentialsSignin("Invalid credentials");
        if (!user.password) throw new CredentialsSignin("Invalid credentials");

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) throw new CredentialsSignin("Invalid credentials");

        const userData = {
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio,
          phoneNumber: user.phoneNumber,
          id: user._id,
          provider: user.provider
        };

        return userData;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === "update") {
        token.user = session.user;
        return token;
      }

      if (user) {
        if (account?.provider === "google" || account?.provider === "github" || account?.provider === "facebook") {
          const dbUser = await User.findOne({ email: user.email });

          token.user = {
            username: dbUser.username,
            email: user.email,
            profilePicture: user.image,
            bio: dbUser.bio,
            phoneNumber: dbUser.phoneNumber,
            id: dbUser._id,
            provider: account.provider
          };
        } else {
          token.user = user;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github" || account?.provider === "facebook") {
        try {
          const { email, name, image, id } = user;

          await connectDB();

          const userFound = await User.findOne({ email });
          
          if (!userFound) {
            await User.create({
              email,
              username: name,
              profilePicture: image,
              authProviderId: id,
              provider: account?.provider
            });
          } 
          
          return true;
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
