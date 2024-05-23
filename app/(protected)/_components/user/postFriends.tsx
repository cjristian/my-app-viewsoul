"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getListFriendIds } from "@/data/listFriends";
import PostProfile from "./postProfile";

export default function PostFriends() {
  const user = useCurrentUser();
  const [friends, setFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user?.id) {
          const friendIds = await getListFriendIds(user.id);
          if (Array.isArray(friendIds)) {
            setFriends(friendIds);
          } else if (friendIds.error) {
            setError(friendIds.error);
          }
        } else {
          setError("ID de usuario no encontrado");
        }
      } catch (error) {
        setError("Error al obtener los IDs de amigos");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <div className="space-y-4">
      {loading && <p className="text-white">Cargando...</p>}
      {error && <p className="text-white">Error: {error}</p>}
      {friends.length === 0 && !loading && !error && (
        <p className="text-white">No tienes amigos :(</p>
      )}
      {friends.length > 0 && (
        <>
          {friends.map((id) => (
            <PostProfile key={id} id={id} />
          ))}
        </>
      )}
    </div>
  );
}
