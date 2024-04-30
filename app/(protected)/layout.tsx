import Navbar from "./_components/navbar";

interface ProtectedLayaoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayaout({ children }: ProtectedLayaoutProps) {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center 
        justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400 to-red-800 ">
            <Navbar />
            {children}
        </div>
    )
}