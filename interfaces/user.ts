export type User = {
    id: string;
    name?: string | null;
    lastname: string | null;
    birthdate: string | null;
    country: string | null;
    gender: string | null;
    email?: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: string;
    isTwoFactorEnabled: boolean;
}

export type ResponseError = {
    error: string;
}
export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
}

export interface Post {
    id: string;
    postText: string | null;
    postImage: string | null;
    createdAt: Date;
    likes: Like[] ;
}

export interface ProfileUser {
    id: string;
    name: string | null,
    lastname: string | null,
    birthdate: string | null,
    country: string | null,
    gender: string | null,
    image: string | null,
    nickname: string | null,
    emailVerified: Date | null,
    imageTitle: string | null

}
export interface PostProfileProps {
    id: string;
}
