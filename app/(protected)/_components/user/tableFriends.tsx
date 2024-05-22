import { useEffect, useState } from "react";
import { profileUser } from "@/data/profileUser";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";


import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

export default function TableFriends({ id }: PostProfileProps) {

    const [userFeatures, setUser] = useState<ProfileUser[]>([]);
    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await profileUser(id);
                setUser(user);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchUser();
    }, [id]);

    return (
        <>
            {userFeatures.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.image}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.birthdate}</TableCell>
                </TableRow>
            ))}
        </>
    )
}
