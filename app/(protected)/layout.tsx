import LeftNavbar from "@/app/(protected)/_components/LeftNavbar";
import MainContainer from "@/app/(protected)/_components/MainContainer";
import RightNavbar from "@/app/(protected)/_components/RightNavbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

interface ProtectedLayaoutProps {
    children: React.ReactNode;
}
export default async function ProtectedLayaout({ children }: ProtectedLayaoutProps) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="w-full h-full flex justify-center items-center relative bg-black">
                <div className="max-w-screen-xl w-full h-full flex relative">
                    <LeftNavbar />
                    <div className="flex-1 flex ">
                        <MainContainer>
                            {children}
                        </MainContainer>
                    </div>
                </div>
            </div>
        </SessionProvider>
    )
}
