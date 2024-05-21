"use server";

import { db } from "@/lib/db";
export const createFieldsFriend = async (id_owner: string, id_friend: string) => {
    try {
        console.log("Adding friend to database...");
        await db.friends.create({
            data: {
                ownerId: id_owner,
                friendId: id_friend
            }
        })
        console.log("Friend added successfully.");
        return { success: "Se ha añadido tu amigo correctamente" };
    } catch (error) {
        console.error("Error while adding friend to database:", error);
        return { error: "Error al añadir en la lista de amigos" };
    }
}
