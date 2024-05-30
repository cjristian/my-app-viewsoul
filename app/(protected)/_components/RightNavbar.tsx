"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useEffect } from "react";



export default function RightNavbar() {


    return (
        <div className="hidden lg:flex fixed right-0 top-0 w-[275px] flex-col items-stretch h-screen overflow-y-auto bg-black">
            <div className="flex flex-col gap-4">
                <strong><h4 className="text-xl text-white">Personas que quizás conozcas</h4></strong>
                <div className="flex flex-col gap-4">
                    {/* Aquí puedes renderizar la lista de usuarios */}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <strong><h4 className="text-xl text-white">Siguiendo</h4></strong>
                <div className="flex flex-col gap-4">

                </div>
            </div>
        </div>
    );
}
