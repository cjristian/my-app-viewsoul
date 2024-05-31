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
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-white/10   md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-white/45 text-white': pathname === link.route,
                            },
                        )}
                    >
                        <div className="text-white">
                            {link.icon}
                        </div>

                        <p className="hidden md:block text-white text-base">{link.label}</p>
                    </Link>
                );
            })}
        </>
    );
}