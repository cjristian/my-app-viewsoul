import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";

import { profileUser } from "@/data/profileUser";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteFriendList } from "@/actions/deleteFriendList";

export default function TableFriends({ id }: PostProfileProps) {
    const userId = useCurrentUser();
    const [userFeatures, setUserFeatures] = useState<ProfileUser[]>([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await profileUser(id);
                setUserFeatures(user);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchUser();
    }, [id]);

    const handleDelete = async (deletedUserId: string) => {
        if (!userId || !userId.id) return;

        try {
            await deleteFriendList(userId.id, deletedUserId);
            setUserFeatures(prevUserFeatures => prevUserFeatures.filter(user => user.id !== deletedUserId));
        } catch (error) {
            console.error("Error al eliminar amigo:", error);
        }
    }

    return (
        <>
            {userFeatures.map(user => (
                <TableRow key={user.id} className="hover:bg-red-900 rounded bg-transparent " >
                    <TableCell>
                        <Image
                            src={user.image ? user.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                            alt="Friend profile picture"
                            width={40}
                            height={40}
                            className="object-cover w-10 h-10 rounded-full mr-2"
                        />
                    </TableCell>
                    <TableCell>
                        <Link
                            href={`/profile/${user.id}`}
                            className="cursor-pointer text-lg text-white hover"
                        >
                            {user.name}

                        </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.lastname ? user.lastname : "Apellido  no disponible"}</TableCell>

                    <TableCell className="hidden md:table-cell">{user.country ? user.country : "País no disponible"}</TableCell>

                    <TableCell >{user.birthdate ? user.birthdate : "Fecha de nacimiento no disponible"}</TableCell>

                    <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger><TrashIcon className="w-5 hover:bg-red-600 rounded-lg" /></AlertDialogTrigger>
                            <AlertDialogContent className="bg-cover">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className={`text-xl text-black`}>¿Estas seguro de borrar a {user.name} {user.lastname}?</AlertDialogTitle>
                                </AlertDialogHeader>

                                <AlertDialogFooter className='mt-30'>
                                    <AlertDialogCancel className={`text-1xl bg-white hover:bg-gray-400`}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(user.id)} className={`text-1xl bg-red-600 hover:bg-red-400`} >Continar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
