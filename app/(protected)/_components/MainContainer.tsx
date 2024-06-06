"use client";

import { usePathname } from "next/navigation";
import { pageTitles } from "@/app/(protected)/_functions/rutsMenu"
import { lugrasimo } from "@/components/fonts/lugrasimo";



export default function ManinContainer({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();

    const regex = /^\/([^\/]+)/;
    const match = currentPath.match(regex);
    const firstPath = match ? match[0] : currentPath;

    const title = pageTitles.find((page) => page.url === firstPath)?.title || "";
    return (

        <div className="flex-grow  overflow-auto md:mt-4 rounded bg-gradient-to-r from-black to-red-950">

            <div className="w-full   ">
                <div className="flex w-full items-center ">
                    <h1 className={`text-3xl  text-white ml-2`}>{title}</h1>
                </div>
                <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
                <div className="mt-5 flex w-full justify-center ">
                    {children}
                </div>
            </div>
        </div>




    )

}