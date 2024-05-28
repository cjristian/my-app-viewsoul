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
                    <Image
                        src={value.image ? value.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                        alt="Foto de perfil"
                        width={50}
                        height={50}
                        objectFit="cover"
                        className="rounded-full  border-4 border-white shadow-md my-2"
                    />
                    <div className="flex flex-col items-start ml-4">
                        <strong className="text-lg">{value.name} {value.lastname}</strong>
                    </div>
                   
                </div>
            ))}
        </div>
    );
}
