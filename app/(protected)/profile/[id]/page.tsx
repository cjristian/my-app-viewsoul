"use client";

import CardProfile from "../../_components/user/cardProfile";
import PostProfile from "../../_components/user/postProfile";

export default function ProfilePage({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-col items-center w-full h-full">
                <CardProfile id={id} />
                <PostProfile id={id} />
            </div>
        </div>
    );
}
