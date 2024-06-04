"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { useCurrentUser } from "@/hooks/use-current-user";
import Menu from "./Menu";
import { logout } from "@/actions/logout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDots } from 'react-icons/bs';
import Image from 'next/image'

export default function LeftNavbar() {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }

    return (
        <nav className="flex h-full flex-col px-3 py-4 md:px-2 bg-black">
            <div className="hidden md:block">
                <Link
                    href="/home-view"
                    className="mb-2 flex h-20 items-center justify-start rounded-md   p-4 md:h-40"
                >
                    <div className="w-32 md:w-40">
                        <h1 className={cn("text-4xl  text-white font-semibold", lugrasimo.className)}>
                            <strong>View<span className='text-red-600'>Soul</span></strong></h1>

                    </div>
                </Link>
            </div>
            <div className="md:hidden">
                <div className="rounded-full flex items-center space-x-2  bg-transparent p-2 text-center hover:bg-white/10
                    transition duration-200 w-full justify-between "
                >
                    <div className="flex items-center  space-x-2 text-white">
                        <h1 className={cn("text-2xl  text-white font-semibold mr-6", lugrasimo.className)}>
                            <strong>V<span className='text-red-600'>Soul</span></strong></h1>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full w-12 h-12"><Image
                                src={user?.image ? user?.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                                alt="Foto de perfil"
                                width={120}
                                height={120}
                                className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                            /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={"/edit-profile"}>
                                        Editar perfil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onClick()}>Cerrar Sesión</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="text-left text-sm">
                            <div className="font-semibold">{user?.name}</div>
                            <div className="">@{user?.nickname}</div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Menu />
                <div className="hidden h-auto w-full grow rounded-md  md:block">
                    <div className="rounded-full flex items-center space-x-2  bg-transparent p-4 text-center hover:bg-white/10
                    transition duration-200 w-full justify-between "
                    >
                        <div className="flex items-center space-x-2 text-white">
                            <Link className="rounded-full w-12 h-12"
                                href={"/profile"}>
                                <Image
                                    src={user?.image ? user?.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                                    alt="Foto de perfil"
                                    width={120}
                                    height={120}
                                    className="object-cover w-full h-full rounded-full border-2 border-white shadow-md"
                                />
                            </Link>
                            <div className="text-left text-sm">
                                <div className="font-semibold">{user?.name}</div>
                                <div className="">@{user?.nickname}</div>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger><BsThreeDots className="text-white" /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Mi perfil</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={"/edit-profile"}>
                                        Editar perfil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onClick()}>Cerrar Sesión</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav >
    )

}

