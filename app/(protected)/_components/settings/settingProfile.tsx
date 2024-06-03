"use client";

import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { SettingsProfileSchema, SettingsSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Card, CardHeader } from "@nextui-org/react";
import { CardContent } from "@/components/ui/card";
import { countries } from "@/lib/definitions";
import { CldUploadWidget } from "next-cloudinary";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { TbPhotoPlus } from "react-icons/tb";

export default function SettingProfile() {
    const user = useCurrentUser();
    const [imageUrl, setImageUrl] = useState(user?.image || undefined)

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsProfileSchema>>({
        resolver: zodResolver(SettingsProfileSchema),
        defaultValues: {
            birthdate: user?.birthdate || undefined,
            country: user?.country || undefined,
            image: user?.image || undefined,
            imageTitle: user?.imageTitle || undefined,
        }
    });
    useEffect(() => {
        form.setValue('image', imageUrl);
    }, [imageUrl, form]);

    const onSubmit = (values: z.infer<typeof SettingsProfileSchema>) => {
        // startTransition(() => {
        //     settings(values)
        //         .then((data) => {
        //             if (data.error) {
        //                 setError(data.error)
        //             }
        //             if (data.success) {
        //                 update();
        //                 setSuccess(data.success)
        //             }
        //         })
        //         .catch(() => setError("Something went wrong!"))

        // })
    }

    return (
        <CardWrapper
            headerLabel=""
            backButtonLabel="Ya tengo una cuenta"
            backButtonHref="/auth/login"
            className="max-w-full md:max-w-2xl lg:max-w-4xl mx-auto p-4"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="birthdate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de cumpleaños</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Joe Doe"
                                            type="date"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                < FormItem >
                                    <FormLabel>Pais</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleciona un pais" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {countries.map((countries) => (
                                                <SelectItem key={countries.id} value={countries.name}>{countries.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <CldUploadWidget
                                    onSuccess={(result, { widget }) => {
                                        if (result.event === 'success') {
                                            widget.close();
                                            //@ts-ignore
                                            setImageUrl(result.info?.secure_url);
                                        }
                                    }}
                                    uploadPreset="gcghsfi6"
                                    options={{ maxFiles: 1 }}
                                >
                                    {({ open }) => (
                                        <FormItem>
                                            <FormLabel>Foto de perfil</FormLabel>
                                            <div
                                                className="relative flex flex-col items-center justify-center h-40 w-40 border-2 border-dashed border-gray-300 rounded-full cursor-pointer"
                                                onClick={() => open()}
                                            >
                                                <TbPhotoPlus size={50} />
                                                {imageUrl && (
                                                    <div className="absolute inset-0 w-full h-full">
                                                        <Image
                                                            src={imageUrl}
                                                            alt="Foto de perfil"
                                                            layout="fill"
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    type="hidden"
                                                    name="image"
                                                    value={imageUrl}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                </CldUploadWidget>
                            )}
                        />

                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Crear cuenta
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}



