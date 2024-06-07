import { db } from "@/lib/db";

export const getUserByNickname = async (nickname:string) => {
    return await db.user.findUnique({
        where: {
            nickname: nickname,
        },
    });
};
