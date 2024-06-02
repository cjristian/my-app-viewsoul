import { useEffect, useState } from "react";
import { profileUser } from "@/data/profileUser";
import {  ProfileUser } from "@/interfaces/user";



export default function useProfileUser(id : string) {
    const [userFeatures, setUser] = useState<ProfileUser[]>([]);
    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await profileUser(id);
                setUser(user);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUser();
    }, [id]);
    return {
        userFeatures
    };
}
