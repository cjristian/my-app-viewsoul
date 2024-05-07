import { sidebarLinks } from "@/app/(protected)/_functions/rutsMenu"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Menu() {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-4">
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={`flex gap-4 justify-start rounded-lg py-2 px-4 ${isActive && "bg-red-400"}`}>
                        {link.icon}
                        <p className="text-black">{link.label}</p>
                    </Link>
                )
            })}
        </div>
    )
}