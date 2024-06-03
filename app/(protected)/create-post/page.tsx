import { CreateForm } from "../_components/createpost-form"


export default function CreatePost() {
    return (
        <div className="flex flex-col items-center justify-center w-full ">
            <div className="bg-transparent p-4 rounded-lg shadow-md  w-full h-full">
                <div className="w-full">
                        <CreateForm />
                </div>
            </div>
        </div>
    );
}
