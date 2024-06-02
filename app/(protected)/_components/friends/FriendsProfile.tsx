import { ProfileUser } from "@/interfaces/user";
import Image from 'next/image';

export const FriendProfile: React.FC<{ user: ProfileUser }> = ({ user }) => {
    return (
        <li className="mb-2">
            <div className="flex items-center">
                <Image
                    src={user.image ? user.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                    alt="Friend profile picture"
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10 rounded-full mr-2"
                />
                <div>
                    <p className="text-lg">{user.name} {user.lastname}</p>
                    <p className="text-sm text-white/70">@{user.nickname}</p>
                </div>
            </div>
        </li>
    );
};

