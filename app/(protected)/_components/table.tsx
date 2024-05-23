"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { User } from '@/interfaces/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { fetchFilteredUser } from '@/data/fetchFilteredUser';
import { createFieldsFriend } from '@/data/addFriends';
import CryptoJS from 'crypto-js';


export default function UserTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const idUser = useCurrentUser();
    const [users, setUsers] = useState<User[]>([]);
    const [following, setFollowing] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        async function fetchData() {
            if (idUser?.id) {
                const fetchedUsers: User[] = await fetchFilteredUser(query, currentPage, idUser.id);
                setUsers(fetchedUsers);
            }
        }
        fetchData();
    }, [query, currentPage, idUser]);

    const handleFollow = async (userId: string) => {
        setFollowing((prev) => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    
        try {
            if (idUser?.id) {
                const response = await createFieldsFriend(idUser.id, userId);
                if (response.error) {
                    console.error(response.error);
                    setFollowing((prev) => ({
                        ...prev,
                        [userId]: !prev[userId]
                    }));
                } else {
                    console.log(`Se ha añadido al usuario con ID: ${userId} a la lista de amigos`);
                }
            } else {
                console.error("Error: User ID is undefined");
            }
        } catch (error) {
            console.error("Error al añadir en la lista de amigos", error);
            setFollowing((prev) => ({
                ...prev,
                [userId]: !prev[userId]
            }));
        }
    };
    


    return (
        <div className="mt-6">
            {users?.map((user) => (
                <div key={user.id} className="flex items-center border-b border-gray-200 py-2">
                    <img src={user.image ? user.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <Link href={`/profile/${user.id}`} >
                            <h3 className="font-semibold">{user.name} {user.lastname}</h3>
                        </Link>
                        <p className="text-sm text-gray-500">{user.country}</p>
                    </div>
                    <button
                        onClick={() => handleFollow(user.id)}
                        className={`ml-auto px-4 py-2 rounded ${following[user.id] ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                            } hover:${following[user.id] ? 'bg-gray-600' : 'bg-blue-600'} focus:outline-none`}
                    >
                        {following[user.id] ? 'Siguiendo' : 'Seguir'}
                    </button>
                </div>
            ))}
        </div>
    );
}
