"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import MiniCardProfile from "./miniCardProfile";
import { PostProfileProps, Post } from "@/interfaces/user";
import { getPostUser } from "@/data/postUser";
import { getImagePath } from "@/utils/index";
import { postFormatDate } from "../../_functions/formData";
import EditPost from "../post/EditPost";
import { SkeletonPostProfile } from "../skeletons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getLikes } from "@/data/getLikes";
import { giveLike } from "@/actions/giveLike";
import { deleteLike } from "@/actions/deleteLike";

export default function PostProfile({ id, showOptions }: PostProfileProps & { showOptions?: boolean }) {
    const user = useCurrentUser();
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [iconStates, setIconStates] = useState<{ [key: string]: boolean }>({});
    const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        async function fetchPosts() {
            try {
                const posts = await getPostUser(id);
                setUserPosts(posts);
                const initialIconStates = posts.reduce((acc, post) => {
                    acc[post.id] = post.likes.some(like => like.userId === user?.id);
                    return acc;
                }, {} as { [key: string]: boolean });
                const initialLikeCounts = posts.reduce((acc, post) => {
                    acc[post.id] = post.likes.length;
                    return acc;
                }, {} as { [key: string]: number });
                setIconStates(initialIconStates);
                setLikeCounts(initialLikeCounts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [id, user?.id]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedLikeCounts: { [key: string]: number } = {};
            for (const post of userPosts) {
                const response = await getLikes(post.id);
                if (typeof response === 'number') {
                    updatedLikeCounts[post.id] = response;
                } else {
                    console.error(response.error);
                }
            }
            setLikeCounts(prevLikeCounts => ({
                ...prevLikeCounts,
                ...updatedLikeCounts
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, [userPosts]);


    const handlePostUpdate = (updatedPost: Post) => {
        setUserPosts(prevPosts =>
            prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
        );
    };

    const handlePostDelete = (postId: string) => {
        setUserPosts(prevPosts =>
            prevPosts.filter(post => post.id !== postId)
        );
        setIconStates(prevIconStates => {
            const newIconStates = { ...prevIconStates };
            delete newIconStates[postId];
            return newIconStates;
        });
        setLikeCounts(prevLikeCounts => {
            const newLikeCounts = { ...prevLikeCounts };
            delete newLikeCounts[postId];
            return newLikeCounts;
        });
    };

    const toggleIconState = async (postId: string) => {
        if (!user?.id) {
            console.error("User not authenticated");
            return;
        }

        const newState = !iconStates[postId];
        setIconStates(prevIconStates => ({
            ...prevIconStates,
            [postId]: newState
        }));

        try {
            if (newState) {
                const result = await giveLike({ userId: user.id, postId });
                if (result.error) {
                    console.error(result.error);
                } else {
                    setLikeCounts(prevLikeCounts => ({
                        ...prevLikeCounts,
                        [postId]: prevLikeCounts[postId] + 1
                    }));
                }
            } else {
                const result = await deleteLike({ userId: user.id, postId });
                if (result.error) {
                    console.error(result.error);
                } else {
                    setLikeCounts(prevLikeCounts => ({
                        ...prevLikeCounts,
                        [postId]: (prevLikeCounts[postId] ?? 0) - 1
                    }));
                }
            }
        } catch (error) {
            console.error("Error toggling like state:", error);
        }
    };

    return (
        <div className="w-full mt-4 h-full text-white bg-transparent">
            {loading && <SkeletonPostProfile showOptions={showOptions} />}
            {userPosts.map((post) => (
                <div key={post.id} className="rounded-lg shadow-md bg-black/35 mb-4">
                    <div className="flex items-center">
                        <MiniCardProfile id={id} />
                        <p className="text-gray-300 text-xs ml-2 mt-1 md:text-sm mb-5 md:ml-3">
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
                                        objectFit="cover"
                                        className="rounded"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex ">
                        <div className="flex gap-4 items-center">
                            <button onClick={() => toggleIconState(post.id)}>
                                {iconStates[post.id] ? (
                                    <svg className="transition-all duration-500 transform hover:scale-125" data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                                        <path d="M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z" fill="currentColor"></path>
                                    </svg>
                                ) : (
                                    <svg className="transition-all duration-500 transform hover:scale-125" data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z" fill="currentColor"></path>
                                    </svg>
                                )}
                            </button>
                            <p className="text-white">{likeCounts[post.id]} Likes</p>
                        </div>
                        <div className="ml-3 flex gap-4 items-center">
                            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M2.8914 10.4028L2.98327 10.6318C3.22909 11.2445 3.5 12.1045 3.5 13C3.5 13.3588 3.4564 13.7131 3.38773 14.0495C3.69637 13.9446 4.01409 13.8159 4.32918 13.6584C4.87888 13.3835 5.33961 13.0611 5.70994 12.7521L6.22471 12.3226L6.88809 12.4196C7.24851 12.4724 7.61994 12.5 8 12.5C11.7843 12.5 14.5 9.85569 14.5 7C14.5 4.14431 11.7843 1.5 8 1.5C4.21574 1.5 1.5 4.14431 1.5 7C1.5 8.18175 1.94229 9.29322 2.73103 10.2153L2.8914 10.4028ZM2.8135 15.7653C1.76096 16 1 16 1 16C1 16 1.43322 15.3097 1.72937 14.4367C1.88317 13.9834 2 13.4808 2 13C2 12.3826 1.80733 11.7292 1.59114 11.1903C0.591845 10.0221 0 8.57152 0 7C0 3.13401 3.58172 0 8 0C12.4183 0 16 3.13401 16 7C16 10.866 12.4183 14 8 14C7.54721 14 7.10321 13.9671 6.67094 13.9038C6.22579 14.2753 5.66881 14.6656 5 15C4.23366 15.3832 3.46733 15.6195 2.8135 15.7653Z" fill="currentColor"></path></svg>
                            <p className="text-white">0 Comentarios</p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
