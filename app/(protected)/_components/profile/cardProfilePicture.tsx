import { PostProfileProps } from "@/interfaces/user";
import useProfileUser from "../../hooks/useProfileUser";
import Image from 'next/image';
import { SkeletonCardProfilePicture, SkeletonFrontPage } from '../skeletons';

export default function CardProfilePicture({ id }: PostProfileProps) {
    const usuario = useProfileUser(id);
    const { userFeatures } = usuario;

    const isLoading = usuario.loading;

    return (
        <>
            {isLoading ? (
                <SkeletonFrontPage />
            ) : (
                <div className="absolute top-0 left-0 w-full h-80 rounded bg-gradient-to-r from-black to-red-950">
                    {userFeatures.map((value) => (
                         <Image
                         key={value.id}
                         src={value.imageTitle ? value.imageTitle : "https://dummyimage.com/800x400/cccccc/000000&text=Cover+Image"}
                         alt="Foto de portada"
                         layout="fill"
                         className="rounded"
                         priority={true} 
                     />

                    ))}
                </div>
            )}

            <div className="flex flex-col items-center mb-4 mt-44 relative z-10">
                {isLoading ? (
                    <SkeletonCardProfilePicture />
                ) : (
                    userFeatures.map((value) => (
                        <div className="flex flex-col items-center" key={value.id}>
                            <div className="rounded-full w-32 h-32 mb-2">
                                <Image
                                    src={value.image ? value.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                                    alt="Foto de perfil"
                                    width={120}
                                    height={120}
                                    className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                                />
                            </div>
                            <h1 className="mt-2 text-xl md:text-3xl font-bold">{value.name} {value.lastname}</h1>
                            <h1 className="text-1xl text-white/35">@{value.nickname ? value.nickname : "No nickname"}</h1>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
