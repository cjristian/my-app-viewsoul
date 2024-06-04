"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { GiveLikeSchema } from "@/schemas";

export const deleteLike = async (data: z.infer<typeof GiveLikeSchema>) => {
    const result = GiveLikeSchema.safeParse(data);

    if (!result.success) {
        return { error: "Credenciales incorrectas" };
    }

    const { userId, postId } = result.data;

    try {
        const existingLike = await db.like.findUnique({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId
                }
            }
        });

        if (!existingLike) {
            return { error: "El usuario no ha dado like a esta publicación." };
        }

        await db.like.delete({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId
                }
            }
        });

        return { success: "Like borrado correctamente" };
    } catch (error) {
        return { error: "Error al borrar el like de la publicación" };
    }
};
