'use client';

import { sidebarLinks } from "@/app/(protected)/_functions/rutsMenu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { Notification } from "@/interfaces/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserNotifications } from "@/data/getUserNotifications";

export default function Menu() {
    const user = useCurrentUser();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const fetchNotifications = async () => {
        if (user?.id) {
            const notificaciones = await getUserNotifications({ userId: user?.id });
            if (notificaciones.error) {
                console.error(notificaciones.error);
                setNotifications([]);
            } else {
                setNotifications(notificaciones.notifications as Notification[]);
            }
        }
    };
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(() => {
            fetchNotifications();
        }, 5000);

        return () => clearInterval(interval);
    }, [user]);
    const pathname = usePathname();
    const contador = notifications.filter(notification => !notification.read).length;

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
                            {link.label === "Notificaciones" ? (
                                <div className="relative">
                                    {link.icon}
                                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">{contador}</div>
                                </div>
                            ) : (
                                link.icon
                            )}
                        </div>
                        <p className="hidden md:block text-white text-base">{link.label}</p>
                    </Link>
                );
            })}

        </>

    );
}
