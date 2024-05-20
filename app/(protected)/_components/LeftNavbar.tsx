"use client";

import Link from "next/link";

import { ExitIcon } from "@radix-ui/react-icons";

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
                        <UserButton />
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
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

                <div>
                    <button
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
                        onClick={onClick}
                    >
                        <ExitIcon height="32px" width="32px" className="w-6" />
                        <div className="hidden md:block">Cerrear Sesión</div>
                    </button>
                </div>
            </div>
        </nav>
    )

}

