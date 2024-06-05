"use server";
import { db } from "@/lib/db";


export const deleteNotification = async (idNotification: string) => {
    try {
        await db.notification.delete({
            where: {
                id: idNotification
            },

        });

        return { success: "Notificacion borrada " };
    } catch (error) {
        return { error: "Error al borrar la notificacion las notificaciones" };
    }

};