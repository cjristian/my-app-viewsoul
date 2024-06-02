"use client";

import TableFriends from "../_components/profile/tableFriends";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useFriends } from "../hooks/useFriends";

export default function FriendsPage() {
    const { friends, loading, error } = useFriends();
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : friends.length === 0 ? (
                <p>No tienes amigos</p>
            ) : (
                <Table className="bg-transparent text-white ">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Imagen</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="hidden text-white md:table-cell">Apellido</TableHead>
                            <TableHead className="hidden md:table-cell">País</TableHead>
                            <TableHead>Cumpleaños</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {friends.map((id) => (
                            <TableFriends key={id} id={id} />
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

