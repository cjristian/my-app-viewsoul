export type User = {
    id: string;
    name: string | null;
    lastname: string | null;
    birthdate: Date | null;
    country: string | null;
    gender: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: string;
    isTwoFactorEnabled: boolean;
}

export type ResponseError = {
    error: string;
}