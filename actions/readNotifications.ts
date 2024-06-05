"use server";
import { db } from "@/lib/db";


export const readNotifications = async (idNotification:string) => {
    try {
        await db.notification.updateMany({
            where: {
                id:idNotification
            },
            data: {
                read: true
            }
        });

        return { success: "Notificaciones leídas correctamente" };
    } catch (error) {
        return { error: "Error al leer las notificaciones" };
    }
   
};