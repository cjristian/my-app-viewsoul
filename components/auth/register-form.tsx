'use client';

import * as z from "zod"
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image'

import { countries } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TbPhotoPlus } from "react-icons/tb"


import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";

export function RegisterForm() {
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            lastname: "",
            birthdate: "",
            country: "",
            gender: undefined,
            image: "",
            nickname: ""
        }
    })
    useEffect(() => {
        form.setValue('image', imageUrl);
    }, [imageUrl, form]);

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            register(values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                    } else {
                        setSuccess(response.success);
                    }
                })

        })
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Joe Doe"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="jongh.doe.example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Jimenez Cuenca"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthdate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="md:block hidden">Fecha de nacimiento</FormLabel>
                                    <FormLabel className="md:hidden">F.<span>nacimiento</span></FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Cuenca"
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
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleciona tu sexo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MASCULINO">Masculino</SelectItem>
                                            <SelectItem value="FEMENINO">Femenino</SelectItem>
                                            <SelectItem value="OTRO">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="md:block hidden">Nombre de usuario</FormLabel>
                                    <FormLabel className="md:hidden">Nickname</FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="cjristian_23"
                                            type="text"
                                        />
                                    </FormControl>
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
                                    options={{
                                        sources: ['local', 'url'],
                                        maxFiles: 1,
                                        clientAllowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
                                        maxImageFileSize: 9500000,
                                    }}
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
                                                            objectFit="cover"
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