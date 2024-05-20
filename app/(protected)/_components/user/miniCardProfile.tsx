import { useEffect, useState } from "react";
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
        <div className="flex items-center space-x-4">
            {userFeatures.map((value) => (
                <div key={value.id} className="flex items-center">
                    <img
                        src={value.image ? value.image : "https://via.placeholder.com/150"}
                        alt="Foto de perfil"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-md m-2"
                    />
                    <div className="flex flex-col items-start">
                        <strong className="text-lg">{value.name} {value.lastname}</strong>
                    </div>
                </div>
            ))}
        </div>
    );
}
