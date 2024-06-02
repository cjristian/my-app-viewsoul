import { useEffect, useState } from "react";
import Image from 'next/image';

import { profileUser } from "@/data/profileUser";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";


export default function MiniCardProfile({ id }: PostProfileProps) {

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
        <div className="flex items-center space-x-4 rounded ">
            {userFeatures.map((value) => (
                <div key={value.id} className="flex items-center">
                    <div className="rounded-full w-12 h-10 md:w-16 md:h-16">
                        <Image
                            src={value.image ? value.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                            alt="Foto de perfil"
                            width={120}
                            height={120}
                            className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                        />
                    </div>

                    <div className="flex flex-col items-start ml-2 md:ml-4">
                        <strong className="text-sm md:text-lg ">{value.name}
                         <span className=" hidden md:block">
                            {value.lastname}
                        </span>
                        </strong>
                        <strong className="text-xs md:text-sm text-white/35">@{value.nickname?value.nickname:"Nickname no disponible"}</strong>
                    </div>

                </div>
            ))}
        </div>
    );
}
