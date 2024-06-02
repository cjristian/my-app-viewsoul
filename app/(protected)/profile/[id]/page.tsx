"use client";

import { Suspense } from "react";
import CardProfile from "../../_components/profile/principalCardProfile";
import PostProfile from "../../_components/profile/postProfile";

export default function ProfilePage({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-white p-5">
            <div className="bg-transparent rounded-full flex flex-col  items-center w-full max-w-7xl ">
                <Suspense fallback="Cargando ...">
                    <CardProfile id={id} />
                    <PostProfile id={id} />
                </Suspense>
            </div>
        </div>
    );
}
