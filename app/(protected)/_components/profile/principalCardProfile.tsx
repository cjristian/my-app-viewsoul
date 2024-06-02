"use client";

import { GenderIcon } from '../../_functions/genderIncons';
import { formatDate } from "@/app/(protected)/_functions/formData";
import { capitalizeFirstLetter } from "@/app/(protected)/_functions/upperLetter";
import { PostProfileProps } from "@/interfaces/user";
import useProfileUser from "../../hooks/useProfileUser";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { CiLocationArrow1, CiCalendar } from "react-icons/ci";

import CardProfilePicture from './cardProfilePicture';
import CardListFriends from './cardListFriends';
import CardDetails from './cardDetails';


export default function CardProfile({ id }: PostProfileProps) {
    const usuario = useProfileUser(id);
    const { userFeatures } = usuario;


    return (
        <div className="flex flex-col items-center w-full h-full relative">
            <div className="absolute top-0 left-0 w-full h-40 rounded-sm bg-gray-300"></div>
            <CardProfilePicture id={id} />
            <div className="flex flex-col md:flex md:flex-row md:items-start md:w-full md:h-full md:p-4 md:mt-4">
                <CardDetails id={id} />
                <CardListFriends />
            </div>
        </div>
    );
}
