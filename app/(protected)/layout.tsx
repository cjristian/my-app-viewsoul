import LeftNavbar from "@/app/(protected)/_components/LeftNavbar";
import MainContainer from "@/app/(protected)/_components/MainContainer";
import RightNavbar from "@/app/(protected)/_components/RightNavbar";

interface ProtectedLayaoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayaout({ children }: ProtectedLayaoutProps) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-black">
<<<<<<< HEAD
            <div className="w-full flex-none md:w-64 border-r-2">
=======
            <div className="w-full flex-none md:w-64 ">
>>>>>>> 0ca575fabacd1e313d22ada8c2d28a8345a6f0b9
                <LeftNavbar />
            </div>
            <MainContainer>
                {children}
            </MainContainer>
            {/* <div className="w-full flex-none md:w-64 "> */}
                {/* <RightNavbar /> */}
            {/* </div> */}

        </div>
    )
}