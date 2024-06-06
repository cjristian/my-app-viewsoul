import { getUserNotifications } from "@/data/getUserNotifications";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { Notification } from "@/interfaces/user";


export function useNotifications() {
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

    return {
        notifications,
        fetchNotifications,
        setNotifications
    }
}