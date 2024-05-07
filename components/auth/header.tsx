import { cn } from "@/lib/utils";
import { lugrasimo } from "@/components/fonts/lugrasimo";
interface HeaderProps {
    label: string
}
export function Header({ label, }: HeaderProps) {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-4xl font-semibold", lugrasimo.className)}>
                <strong>View<span className='text-red-600'>Soul</span></strong></h1>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )

}