import LeftNavbar from "@/app/(protected)/_components/LeftNavbar";
import MainContainer from "@/app/(protected)/_components/MainContainer";
import RightNavbar from "@/app/(protected)/_components/RightNavbar";

interface ProtectedLayaoutProps {
    children: React.ReactNode;
}
export default function ProtectedLayaout({ children }: ProtectedLayaoutProps) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-black">

            <div className="w-full flex-none md:w-64 border-r-2">


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