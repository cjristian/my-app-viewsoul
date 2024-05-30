"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };

    }
    const { email, password, name, lastname, birthdate, country, gender, image, nickname } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "¡Este email ya está en uso!" };
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
    )

    return { success: "¡Se ha enviado un email de confirmación!" };

}