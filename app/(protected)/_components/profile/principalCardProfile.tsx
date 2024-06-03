"use client";
import { PostProfileProps } from "@/interfaces/user";

import CardProfilePicture from './cardProfilePicture';
import CardListFriends from './cardListFriends';
import CardDetails from './cardDetails';

import Link from "next/link";

export default function CardProfile({ id }: PostProfileProps) {

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            <CardProfilePicture id={id} />
            <Link
                href={"/edit-profile"}
                className="absolute slide-out-to-bottom-full right-4 flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition md:bottom-80 md:right-8 lg:bottom-80 lg:right-12 "

            >
                <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" clipRule="evenodd" d="M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z" fill="currentColor"></path></svg>            </Link>
            <div className="flex flex-col md:flex md:flex-row md:items-start md:w-full md:h-full md:p-4 md:mt-4">
                <CardDetails id={id} />
                <CardListFriends />
            </div>
        </div>
    );
}
