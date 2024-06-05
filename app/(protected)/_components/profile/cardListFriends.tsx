import { ProfileUser } from "@/interfaces/user";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { profileUser } from "@/data/profileUser";
import { useFriends } from "../../hooks/useFriends";
import { SkeletonCardListFriends } from "../skeletons";
import { fetchFriendProfiles } from "../../_functions/fetchFriendProfiles";
import Link from "next/link";



export default function CardListFriends() {
    const listFriends = useFriends();
    const { friends } = listFriends;
    const [friendProfiles, setFriendProfiles] = useState<ProfileUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfiles() {
            const profiles = await fetchFriendProfiles(friends);
            setFriendProfiles(profiles);
            setLoading(false);
        }
        fetchProfiles();
    }, [friends]);

    if (loading) {
        return <SkeletonCardListFriends />;
    }

    return (
        <div className="w-full h-full  bg-transparent md:flex md:flex-col md:items-start md:w-1/2 md:h-[244px] md:bg-red-950 p-4 md:mt-0 mt-2 md:ml-2 rounded-sm overflow-y-scroll">
            <h2 className="text-xl font-bold mb-4">Friends</h2>
            <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
            <ul>
                {friendProfiles.length === 0 && <p className="text-white/70 text-center mt-4">Agrega amigos en ViewSoul</p>}
                {friendProfiles.map((friend) => (
                    <li key={friend.id} className="mb-2">
                        <Link
                            href={`/profile/${friend.id}`}
                        >
                            <div className="flex items-center">
                                <Image
                                    src={friend.image ? friend.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                                    alt="Friend profile picture"
                                    width={40}
                                    height={40}
                                    className="object-cover w-10 h-10 rounded-full mr-2"
                                />
                                <div>
                                    <p className="text-base md:text-lg">{friend.name} {friend.lastname}</p>
                                    <p className="text-xs md:text-sm text-white/70">@{friend.nickname ? friend.nickname : "No nickname"}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
