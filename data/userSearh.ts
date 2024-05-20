"use server";
import { db } from "@/lib/db";

export const searchUserPages = async (query: string) => {
    const ITEMS_PER_PAGE = 4;

    try {
        const count = await db.user.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { lastname: { contains: query, mode: 'insensitive' } }
            ]
          }
        });
    
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
      }
};
