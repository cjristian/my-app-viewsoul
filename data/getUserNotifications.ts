"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { GetUserNotificationsSchema } from "@/schemas";

export const getUserNotifications = async (data: z.infer<typeof GetUserNotificationsSchema>) => {
    const result = GetUserNotificationsSchema.safeParse(data);

    if (!result.success) {
        return { error: "Credenciales incorrectas" };
    }

    const { userId } = result.data;

    try {
        const notifications = await db.notification.findMany({
            where: {
                userId: userId,
            },
        });

        return { notifications };
    } catch (error) {
        return { error: "Error al obtener las notificaciones del usuario" };
    }
};