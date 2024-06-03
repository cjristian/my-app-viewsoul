"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'

import MiniCardProfile from "./miniCardProfile";
import { PostProfileProps, Post } from "@/interfaces/user";
import { getPostUser } from "@/data/postUser";
import { getImagePath } from "@/utils/index";
import { postFormatDate } from "../../_functions/formData";
import EditPost from "../post/EditPost";
import { SkeletonPostProfile } from "../skeletons";

export default function PostProfile({ id, showOptions }: PostProfileProps & { showOptions?: boolean }) {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function fetchPosts() {
            try {
                const posts = await getPostUser(id);
                setUserPosts(posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); 
            }
        }

        fetchPosts();
    }, [id]);

    const handlePostUpdate = (updatedPost: Post) => {
        setUserPosts(prevPosts =>
            prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
        );
    };

    const handlePostDelete = (postId: string) => {
        setUserPosts(prevPosts =>
            prevPosts.filter(post => post.id !== postId)
        );
    };

    return (
        <div className="w-full mt-4 h-full text-white bg-transparent">
            {loading && <SkeletonPostProfile showOptions={showOptions} />}
            {userPosts.map((post) => (
                <div key={post.id} className="rounded-lg shadow-md bg-black/35 mb-4">
                    <div className="flex items-center">
                        <MiniCardProfile id={id} />
                        <p className="text-gray-300 text-xs ml-2 mt-1  md:text-sm mb-5 md:ml-3">
                            . {postFormatDate(new Date(post.createdAt))}
                        </p>
                        {showOptions && (
                            <div className="ml-auto mr-3 rounded-full bg-black p-0 md:p-1">
                                <EditPost
                                    id={post.id}
                                    postText={post.postText ?? ""}
                                    postImage={post.postImage ?? ""}
                                    createdAt={post.createdAt}
                                    onPostUpdate={handlePostUpdate}
                                    onPostDelete={handlePostDelete}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg text-white">{post.postText}</p>
                        {post.postImage && (
                            <div className="relative flex justify-center w-full mt-2">
                                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128 max-w-lg">
                                    <Image
                                        src={getImagePath(post.postImage)}
                                        alt="Post Image"
                                        layout="fill"
                                        priority={true}
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div >
    );
}
