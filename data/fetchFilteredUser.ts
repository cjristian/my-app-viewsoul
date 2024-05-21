"use server";

import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

export const fetchFilteredUser = async (query: string, currentPage: number, excludedUserId: string) => {
    noStore();
    const ITEMS_PER_PAGE = 4;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const users = await db.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { lastname: { contains: query, mode: 'insensitive' } }
                        ]
                    },
                    { id: { not: excludedUserId } }
                ]
            },
            orderBy: { id: 'asc' },
            take: ITEMS_PER_PAGE,
            skip: offset
        });

        return users;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
};
