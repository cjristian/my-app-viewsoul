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
        <div className="w-full mt-4 h-full text-white bg-transparent">
<<<<<<< HEAD
=======
        <h2 className="text-xl font-semibold mb-4">Publicaciones</h2>
>>>>>>> 0ca575fabacd1e313d22ada8c2d28a8345a6f0b9
        {userPosts.map((post) => (
            <div key={post.id} className=" rounded-lg shadow-md mb-4 border border-white">
                <MiniCardProfile id={id} />
                <div className="flex flex-col border-t-2">
                    <p className="text-lg">{post.postText}</p>
                    {post.postImage && (
                        <div className="flex justify-center mt-2 ">
                            <Image
                                src={getImagePath(post.postImage)}
                                alt="Post Image"
                                width={500}
                                height={500}
                                priority={true}
                                className="rounded"
                            />
                        </div>
                    )}
                </div>
                <p className="text-gray-300 text-sm mt-2">
                    Publicado el: {new Date(post.createdAt).toLocaleString()}
                </p>
            </div>
        ))}
    </div>
);
}