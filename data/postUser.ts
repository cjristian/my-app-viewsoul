"use server";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';


export const getPostUser = async (id: string) => {
    noStore();
    try {
        const posts = await db.post.findMany({
            where: {
                userId: id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                postText: true,
                postImage: true,
                createdAt: true,
            },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Error fetching user posts");
    }
};
