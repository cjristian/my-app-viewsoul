"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { GiveLikeSchema } from "@/schemas";

export const giveLike = async (data: z.infer<typeof GiveLikeSchema>) => {
    const result = GiveLikeSchema.safeParse(data);

    if (!result.success) {
        return { error: "Credenciales incorrectas" };
    }

    const { userId, postId } = result.data;

    try {
        await db.like.create({
            data: {
                userId,
                postId,
            }
        });

        const post = await db.post.findUnique({ where: { id: postId } });
        if (post) {
            await db.notification.create({
                data: {
                    userId: post.userId, // dueño del post
                    likerId: userId, // persona que le dio like
                    postId: postId,
                }
            });
        }

        return { success: "Like dado correctamente" };
    } catch (error) {
        if ((error as any).code === 'P2002') {
            return { error: "El usuario ya dio like a esta publicación" };
        }
        return { error: "Error al dar like a la publicación" };
    }
};