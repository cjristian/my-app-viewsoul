import { useEffect, useState } from "react";
import { profileUser } from "@/data/profileUser";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className=" w-screen md:w-[200px]">Imagen</TableHead>
                        <TableHead className=" w-screen md:w-[200px]">Nombre</TableHead>
                        <TableHead className=" w-screen md:w-[200px]">Apellido</TableHead>
                        <TableHead className=" w-screen md:w-[200px]">País</TableHead>
                        <TableHead className=" w-screen md:w-[200px]">Cumpleaños</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userFeatures.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.image}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.country}</TableCell>
                            <TableCell>{user.birthdate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    );
}
