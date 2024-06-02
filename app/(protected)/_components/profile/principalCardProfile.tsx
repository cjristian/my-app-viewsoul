import { PostProfileProps } from "@/interfaces/user";

import CardProfilePicture from './cardProfilePicture';
import CardListFriends from './cardListFriends';
import CardDetails from './cardDetails';
import { HiOutlinePencilSquare } from "react-icons/hi2";

import Link from "next/link";

export default function CardProfile({ id }: PostProfileProps) {

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            <CardProfilePicture id={id} />
            <Link
                href={"/edit-profile"}
                className="absolute slide-out-to-bottom-full right-4 flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 transition md:bottom-80 md:right-8 lg:bottom-80 lg:right-12 "

            >
                <HiOutlinePencilSquare className="text-2xl" />
            </Link>
            <div className="flex flex-col md:flex md:flex-row md:items-start md:w-full md:h-full md:p-4 md:mt-4">
                <CardDetails id={id} />
                <CardListFriends />
            </div>
        </div>
    );
}
