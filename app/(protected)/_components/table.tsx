"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { User } from '@/interfaces/user';
import { useCurrentUser } from '@/hooks/use-current-user';
import { fetchFilteredUser } from '@/data/fetchFilteredUser';
import { createFieldsFriend } from '@/actions/addFriends';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import router from 'next/router';



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
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

console.log(users);

    return (
        <div className="mt-6">
            {users?.map((user) => (
                <div key={user.id} className="flex items-center border-b border-gray-200 py-2">
                    <div className="rounded-full w-12 h-10 md:w-16 md:h-16">
                        <Image
                            src={user.image ? user.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                            alt="Foto de perfil"
                            width={120}
                            height={120}
                            className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                        />
                    </div>
                    <div>
                        <Link href={`/profile/${user.id}`} >
                            <h3 className="ml-2 font-semibold text-white"> {user.name} {user.lastname}</h3>
                        </Link>
                        <p className="ml-2 text-sm text-gray-500">{user.nickname?`@${user.nickname}`:" No tiene nickname"}</p>
                    </div>
                    <Button
                        onClick={() => handleFollow(user.id)}
                        className={`ml-auto px-3 py-2 rounded-lg ${following[user.id] ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'
                            } hover:${following[user.id] ? 'bg-gray-600' : 'bg-red-700'} focus:outline-none`}
                    >
                        {following[user.id] ? 'Siguiendo' : 'Seguir'}
                    </Button>
                </div>
            ))}
        </div>
    );
}
