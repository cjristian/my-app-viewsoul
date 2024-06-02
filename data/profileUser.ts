"use server";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';


export const profileUser = async (id: string) => {
    noStore();
    try {
        const posts = await db.user.findMany({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                lastname: true,
                birthdate: true,
                country: true,
                gender: true,
                image: true,
                nickname: true,
                emailVerified: true,
                imageTitle: true,
            },
        });
        return posts;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Error fetching user posts");
    }
};
