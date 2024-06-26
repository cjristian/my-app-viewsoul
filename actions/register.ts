"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail} from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { getUserByNickname } from "@/data/getUserByNickname";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "¡Credenciales inválidas!" };
    }

    const { email, password, name, lastname, birthdate, country, gender, image, nickname } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
        return { error: "¡Este email está en uso!" };
    }

    const existingUserByNickname = await getUserByNickname(nickname);
    if (existingUserByNickname) {
        return { error: "¡Este nickname está en uso!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            lastname,
            birthdate,
            country,
            gender,
            image: image,
            nickname
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Revisa tu email para confirmar" };
}
