"use client";
import { CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import SettingUser from "../_components/settings/settingUser";
import SettingProfile from "../_components/settings/settingProfile";

export default function EditProfile() {
    const [activeTab, setActiveTab] = useState("User");

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-4">
                <Button
                    className={`${activeTab === "User" ? "bg-white text-gray-700 transition duration-300 ease-in-out" : "bg-black  text-white"}`}
                    onClick={() => setActiveTab("User")}
                >
                    Usuario
                </Button>
                <Button
                    className={`${activeTab === "Profile" ? "bg-white text-gray-700" : "bg-black  text-white"}`}
                    onClick={() => setActiveTab("Profile")}
                >
                    Perfil
                </Button>
            </div>
            <div>
                {activeTab === "User" && (
                    <SettingUser />
                )}
                {activeTab === "Profile" && (
                    <SettingProfile />
                )}
            </div>
        </div>
    );
}



