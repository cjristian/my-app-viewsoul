import * as z from "zod";

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