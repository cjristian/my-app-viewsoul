"use client";

import { useEffect, useState } from "react";

import Image from 'next/image'

import { profileUser } from "@/data/profileUser";
import { formatDate } from "@/app/(protected)/_functions/formData";
import { capitalizeFirstLetter } from "@/app/(protected)/_functions/upperLetter";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";


export default function CardProfile({ id }: PostProfileProps) {

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
        <div className="flex flex-col items-center md:flex-row w-full h-full">

            <div className="mb-4 md:mb-0 mr-10">
                {userFeatures.map((value) => (
                    <Image
                        key={value.id}
                        src={value.image ? value.image : ""}
                        alt="Foto de perfil"
                        width={150}
                        height={150}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md"
                    />
                ))}
            </div>

            <div className="flex flex-col items-start w-full h-full">
                {userFeatures.map((value) => (
                    <div key={value.id}>
                        <h1 className="text-3xl font-bold mb-2">
                            {value.name} {value.lastname}
                        </h1>
                        <p className="text-lg mb-2"><strong>Género:</strong> {capitalizeFirstLetter(value.gender)}</p>
                        <p className="text-lg mb-2"><strong>Fecha de Nacimiento:</strong> {value.birthdate ? formatDate(value.birthdate) : "No hay fecha disponible"}</p>
                        <p className="text-lg mb-2"><strong>País:</strong> {value.country}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}
