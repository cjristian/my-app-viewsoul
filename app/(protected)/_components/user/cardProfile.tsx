"use client";

import Image from 'next/image';
import { GenderIcon } from '../../_functions/genderIncons';
import { formatDate } from "@/app/(protected)/_functions/formData";
import { capitalizeFirstLetter } from "@/app/(protected)/_functions/upperLetter";
import { PostProfileProps } from "@/interfaces/user";
import useProfileUser from "../../hooks/useProfileUser";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { CiLocationArrow1, CiCalendar } from "react-icons/ci";
import CardListFriends from './CardListFriends';
import { Suspense } from 'react';
import SkeletonCardListFriends from '../skeleton/SkeletonCardListFriends';


export default function CardProfile({ id }: PostProfileProps) {
    const usuario = useProfileUser(id);
    const { userFeatures } = usuario;



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
                        <h1 className="text-1xl text-white/35">@{value.nickname ? value.nickname : "No nickname"}</h1>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex md:flex-row md:items-start md:w-full md:h-full md:p-4 md:mt-4">
                <div className="w-full h-full md:flex md:flex-col md:items-start md:justify-center md:w-1/2 md:h-[244px] bg-gradient-to-r from-black to-red-950 p-4 md:mr-2 rounded ">
                    <h2 className="text-xl font-bold mb-4">Detalles</h2>
                    <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />

                    {userFeatures.map((value) => (
                        <div key={value.id}>
                            <div className="text-lg mb-2">
                                <GenderIcon gender={value.gender ?? ''} />
                                {capitalizeFirstLetter(value.gender ?? '')}
                            </div>
                            <div className="text-lg mb-2">
                                <LiaBirthdayCakeSolid className="inline-block mr-2" />
                                Nació el {value.birthdate ? formatDate(value.birthdate) : "No hay fecha disponible"}
                            </div>
                            <div className="text-lg mb-2">
                                <CiLocationArrow1 className="inline-block mr-2" />
                                Vive en {value.country ? value.country : "No hay país disponible"}
                            </div>
                            <div className="text-lg mb-2">
                                <CiCalendar className="inline-block mr-2" />
                                <span className='hidden md:inline-block '>Se unió a ViewSoul</span>
                                <span className='md:hidden'>En ViewSoul --- </span>
                                -{value.emailVerified ? new Date(value.emailVerified).toLocaleDateString() : "No hay fecha disponible"}
                            </div>
                        </div>
                    ))}
                    <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />

                </div>
                <Suspense fallback={<SkeletonCardListFriends />}>
                    <CardListFriends />
                </Suspense>
            </div>
        </div>
    );
}
