'use client';

import { sidebarLinks } from "@/app/(protected)/_functions/rutsMenu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx';


export default function Menu() {
    const pathname = usePathname();
    return (
        <>
            {sidebarLinks.map((link) => {
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3',
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
        </>
    );
}