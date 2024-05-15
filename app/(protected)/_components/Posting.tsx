"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

type Inputs = {
    postPhoto: FileList,
    caption: string
}

export default function Posting({ post, handlePublish }: any) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: post,
    });


    return (
        <form className="flex flex-col gap-7 pb-24"  >
            <label htmlFor="photo" className="flex gap-4 items-center text-black cursor-pointer">
                {watch("postPhoto") && (
                    <Image
                        src={""}
                        alt="post"
                        width={250}
                        height={200}
                        className="object-cover rounded-lg"
                    />
                )}
                <svg data-testid="geist-icon" height="26" strokeLinejoin="round" viewBox="0 0 16 16" width="26" ><path fillRule="evenodd" clipRule="evenodd" d="M14.5 2.5H1.5V9.18933L2.96966 7.71967L3.18933 7.5H3.49999H6.63001H6.93933L6.96966 7.46967L10.4697 3.96967L11.5303 3.96967L14.5 6.93934V2.5ZM8.00066 8.55999L9.53034 10.0897L10.0607 10.62L9.00001 11.6807L8.46968 11.1503L6.31935 9H3.81065L1.53032 11.2803L1.5 11.3106V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H13.5C14.0523 13.5 14.5 13.0523 14.5 12.5V9.06066L11 5.56066L8.03032 8.53033L8.00066 8.55999ZM4.05312e-06 10.8107V12.5C4.05312e-06 13.8807 1.11929 15 2.5 15H13.5C14.8807 15 16 13.8807 16 12.5V9.56066L16.5607 9L16.0303 8.46967L16 8.43934V2.5V1H14.5H1.5H4.05312e-06V2.5V10.6893L-0.0606689 10.75L4.05312e-06 10.8107Z" fill="currentColor"></path></svg>
                <p>Upload a photo</p>
            </label>
            <input
                {...register("postPhoto", {
                    validate: (value) => {
                        if (
                            value === null ||
                            (Array.isArray(value) && value.length === 0) ||
                            value === undefined
                        ) {
                            return "A photo is required!";
                        }
                        return true;
                    },
                })}
                id="photo"
                type="file"
                style={{ display: "none" }}
            />
            {errors.postPhoto && <span>{errors.postPhoto.message}</span>}
            <div>
                <label htmlFor="caption" className="text-light-1">
                    Escribe lo que piensas
                </label>
                <textarea
                    {...register("caption", {
                        required: "Caption is required",
                        validate: (value) => {
                            if (value.length < 3) {
                                return "Caption must be more than 2 characters";
                            }
                        },
                    })}
                    
                    rows={3}
                    placeholder="What's on your mind?"
                    className="w-full input"
                    id="caption"
                />

                {errors.caption && (
                    <p className="text-red-500">{errors.caption.message}</p>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}    