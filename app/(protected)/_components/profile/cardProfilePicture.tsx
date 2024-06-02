import React from 'react';
import { PostProfileProps } from "@/interfaces/user";
import useProfileUser from "../../hooks/useProfileUser";
import Image from 'next/image';
import { SkeletonCardProfilePicture } from '../skeletons';

export default function CardProfilePicture({ id }: PostProfileProps) {
    const usuario = useProfileUser(id);
    const { userFeatures } = usuario;

    const isLoading = usuario.loading;

    return (
        <div className="flex flex-col items-center mb-4 mt-20 relative z-10">
            {isLoading ? (
                <SkeletonCardProfilePicture />
            ) : (
                userFeatures.map((value) => (
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
                        <h1 className="text-1xl text-white/35">@{value.nickname ? value.nickname : "No nickname"}</h1>
                    </div>
                ))
            )}
        </div>
    );
}
