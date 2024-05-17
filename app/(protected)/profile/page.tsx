"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import CardProfile from "../_components/user/cardProfile";
import PostProfile from "../_components/user/postProfile";

export default function ProfilePage() {
    const user = useCurrentUser();

    if (!user?.id) {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-col items-center w-full h-full">
                    <CardProfile />
                    <p>No se pudo cargar el perfil del usuario.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-col items-center w-full h-full">
                <CardProfile />
                <PostProfile id={user?.id} />
            </div>
        </div>
    );
}
