import { useEffect, useState } from "react";
import Image from 'next/image';

import { profileUser } from "@/data/profileUser";
import { PostProfileProps, ProfileUser } from "@/interfaces/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MiniCardProfile({ id }: PostProfileProps) {

    const [userFeatures, setUser] = useState<ProfileUser[]>([]);
    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await profileUser(id);
                setUser(user);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchUser();
    }, [id]);

    return (
        <>
            {userFeatures.map((value) => (
                <div className="flex items-center justify-between space-x-4 w-full" key={value.id}>
                    <div>
                        <span>{value.name}</span>
                        {/* <span>{value.nickname}</span> */}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            ))}
        </>
    );
}
