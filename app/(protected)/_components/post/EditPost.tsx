"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Post } from "@/interfaces/user";
import { useEffect, useState, useTransition } from "react";
import { UpdateFormSchema } from "@/schemas";
import { updatePost } from "@/actions/updatePost";

import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, } from "@nextui-org/react";
import { deletePost } from "@/actions/deletePost";

import { TbPhotoPlus } from "react-icons/tb";
import { BsThreeDots } from 'react-icons/bs';


interface EditPostProps {
    id: string;
    postText: string;
    postImage: string;
    createdAt: Date;
    onPostUpdate: (updatedPost: Post) => void;
    onPostDelete: (postId: string) => void;
}

export default function EditPost({ id, postText, postImage, createdAt, onPostUpdate, onPostDelete }: EditPostProps) {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState(postImage || "");
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const form = useForm<z.infer<typeof UpdateFormSchema>>({
        resolver: zodResolver(UpdateFormSchema),
        defaultValues: {
            id: id,
            text: postText || "",
            photo: postImage || "",
            createdAt: new Date(),
        },
    });

    useEffect(() => {
        form.setValue("photo", imageUrl);
    }, [imageUrl, form]);

    const onSubmit = async (values: z.infer<typeof UpdateFormSchema>) => {
        values.createdAt = new Date();
        setError("");
        setSuccess("");
        setIsLoading(true);
        if (values.photo === "" && values.text === "") {
            setError("Debe proporcionar al menos una imagen o un texto para crear una publicación");
            setIsLoading(false);
            return;
        }
        startTransition(() => {
            updatePost(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setSuccess(data.success);
                        onPostUpdate({
                            id: values.id,
                            postText: values.text,
                            postImage: values.photo,
                            createdAt: values.createdAt,
                        } as Post);
                        onOpenChange();
                    }
                })
                .catch(() => setError("Something went wrong!"))
                .finally(() => setIsLoading(false));
        });
    };

    const handleRemoveImage = () => {
        setImageUrl("");
        form.setValue("photo", "");
    };

    const handleDelete = async () => {
        setError("");
        setSuccess("");
        setIsLoading(true);
        try {
            const data = await deletePost(id);
            if (data.error) {
                setError(data.error);
            }
            if (data.success) {
                setSuccess(data.success);
                onPostDelete(id);
                onOpenChange();
            }
        } catch (error) {
            setError("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onPress={onOpen} size="sm" className="rounded-full p-0">
                <BsThreeDots className="text-black" />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="bg-black/85 text-white"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Editar post
                            </ModalHeader>
                            <ModalBody>
                                <Form {...form}>
                                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-2 py-4">
                                            <FormField
                                                control={form.control}
                                                name="text"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Texto</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="text-black"
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="photo"
                                                render={({ field }) => (
                                                    <>
                                                        <CldUploadWidget
                                                            onSuccess={(result, { widget }) => {
                                                                if (result.event === "success") {
                                                                    widget.close();
                                                                    //@ts-ignore
                                                                    setImageUrl(result.info?.secure_url);
                                                                }
                                                            }}
                                                            uploadPreset="gcghsfi6"
                                                            options={{
                                                                maxFiles: 1,
                                                            }}
                                                        >
                                                            {({ open }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-base">Subir Imagen</FormLabel>
                                                                    <div
                                                                        className="relative cursor-pointer rounded bg-slate-400 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-white"
                                                                        onClick={() => open()}
                                                                    >
                                                                        <TbPhotoPlus size={50} />
                                                                        <p className="text-lg font-semibold">Agregar Imagen</p>
                                                                        {imageUrl && (
                                                                            <div className="absolute cursor-pointer inset-0 w-full h-full">
                                                                                <Image
                                                                                    fill
                                                                                    style={{ objectFit: "contain" }}
                                                                                    src={imageUrl}
                                                                                    alt="Imagen Producto"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </FormItem>
                                                            )}
                                                        </CldUploadWidget>
                                                        {imageUrl && (
                                                            <Button onClick={handleRemoveImage}>
                                                                Quitar Imagen
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <FormError message={error} />
                                        <FormSuccess message={success} />
                                        <div className="flex justify-between">
                                            <Button type="submit" disabled={isLoading} className="mr-2">
                                                Guardar cambios
                                            </Button>
                                            <Button color="danger" onPress={handleDelete} disabled={isLoading}>
                                                Borrar Post
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
