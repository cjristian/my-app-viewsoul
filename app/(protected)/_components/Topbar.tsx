"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Topbar() {
    const router = useRouter();
    const [search, setSearch] = useState("")

    return (
        <div className="flex justify-between items-center mt-6">
            <div className="relative">
                <input type="text"
                    className="w-full bg-dark py-3 px-5 rounded-lg focus:outline-none text-dark"
                    placeholder="Buscar personas, post ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push("/create-psot")}
            >
                Crear un post
            </Button>
            <div className="flex gap-3">
                <div className="flex  cursor-pointer items-center md:hidden">
                    <LogoutButton>
                        <ExitIcon height="32px" width="32px" />
                    </LogoutButton>

                    <Link href="/">
                        <UserButton />
                    </Link>
                </div>
            </div>

        </div>
    )
}