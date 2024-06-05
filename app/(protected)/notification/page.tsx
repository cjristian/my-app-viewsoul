"use client";
import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserNotifications } from "@/data/getUserNotifications";
import { useEffect, useState } from "react";
import { Notification, ProfileUser } from "@/interfaces/user";
import { fetchFriendProfiles } from "../_functions/fetchFriendProfiles";
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch } from "@/components/ui/switch";
import { readNotifications } from "@/actions/readNotifications";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteNotification } from "@/actions/deleteNotification";

export default function NotificationPage() {
  const user = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friendProfiles, setFriendProfiles] = useState<ProfileUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [shownNotifications, setShownNotifications] = useState<Set<number>>(new Set());

  const notify = (name: string) => toast(`${name} te dio like en tu post!`);

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
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    async function fetchProfiles() {
      if (notifications.length > 0) {
        const profileIds = notifications.map(notification => notification.likerId);
        const profiles = await fetchFriendProfiles(profileIds);
        setFriendProfiles(profiles);
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [notifications]);



  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(notification => !notification.read);
    await Promise.all(unreadNotifications.map(notification => readNotifications(notification.id)));
    fetchNotifications();
  };

  const handleDelete = async (idNotification: string) => {
    await deleteNotification(idNotification); 
    setNotifications(notifications.filter(notification => notification.id !== idNotification)); 
  };

  const contador = notifications.filter(notification => !notification.read).length;

  return (
    <div>
      <Card className={cn("bg-opacity-15 w-[300px] md:w-[680px]")}>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>
            Tienes {contador} nuevas notificaciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <Button className=" md:w-full" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Marcar como todos leidos</span>
              <span className="md:hidden">Marcar todos leidos</span>
            </Button>
          </div>
          <div>

          </div>
          <div>
            {notifications.map((notification) => {
              const friend = friendProfiles.find(profile => profile.id === notification.likerId);
              const isRead = notification.read;

              if (!friend) return null;

              return (
                <ul key={notification.id} className="mb-2">
                  <div className={`flex items-center ${isRead ? 'opaco' : ''}`}>
                    <Image
                      src={friend.image ? friend.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                      alt="Friend profile picture"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full mr-2"
                    />
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="text-base md:text-lg">{friend.name} {friend.lastname} te dio like en tu post</p>
                        <p className="text-xs md:text-sm">@{friend.nickname ? friend.nickname : "No nickname"}</p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger><TrashIcon className="w-5 hover:bg-red-600 rounded-lg" /></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estas seguro de borrar esta notificacion?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(notification.id)}>Continuar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </ul>
              );
            })}
          </div>
        </CardContent>

      </Card>
    </div>
  );
}

