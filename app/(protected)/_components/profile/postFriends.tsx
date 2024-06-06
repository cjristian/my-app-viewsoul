"use client"
import React, { useEffect } from "react";
import PostProfile from "./postProfile";
import { useFriends } from "@/app/(protected)/hooks/useFriends";

export default function PostFriends() {
  const { friends, error, refetch } = useFriends();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); 
    }, 5000); 

    return () => clearInterval(interval); 
  }, [refetch]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }


  if (friends.length === 0) {
    return <p className="text-white">¡Agrega gente en ViewSoul para ver sus posts!</p>;
  }

  return (
    <div className="space-y-4">
      {friends.map((id) => (
        <PostProfile key={id} id={id} />
      ))}
    </div>
  );
}
