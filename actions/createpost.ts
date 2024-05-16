"use server";
import * as z from "zod";
import { db } from "@/lib/db";


import { CreateFormSchema } from "@/schemas";

export const createPost = async (data: z.infer<typeof CreateFormSchema>) => {
    console.log("Data received:", data); 

    const result = CreateFormSchema.safeParse(data);

    if (!result.success) {
        return { error: "Credenciales incorrectas" };
    }

    const { userId, photo, text } = result.data;
    console.log("User ID:", userId);
    console.log("Photo:", photo);
    console.log("Text:", text);


    try {
        if (photo !== undefined && text !== undefined) {
            await db.post.create({
                data: {
                    userId,
                    postText: text,
                    postImage: photo
                }
            });
        }
        else if (photo !== undefined) {
            await db.post.create({
                data: {
                    userId,
                    postImage: photo,
                    postText: ""
                }
            });
        }
        else if (text !== undefined) {
            await db.post.create({
                data: {
                    userId,
                    postText: text,
                    postImage: ""
                }
            });
        }

        return { success: "Publicación creada correctamente" };
    } catch (error) {
        return { error: "Error al crear la publicación" };
    }
};
