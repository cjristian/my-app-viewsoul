"use client";

import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import { pageTitles } from "@/app/(protected)/_functions/rutsMenu"

interface PageTitle {
    url: string;
    title: string;
}

export default function ManinContainer({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();

    const regex = /^\/([^\/]+)/;
    const match = currentPath.match(regex);
    const firstPath = match ? match[0] : currentPath;

    const title = pageTitles.find((page) => page.url === firstPath)?.title || "";
    return (
        <section className="felx flex-col flex-1 max-w-3xl px-4 md:px-10 lg:px-4 xl:px-20">
            <Topbar />
            <div className="mt-6 mb-20">
                <h1 className="mb-5 text-black max-sm:text-black">{title}</h1>
                <div className="h-screen ">
                    {children}
                </div>
            </div>
        </section>
    )

}