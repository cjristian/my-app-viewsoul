"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import CardProfile from "@/app/(protected)/_components/user/cardProfile";
import PostProfile from "@/app/(protected)/_components/user/postProfile";
import { Suspense } from "react";

export default function ProfilePage() {
    const user = useCurrentUser();
    if (!user?.id) {
        return (
            <div className="flex flex-col items-center justify-center w-full">
                <div className="bg-gray-100  rounded-lg shadow-md flex flex-col md:flex-col items-center w-full h-full">
                    <p>No se pudo cargar el perfil del usuario.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full text-white  rounded-lg">
            <div className="bg-transparent rounded-lg  flex flex-col md:flex-col items-center w-full h-full">

                <Suspense fallback="Cargando ...">
                    <CardProfile id={user?.id} />
                    <PostProfile id={user?.id} />
                </Suspense>
            </div>
        </div>
    );
}
