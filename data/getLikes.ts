"use server";
import { db } from "@/lib/db";
export async function getLikes(postId:string) {
    try {
        const likes = await db.like.count({
            where: {
                postId
            }
        });
        return { likes };
    } catch (error) {
        return { error: "Error al obtener los likes"};
    }
}