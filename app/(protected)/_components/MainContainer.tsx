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
<<<<<<< HEAD
        <div className="flex-grow  overflow-auto md:mt-4 rounded bg-gradient-to-r from-black to-red-950">

            <div className="w-full   ">
                <div className="flex w-full items-center ">
                    <h1 className={`text-3xl  text-white ml-2`}>{title}</h1>
                </div>
                <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
=======
        <div className="flex-grow p-6 overflow-auto md:p-12 md:mt-4 rounded bg-gradient-to-r from-black to-red-950">

            <div className="w-full   ">
                <div className="flex w-full items-center ">
                    <h1 className={`text-3xl  text-white  ${lugrasimo.className}`}>{title}</h1>
                </div>
                    <hr className=" w-full h-1 border-none bg-gradient-to-r from-white to-red-950"/>
>>>>>>> 0ca575fabacd1e313d22ada8c2d28a8345a6f0b9

                <div className="mt-5 flex w-full justify-center ">
                    {children}
                </div>
            </div>
        </div>




    )

}