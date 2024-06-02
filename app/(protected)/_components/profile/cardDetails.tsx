import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GenderIcon } from "../../_functions/genderIncons";
import { capitalizeFirstLetter } from "../../_functions/upperLetter";
import { CiCalendar, CiLocationArrow1 } from "react-icons/ci";
import { formatDate } from "@/app/(protected)/_functions/formData";
import useProfileUser from "../../hooks/useProfileUser";
import { PostProfileProps } from "@/interfaces/user";
import { SkeletonCardDetails } from "../skeletons";

export default function CardDetails({ id }: PostProfileProps) {
    const { userFeatures, loading } = useProfileUser(id);

    if (loading) {
        return <SkeletonCardDetails />;
    }

    return (
        <div className="w-full h-full md:flex md:flex-col md:items-start md:justify-center md:w-1/2 md:h-[244px] bg-gradient-to-r from-black to-red-950 p-4 md:mr-2 rounded">
            <h2 className="text-xl font-bold mb-4">Detalles</h2>
            <hr className="w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />

            {userFeatures.map((value) => (
                <div key={value.id}>
                    <div className="text-lg mb-2">
                        <GenderIcon gender={value.gender ?? ''} />
                        {capitalizeFirstLetter(value.gender ?? '')}
                    </div>
                    <div className="text-lg mb-2">
                        <LiaBirthdayCakeSolid className="inline-block mr-2" />
                        Nació el {value.birthdate ? formatDate(value.birthdate) : "No hay fecha disponible"}
                    </div>
                    <div className="text-lg mb-2">
                        <CiLocationArrow1 className="inline-block mr-2" />
                        Vive en {value.country ? value.country : "No hay país disponible"}
                    </div>
                    <div className="text-lg mb-2">
                        <CiCalendar className="inline-block mr-2" />
                        <span className='hidden md:inline-block '>Se unió a ViewSoul</span>
                        <span className='md:hidden'>En ViewSoul</span>
                        -{value.emailVerified ? new Date(value.emailVerified).toLocaleDateString() : "No hay fecha disponible"}
                    </div>
                </div>
            ))}
            <hr className="w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
        </div>
    );
}
