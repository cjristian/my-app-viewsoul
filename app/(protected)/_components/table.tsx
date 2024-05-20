"use client";
import { useState, useEffect } from 'react';
import { fetchFilteredUser } from "@/data/fetchFilteredUser";
import { User } from '@/interfaces/user';
import { useCurrentUser } from '@/hooks/use-current-user';


export default function UserTable({
    query,
    currentPage,

}: {
    query: string;
    currentPage: number;

}) {
    const idUser = useCurrentUser();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            if (idUser?.id) { // Comprobamos si idUser tiene un valor antes de usarlo
                const fetchedUsers: User[] = await fetchFilteredUser(query, currentPage, idUser.id);
                setUsers(fetchedUsers);
            }
        }
        fetchData();
    }, [query, currentPage]);

    const handleFollow = (userId: string) => {
        console.log(`Siguiendo al usuario con ID: ${userId}`);
    };

    return (
        <div className="mt-6">
            {users?.map((user) => (
                <div key={user.id} className="flex items-center border-b border-gray-200 py-2">
                    <img src={user.image ? user.image : ""} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <h3 className="font-semibold">{user.name} {user.lastname}</h3>
                        <p className="text-sm text-gray-500">{user.country}</p>
                    </div>
                    <button onClick={() => handleFollow(user.id)} className="ml-auto px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">Seguir</button>
                </div>
            ))}
        </div>
    );
}
