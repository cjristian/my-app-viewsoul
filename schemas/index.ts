import { image } from "@nextui-org/react";
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.optional(z.string()),
    imageTitle: z.optional(z.string()),
    lastname: z.optional(z.string()),
    nickname: z.optional(z.string()),
    birthdate: z.optional(z.string()),
    country: z.optional(z.string()),
    gender: z.enum(["MASCULINO", "FEMENINO", "OTRO"], {
        message: "Selecciona un género válido"
    }),
})
    .refine((data) => {
        if (!data.name) {
            return false;
        }
        return true;
    }, {
        message: "El nombre es obligatorio",
        path: ["name"]
    })
    .refine((data) => {
        if (!data.email) {
            return false;
        }
        return true;
    }, {
        message: "El correo electrónico es obligatorio",
        path: ["email"]
    })
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;

    }, {
        message: "Se requiere la nueva contrsaseña ",
        path: ["newPassword"]
    })
    .refine((data) => {

        if (data.newPassword && !data.password) {
            return false;
        }
        return true;

    }, {
        message: "Introduce una contraseña ",
        path: ["password"]
    })

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Combinación de al menos seis números y letras"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Introduce un correo electrónico válido"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Introduce un correo electrónico válido"
    }),
    password: z.string().min(1, {
        message: "Introduce una contraseña"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Correo electrónico inválido"
    }),
    password: z.string().min(6, {
        message: "Combinación de al menos seis números y letras"
    }),
    name: z.string().min(1, {
        message: "¿Cuál es tu nombre?"
    }),
    lastname: z.string().min(1, {
        message: "¿Cuáles son tus apellidos?"
    }),
    nickname: z.string().min(3, {
        message: "Escribe el nombre de usuaio"
    }),
    birthdate: z.string().min(1, {
        message: "¿Cuál es tu fecha de nacimiento?"
    }),
    country: z.string().min(2, {
        message: "¿De donde eres?"
    }),
    gender: z.enum(["MASCULINO", "FEMENINO", "OTRO"], {
        message: "Selecciona un género válido"
    }),
    image: z.string().optional(),
});

export const CreateFormSchema = z.object({
    userId: z.string(),
    photo: z.string().optional(),
    text: z.string().optional(),
}).refine((data) => {
    return data.photo !== undefined || data.text !== undefined;
}, {
    message: "Debes proporcionar al menos una foto o un texto",
});

export const UpdateFormSchema = z.object({
    id: z.string().nonempty("El ID de la publicación es obligatorio"),
    photo: z.string().optional(),
    text: z.string().optional(),
    createdAt: z.date()
});
export const SettingsProfileSchema = z.object({
    birthdate: z.optional(z.string()),
    country: z.optional(z.string()),
    image: z.optional(z.string()),
    imageTitle: z.optional(z.string()),
});

export const GiveLikeSchema = z.object({
    userId: z.string(),
    postId: z.string(),
});
export const GetUserNotificationsSchema = z.object({
    userId: z.string(),
});