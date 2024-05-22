"use client";

import Link from "next/link";


import { cn } from "@/lib/utils";
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { useCurrentUser } from "@/hooks/use-current-user";
import Menu from "./Menu";
import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";

export default function LeftNavbar() {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }
    return (
        <nav className="flex h-full flex-col px-3 py-4 md:px-2">

            <Link
                href="/home-view"
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-50  p-4 md:h-40"
            >
                <div className="w-32 md:w-40">
                    <h1 className={cn("text-4xl font-semibold", lugrasimo.className)}>
                        <strong>View<span className='text-red-600'>Soul</span></strong></h1>
                    <div className="flex content-center justify-center text-center">
                        {/* <UserButton /> */}
                        <p className="text-small-bold">{user?.name}</p>
                    </div>
                </div>

            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                {/* <div className="flex ">
                    <div className="flex content-center">
                    <p className="text-lg">1</p>
                    <p className="text-sm">Posts</p>
                    </div>
                    <p className="text-lg">0</p>
                    <p className="text-sm">Followers</p>
                    <p className="text-lg">1</p>
                    <p className="text-sm">Following</p>
                </div> */}

                <Menu />
            </div>
        </nav>
    )

}

