import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
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
        message: "Introduce un correo electrónico válido"
    }),
    password: z.string().min(6, {
        message: "Combinación de al menos seis números y letras"
    }),
    name: z.string().min(1, {
        message: "¿Cuál es tu nombre?"
    })
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

