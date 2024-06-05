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

export default function NotificationPage() {
  const user = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friendProfiles, setFriendProfiles] = useState<ProfileUser[]>([]);
  const [loading, setLoading] = useState(true);
  const notify = () => toast("Wow so easy!");

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
      const profileIds = notifications.map(notification => notification.likerId);
      const profiles = await fetchFriendProfiles(profileIds);
      setFriendProfiles(profiles);
      setLoading(false);
    }
    fetchProfiles();
  }, [notifications]);
const contador = notifications.length;
  return (
    <div>
      <Card className={cn("w-[680px]")}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Tienes {contador} nuevas notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Send notifications to device.</p>
            </div>
          </div>
          <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
          </div>
          <div>
            {friendProfiles.map((friend) => (
              <ul key={friend.id} className="mb-2">
                <div className="flex items-center">
                  <Image
                    src={friend.image ? friend.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=200"}
                    alt="Friend profile picture"
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-base md:text-lg">{friend.name} {friend.lastname} Te dio like en tu post</p>
                    <p className="text-xs md:text-sm">@{friend.nickname ? friend.nickname : "No nickname"}</p>
                  </div>
                </div>
              </ul>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
