import { useEffect, useState } from "react";
import { profileUser } from "@/data/profileUser";
import { ProfileUser } from "@/interfaces/user";

export default function useProfileUser(id: string) {
    const [userFeatures, setUserFeatures] = useState<ProfileUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true); 
                const user = await profileUser(id);
                setUserFeatures(user);
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false); 
            }
        }
        fetchUser();
    }, [id]);

    return {
        userFeatures,
        loading 
    };
}
