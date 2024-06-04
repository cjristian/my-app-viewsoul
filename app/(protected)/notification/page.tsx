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
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserNotifications } from "@/data/getUserNotifications";
import { useEffect, useState } from "react";
import { Notification } from "@/interfaces/user";
import { postFormatDate } from "../_functions/formData";



export default function NotifocationPage() {
  const user = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
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
    }
    fetchNotifications();
  }, [user]);
  return (
    <Card className={cn("w-[680px]")}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((values) => (
            <div>
              <p>{values.likerId} liked your post</p>
              <p>{values.postId}</p>
              <p>{postFormatDate(new Date(values.createdAt))}</p>

            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

