"use client";

import Link from "next/link";

import { ExitIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { useCurrentUser } from "@/hooks/use-current-user";
import Menu from "./Menu";
import { logout } from "@/actions/logout";

export default function LeftNavbar() {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }

    return (
        <nav className="flex h-full flex-col px-3 py-4 md:px-2 bg-black">

            <Link
                href="/home-view"
                className="mb-2 flex h-20 items-end justify-start rounded-md   p-4 md:h-40"
            >
                <div className="w-32 md:w-40">
                    <h1 className={cn("text-4xl  text-white font-semibold", lugrasimo.className)}>
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
                <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
                <div>
                    <button
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-red-900  md:flex-none md:justify-start md:p-2 md:px-3"
                        onClick={onClick}
                    >
                        <ExitIcon height="32px" width="32px" className="w-6 text-white text-base" />
                        <div className="hidden md:block text-white">Cerrar Sesión</div>
                    </button>
                </div>
            </div>
        </nav>
    )

}

