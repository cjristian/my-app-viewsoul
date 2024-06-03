"use server";
import { db } from "@/lib/db";

export const deletePost = async (id: string) => {
    try {
        await db.post.delete({
            where: { id: id },
        });

        return { success: "Publicación eliminada correctamente" };
    } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        return { error: "Error al eliminar la publicación" };
    }
};
