"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getListFriendIds } from "@/data/listFriends";
import TableFriends from "../_components/user/tableFriends";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function FriendsPage() {
    const user = useCurrentUser();
    const [friends, setFriends] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                if (user?.id) {
                    const friendIds = await getListFriendIds(user.id);
                    if (Array.isArray(friendIds)) {
                        setFriends(friendIds);
                    } else if (friendIds.error) {
                        setError(friendIds.error);
                    }
                } else {
                    setError("User ID not found");
                }
            } catch (error) {
                setError("Error fetching friend IDs");
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [user]);

    return (
        <Table className="bg-transparent text-white ">
            <TableHeader>
                <TableRow >
                    <TableHead >Imagen</TableHead>
                    <TableHead >Nombre</TableHead>
                    <TableHead className="hidden  text-white  md:table-cell">Apellido</TableHead>
                    <TableHead className="hidden md:table-cell">País</TableHead>
                    <TableHead >Cumpleaños</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {friends.map((id) => (
                    <TableFriends key={id} id={id} />
                ))}
            </TableBody>
        </Table>
    );
}
