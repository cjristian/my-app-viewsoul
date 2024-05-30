import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

type User = {
    lastName: string  | null
    birthdate: string | null;
    country: string | null;
    gender: string | null;
    emailVerified: Date | null;
    image: string | null;
    nickname: string | null;
}

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
} & User


declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }

}

import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends User { }
}