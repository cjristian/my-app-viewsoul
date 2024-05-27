"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getListFriendIds } from "@/data/listFriends";


export function useFriends() {
  const user = useCurrentUser();
  const [friends, setFriends] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id) {
      getListFriendIds(user.id).then(friends => {
        if (Array.isArray(friends)) {
          setFriends(friends);
        } else if (friends.error) {
          setError(friends.error);
        }

        setLoading(false)
      }
      )
    }
  }, [user])

  return {
    friends, error, loading
  }

}
