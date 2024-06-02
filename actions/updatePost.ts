"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { UpdateFormSchema } from "@/schemas";

export const updatePost = async (data: z.infer<typeof UpdateFormSchema>) => {
    const result = UpdateFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Datos de actualización incorrectos" };
    }

    const { postId, userId, photo, text } = result.data;

    try {
        const updateData = {} as any;
        if (photo !== undefined) updateData.postImage = photo;
        if (text !== undefined) updateData.postText = text;

        if (Object.keys(updateData).length === 0) {
            return { error: "No hay datos para actualizar" };
        }

        await db.post.update({
            where: { id: postId, userId: userId },
            data: updateData,
        });

        return { success: "Publicación actualizada correctamente" };
    } catch (error) {
        return { error: "Error al actualizar la publicación" };
    }
};