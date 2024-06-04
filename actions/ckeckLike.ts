"use server";
import { db } from "@/lib/db";
import { GiveLikeSchema } from "@/schemas";
import * as z from "zod";

export const checkLike = async (data: z.infer<typeof GiveLikeSchema>) => {
    const result = GiveLikeSchema.safeParse(data);

    if (!result.success) {
        return { error: "Credenciales incorrectas", exists: false };
    }

    const { userId, postId } = result.data;

    try {
        const like = await db.like.findUnique({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId,
                },
            },
        });

        return { exists: !!like };
    } catch (error) {
        console.error("Error checking like:", error);
        return { error: "Error al verificar el like", exists: false };
    }
};
