import { useEffect, useState } from "react";
import Image from 'next/image'

import MiniCardProfile from "./miniCardProfile";
import { PostProfileProps, Post } from "@/interfaces/user";
import { getPostUser } from "@/data/postUser";
import { getImagePath } from "@/utils/index";
import { postFormatDate } from "../../_functions/formData";
import { BsThreeDots } from 'react-icons/bs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditPost from "../post/EditPost";

export default function PostProfile({ id, showOptions }: PostProfileProps & { showOptions?: boolean }) {
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
            {userPosts.map((post) => (
                <div key={post.id} className="rounded-lg shadow-md bg-black/35 mb-4">
                    <div className="flex items-center">
                        <MiniCardProfile id={id} />
                        <p className="text-gray-300 text-xs ml-2 mt-1  md:text-sm mb-5 md:ml-3">
                            . {postFormatDate(new Date(post.createdAt))}
                        </p>
                        {showOptions && (
                            <div className="ml-auto mr-3 rounded-full bg-black p-0 md:p-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <BsThreeDots className="text-white" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <EditPost />
                                        <DropdownMenuItem>Borrar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                                        objectFit="cover"
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
