import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

export const getUserByEmail = async (email: string) => {
    noStore();
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch {
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch {
        return null;
    }
}


