"use client";
import { useState, useEffect, Suspense } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getListFriendIds } from "@/data/listFriends";
import TableFriends from "../_components/user/tableFriends";
import Skeleton from "../_components/skeleton"; // Importa el componente Skeleton

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ServerPage() {
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

    if (loading) {
        // Muestra el indicador de carga mientras se cargan los datos
        return (
            <Suspense fallback={<Skeleton />}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Imagen</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>País</TableHead>
                            <TableHead>Cumpleaños</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Renderiza el Skeleton para cada fila de la tabla */}
                        <TableRow>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </TableRow>
                    </TableBody>
                </Table>
            </Suspense>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>País</TableHead>
                    <TableHead>Cumpleaños</TableHead>
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
