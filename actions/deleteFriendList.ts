"use server";
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache'


export const deleteFriendList = async (userId: string, friendId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: { listFriends: true }
        });

        if (!user) {
            throw new Error('El usuario no existe.');
        }

        await db.friends.delete({
            where: { ownerId_friendId: { ownerId: userId, friendId } }
        });

        revalidatePath(`/friends`);
        return 'Amigo eliminado exitosamente.';
    } catch (error) {
        throw new Error(`Error al eliminar amigo: ${error}`);
    }
};
