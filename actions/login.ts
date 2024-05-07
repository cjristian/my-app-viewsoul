"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {
    sendVerificationEmail,
    sendTwoFactorTokenEmail

} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
    generateVerificationToken,
    generateTwoFactorToken

} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";



export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Credenciales incorrectas" };

    }
    const { email, password, code } = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email no existe" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token

        );
        return { success: "Enviado confirmación de email" }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFastorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if (!twoFastorToken) {
                return { error: "Codigo inválido" }
            }

            if (twoFastorToken.token !== code) {
                return { error: "Código inválido" }
            }

            const hasExpired = new Date(twoFastorToken.expires) < new Date()

            if (hasExpired) {
                return { error: "Codigo expirado" }
            }
            await db.twoFactorToken.delete({
                where: { id: twoFastorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            )

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            )
            return { twoFactor: true }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales incorrectas" };
                default:
                    return { error: "Algo ha salido mal" };
            }

        }

        throw error;
    }

}