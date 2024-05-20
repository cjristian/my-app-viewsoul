import { db } from "@/lib/db"
import { unstable_noStore as noStore } from 'next/cache';


export const getPasswordResetTokenByToken = async (token: string) => {
    noStore();

    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });
        return passwordResetToken;
    } catch {
        return null
    }
}
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });
        return passwordResetToken;
    } catch {
        return null
    }
}