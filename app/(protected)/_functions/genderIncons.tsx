import { BsGenderMale, BsGenderFemale, BsGenderNeuter } from "react-icons/bs";

 export const GenderIcon = ({ gender }: { gender: string }) => {
    let IconComponent;

    switch (gender) {
        case 'MASCULINO':
            IconComponent = BsGenderMale;
            break;
        case 'FEMENINO':
            IconComponent = BsGenderFemale;
            break;
        case 'OTRO':
            IconComponent = BsGenderNeuter;
            break;
        default:
            IconComponent = null;
    }

    return IconComponent ? <IconComponent className="inline-block mr-2" /> : null;
};