"use client";

import { usePathname } from "next/navigation";
import { pageTitles } from "@/app/(protected)/_functions/rutsMenu";
import { lugrasimo } from "@/components/fonts/lugrasimo";

export default function MainContainer({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();

    const regex = /^\/([^\/]+)/;
    const match = currentPath.match(regex);
    const firstPath = match ? match[0] : currentPath;

    const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

    return (
        <div className="flex-1 flex flex-col  overflow-y-auto p-4 ml-[275px] ">
            <h1 className={`text-3xl text-white ml-2`}>{title}</h1>
            {children}
        </div>
    )
}
