"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import MiniCardProfile from "../_components/user/miniCardProfile";
import { getListFriendIds } from "@/data/listFriends";

export default function ServerPage() {
    const user = useCurrentUser();
    const [friends, setFriends] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
            if (user?.id) {
                try {
                    const friendIds = await getListFriendIds(user.id);
                    if (Array.isArray(friendIds)) {
                        setFriends(friendIds);
                    } else if (friendIds.error) {
                        setError(friendIds.error);
                    }
                } catch (error) {
                    setError("Error fetching friend IDs");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {friends.map((id) => (
                <MiniCardProfile key={id} id={id} />
            ))}
        </div>
    );
}
