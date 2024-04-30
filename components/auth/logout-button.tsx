"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonPropos {
    children?: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonPropos) {
    const onClick = () => {
        logout();
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>

    );
};