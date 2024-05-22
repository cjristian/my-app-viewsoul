'use client';

import { sidebarLinks } from "@/app/(protected)/_functions/rutsMenu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx';
import { ExitIcon } from "@radix-ui/react-icons";
import { logout } from "@/actions/logout";
import { useState } from "react";


export default function Menu() {
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLoggingOut(false);
        }
    };
    const pathname = usePathname();
    return (
        <>
            {sidebarLinks.map((link) => {
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={clsx(
                            'flex h-[35px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-red-100 text-red-600': pathname === link.route,
                            },
                        )}
                    >
                        <div>
                            {link.icon}
                        </div>

                        <p className="hidden md:block">{link.label}</p>
                    </Link>
                );
            })}
            <button
                onClick={handleLogout}
                disabled={loggingOut}
                className='flex h-[35px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3'
            >
                <ExitIcon height="26px" width="26px" className="w-6" />
                <span className="hidden md:block">Cerrar Sesión</span>
            </button>
        </>
    );
}