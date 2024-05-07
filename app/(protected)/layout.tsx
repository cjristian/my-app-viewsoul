import LeftNavbar from "./_components/LeftNavbar";
import MainContainer from "./_components/MainContainer";
import RightNavbar from "./_components/RightNavbar";

interface ProtectedLayaoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayaout({ children }: ProtectedLayaoutProps) {
    return (
        // <div className="h-full w-full flex flex-col gap-y-10 items-center 
        // justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400 to-red-800 ">
        //     <LeftNavbar />
        //     {children}
        // </div>
        <main className="flex flex-row ">
            <LeftNavbar />
            <MainContainer>
            {children}
            </MainContainer>
            <RightNavbar/>
        </main>
    )
}