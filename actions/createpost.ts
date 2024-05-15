"use server";
import * as z from "zod";

import { CreateFormSchema } from "@/schemas";

export const createPost = async ( values: z.infer<typeof CreateFormSchema>) => {
    const post = CreateFormSchema.safeParse(values)

    if (!post.success) {
        return { error: "Invalid fields!" };

    }

    
}