"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import CardProfile from "@/app/(protected)/_components/profile/principalCardProfile";
import PostProfile from "@/app/(protected)/_components/profile/postProfile";

export default function ProfilePage() {
    const user = useCurrentUser();
    if (!user?.id) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="bg-gray-100 rounded-lg shadow-md flex flex-col items-center w-full max-w-4xl p-8">
                    <p>No se pudo cargar el perfil del usuario.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-white p-5">
            <div className="bg-transparent rounded-full flex flex-col  items-center w-full max-w-7xl ">
                    <CardProfile id={user?.id} />
                    <PostProfile id={user?.id} showOptions />
            </div>
        </div>
    );
}
