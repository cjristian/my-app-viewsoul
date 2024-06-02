"use server";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';


export const getPost = async (id: string) => {
    noStore();
    try {
        const posts = await db.post.findMany({
            where: {
                userId: id,
            },
            
        });
        
        return posts;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Error fetching user posts");
    }
};
