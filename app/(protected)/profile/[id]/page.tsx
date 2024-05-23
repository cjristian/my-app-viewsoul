"use client";

import { Suspense } from "react";
import CardProfile from "../../_components/user/cardProfile";
import PostProfile from "../../_components/user/postProfile";

export default function ProfilePage({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="flex flex-col items-center justify-center w-full text-white  rounded-lg">
            <div className="bg-transparent rounded-lg  flex flex-col md:flex-col items-center w-full h-full">
                <Suspense fallback="Cargando ...">
                    <CardProfile id={id} />
                    <PostProfile id={id} />
                </Suspense>
            </div>
        </div>
    );
}
