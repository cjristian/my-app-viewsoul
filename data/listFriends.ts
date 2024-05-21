"use server";

import { db } from "@/lib/db";

export const getListFriendIds = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                listFriends: true
            }
        });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Extraer solo los IDs de los amigos
        const friendIds = user.listFriends.map(friendship => friendship.friendId);

        return friendIds;
    } catch (error) {
        console.error("Error while fetching friend list:", error);
        return { error: "Error en la base de datos" };
    }
};
