"use client";

import PostProfile from "./postProfile";
import { useFriends } from "@/app/(protected)/hooks/useFriends";

export default  function PostFriends() {

  const { friends, loading, error } = useFriends()


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
            <PostProfile key={id} id={id}  />
          ))}
        </>
      )}
    </div>
  );
}
