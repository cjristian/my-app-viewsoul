import { Suspense } from "react";
import { CreateForm } from "../_components/createpost-form"

export default function CreatePost() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md  w-full h-full">
                <div className="w-full">
                    <Suspense fallback="Cargando ...">
                        <CreateForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
