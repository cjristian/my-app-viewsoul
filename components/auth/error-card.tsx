import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export default function ErrorCard() {
    return (
        <CardWrapper
            headerLabel="¡Algo salio mal!"
            backButtonHref="/"
            backButtonLabel="Volver al inicio"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    );
};