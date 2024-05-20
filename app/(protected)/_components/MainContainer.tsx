"use client";

import { usePathname } from "next/navigation";
import { pageTitles } from "@/app/(protected)/_functions/rutsMenu"



export default function ManinContainer({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();

    const regex = /^\/([^\/]+)/;
    const match = currentPath.match(regex);
    const firstPath = match ? match[0] : currentPath;

    const title = pageTitles.find((page) => page.url === firstPath)?.title || "";
    return (
        <div className="flex-grow p-6 overflow-auto md:p-12">

            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl">{title}</h1>
                </div>

                <div className="mt-5 flex w-full justify-center">
                    {children}
                </div>
            </div>
        </div>




    )

}