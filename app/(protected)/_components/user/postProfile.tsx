"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'

import MiniCardProfile from "./miniCardProfile";
import { PostProfileProps, Post } from "@/interfaces/user";
import { getPostUser } from "@/data/postUser";
import { getImagePath } from "@/utils/index";


export default function PostProfile({ id }: PostProfileProps) {
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const posts = await getPostUser(id);
                setUserPosts(posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    }, [id]);

    return (
        <div className="w-full mt-4 h-full">
            <h2 className="text-xl font-semibold mb-4"> Publicaciones</h2>
            {userPosts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <MiniCardProfile id={id} />
                    <p className="text-lg">{post.postText}</p>
                    {post.postImage && (
                        <Image
                            src={getImagePath(post.postImage)}
                            alt="Post Image"
                            width={300}
                            height={200}
                            priority={true}
                            className="mt-2 max-w-full h-auto"
                        />
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                        Publicado el: {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
