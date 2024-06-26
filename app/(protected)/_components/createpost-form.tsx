'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";

import { CreateFormSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createPost } from "@/actions/createpost";

import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TbPhotoPlus } from "react-icons/tb"

import Image from 'next/image'
import { useRouter } from "next/navigation"



export function CreateForm() {
    const router = useRouter()
    const user = useCurrentUser()
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<z.infer<typeof CreateFormSchema>>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues: {
            userId: user?.id,
            photo: "",
            text: "",

        },
    });
    useEffect(() => {
        form.setValue('photo', imageUrl);
    }, [imageUrl, form]);

    const onSubmit = async (values: z.infer<typeof CreateFormSchema>) => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        if (values.photo === "" && values.text === "") {
            setError("Debe proporcionar al menos una imagen o un texto para crear una publicación");
            setIsLoading(false);

            return;
        }
        startTransition(() => {
            createPost(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                        router.push('/profile');
                    }
                })
                .catch(() => setError("Algo salió mal al subir el post"));
        });

    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <CldUploadWidget
                                onSuccess={(result, { widget }) => {
                                    if (result.event === 'success') {
                                        widget.close()
                                        //@ts-ignore
                                        setImageUrl(result.info?.secure_url);

                                    }
                                }}
                                uploadPreset="gcghsfi6"
                                options={{
                                    sources: ['local', 'url'],
                                    maxFiles: 1,
                                    clientAllowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
                                    maxImageFileSize: 9500000,


                                }}
                            >
                                {({ open }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-base">Subir Imagen  </FormLabel>
                                        <div className="relative cursor-pointer rounded hover:bg-gradient-to-r from-black to-red-900 transition p-10
                                    border-neutral-300 flex flex-col justify-center items-center gap-4
                                    text-white bg-transparent"
                                            onClick={() => open()}
                                        >
                                            <TbPhotoPlus
                                                size={50}
                                            />
                                            <p className="text-lg font-semibold">Agregar Imagen</p>
                                            {imageUrl && (
                                                <div className="absolute inset-0 w-full h-full">
                                                    <Image
                                                        fill
                                                        style={{ objectFit: 'contain' }}
                                                        src={imageUrl}
                                                        alt="Imagen Producto"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                type="hidden"
                                                name="photo"
                                                value={imageUrl}
                                            />
                                        </FormControl>

                                    </FormItem>
                                )}
                            </CldUploadWidget>
                        )}

                    />
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white text-base">
                                    Escribe tus post
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <PencilSquareIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-white peer-focus:text-white" />
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="What's on your mind?"
                                            className="pl-8 resize-none bg-gradient-to-r text-white from-black to-red-950"

                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    type="submit"
                    size={"lg"}
                    disabled={isLoading}
                    className="m-auto bg-red-900 hover:bg-red-800 "
                >
                    {isLoading ? 'Cargando...' : 'Subir Post'}
                </Button>
            </form>
        </Form>

    )

}

