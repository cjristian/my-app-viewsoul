"use client";

import Image from 'next/image';
import { formatDate } from "@/app/(protected)/_functions/formData";
import { capitalizeFirstLetter } from "@/app/(protected)/_functions/upperLetter";
import { PostProfileProps } from "@/interfaces/user";
import { useFriends } from "../../hooks/useFriends";
import useProfileUser from "../../hooks/useProfileUser";
import { FriendProfile } from '../friends/FriendsProfile';


export default function CardProfile({ id }: PostProfileProps) {
    const usuario = useProfileUser(id);
    const { userFeatures } = usuario;
    const listFriends = useFriends();
    const { friends } = listFriends;
    console.log(friends);
    // const friendProfiles = friends.map((friendId) => {
    //     const { userFeatures } = useProfileUser(friendId);
    //     return userFeatures.length > 0 ? userFeatures[0] : null;
    // });
    return (
        <div className="flex flex-col items-center w-full h-full relative">
            <div className="absolute top-0 left-0 w-full h-40 rounded-sm bg-gray-300"></div>

            <div className="flex flex-col items-center mb-4 mt-20 relative z-10">
                {userFeatures.map((value) => (
                    <div className="flex flex-col items-center" key={value.id}>
                        <div className="rounded-full w-32 h-32 mb-2">
                            <Image
                                src={value.image ? value.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                                alt="Foto de perfil"
                                width={120}
                                height={120}
                                className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                            />
                        </div>
                        <h1 className="text-3xl font-bold">{value.name} {value.lastname}</h1>
                        <h1 className="text-1xl text-white/35">@{value.nickname}</h1>
                    </div>
                ))}
            </div>

            <div className="flex flex-row items-start w-full h-full p-4 mt-4">
                <div className="flex flex-col items-start w-1/2 h-full bg-slate-400 p-4 mr-2 rounded">
                    {userFeatures.map((value) => (
                        <div key={value.id}>
                            <p className="text-lg mb-2"><strong>Género:</strong> {capitalizeFirstLetter(value.gender)}</p>
                            <p className="text-lg mb-2"><strong>Fecha de Nacimiento:</strong> {value.birthdate ? formatDate(value.birthdate) : "No hay fecha disponible"}</p>
                            <p className="text-lg mb-2"><strong>País:</strong> {value.country}</p>
                            <p className="text-lg mb-2"><strong>Con viewSoul desde:</strong> {value.emailVerified ? new Date(value.emailVerified).toLocaleDateString() : ""}</p>
                        </div>
                    ))}
                </div>
                {/* <div className="flex flex-col items-start w-1/2 h-full bg-slate-400 p-4 ml-2 rounded-sm overflow-y-scroll">
                    <h2 className="text-xl font-bold mb-4">Friends</h2>
                    <ul>
                        {friendProfiles.map((friend) => (
                            friend ? <FriendProfile key={friend.id} user={friend} /> : null
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    );
}
