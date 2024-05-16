"use client";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function CardProfile() {
    const user = useCurrentUser();
    const userProfile = {
        firstName: "John",
        lastName: "Doedasdasdsadas",
        gender: "Male",
        birthday: "1990-01-01",
        country: "United States",
        profilePic: "https://via.placeholder.com/150",
    };

    const userPosts = [
        {
            id: 1,
            content: "¡Hola mundo!",
            date: "2024-05-16",
        },
        {
            id: 2,
            content: "Estoy disfrutando de mi día.",
            date: "2024-05-17",
        },
    ];

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-col items-center w-full h-full">
            <div className="flex flex-col items-center md:flex-row w-full h-full">
                <div className="mb-4 md:mb-0 mr-10">
                    <img
                        src={userProfile.profilePic}
                        alt="Foto de perfil"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md"
                    />
                </div>

                <div className="flex flex-col items-start w-full h-full">
                    <h1 className="text-3xl font-bold mb-2">
                        {user?.name} {userProfile.lastName}
                    </h1>
                    <p className="text-lg mb-2"><strong>Género:</strong> {userProfile.gender}</p>
                    <p className="text-lg mb-2"><strong>Fecha de Nacimiento:</strong> {userProfile.birthday}</p>
                    <p className="text-lg mb-2"><strong>País:</strong> {userProfile.country}</p>
                </div>
            </div>

            <div className="w-full mt-4 h-full">
                <h2 className="text-xl font-semibold mb-4">Mis Publicaciones</h2>
                {userPosts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <p className="text-lg">{post.content}</p>
                        <p className="text-gray-500 text-sm mt-2">{post.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
