"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { cn } from "@/lib/utils";
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import Menu from "./Menu";


export default function LeftNavbar() {
    const user = useCurrentUser();
    const pathname = usePathname();
    return (
        // <nav className="bg-secondary flex justify-between
        //  items-center p-4 rounded-xl w-[600px] shadow-sm" >
        //     <div className="flex gap-x-2">
        //         <Button
        //             asChild
        //             variant={pathname === "/server" ? "default" : "outline"}
        //         >
        //             <Link href="/server">
        //                 Server
        //             </Link>

        //         </Button>
        //         <Button
        //             asChild
        //             variant={pathname === "/client" ? "default" : "outline"}
        //         >
        //             <Link href="/client">
        //                 Client
        //             </Link>

        //         </Button>

        //         <Button
        //             asChild
        //             variant={pathname === "/settings" ? "default" : "outline"}
        //         >
        //             <Link href="/settings">
        //                 Opciones
        //             </Link>
        //         </Button>

        //     </div>
        //     <UserButton />
        // </nav>
        <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar">
            <Link href="/settings">
                <h1 className={cn("text-4xl font-semibold", lugrasimo.className)}>
                    <strong>View<span className='text-red-600'>Soul</span></strong></h1>
            </Link>
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2 items-center text-black">
                    <UserButton />
                    <p className="text-small-bold">{user?.name}</p>
                </div>
                <div className="flex text-black justify-between">
                    <div className="flex flex-col items-center">
                        <p className="text-lg">1</p>
                        <p className="text-sm">Posts</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg">0</p>
                        <p className="text-sm">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg">1</p>
                        <p className="text-sm">Following</p>
                    </div>
                </div>
                <hr />
                <Menu />
                <hr />
                
                <div className="flex gap-4 items-center">
                    <UserButton />
                    <strong><p className="text-black">Mange Account</p></strong>
                </div>
                <div className="flex  gap-4 items-center">
                    <LogoutButton>
                        <ExitIcon  height="32px" width="32px" />
                    </LogoutButton>
                    <p>Salir de sessión</p>
                </div>
            </div>
        </div>
    )

}

