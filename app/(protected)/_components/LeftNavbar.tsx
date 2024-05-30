"use client"
import Link from "next/link";
import Image from 'next/image'

import { sidebarLinks } from "@/app/(protected)/_functions/rutsMenu"
import { useCurrentUser } from "@/hooks/use-current-user";

import { BsThreeDots, BsTwitter } from 'react-icons/bs';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/actions/logout";


export default function LeftNavbar() {
    const user = useCurrentUser();
    const onClick = () => {
        logout();
    }
    return (
        <section className="fixed w-[275px] flex flex-col  items-stretch h-screen">
            <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                <Link
                    href={"/"}
                    className="p-2 text-2xl"
                >
                    <BsTwitter className="text-white" />
                </Link >

                {sidebarLinks.map((link) => {
                    return (
                        <Link
                            key={link.label}
                            href={link.route}
                            className="hover:bg-white/10 transition text-2xl duration-200  flex items-center 
                        justify-start w-fit space-x-4  rounded-3xl
                         py-2 px-6"
                        >
                            <div className="text-white">
                                {link.icon}
                            </div>

                            <div className="hidden md:block text-white text-base">{link.label}</div>
                        </Link>
                    );
                })}
                <Link className="rounded-full m-4 text-white bg-red-600
                    p-4 text-xl text-center hover:bg-opacity-95 transition duration-200"
                    href={"/create-post"}>
                    Crear post
                </Link>
            </div>

            <div className="rounded-full flex items-center space-x-2 m-4 bg-transparent p-4 text-center hover:bg-white/10
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
                        <DropdownMenuItem>Editar perfil</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onClick()}>Cerrar Sesión</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    )

}

