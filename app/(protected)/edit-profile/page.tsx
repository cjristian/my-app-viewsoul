"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image';

import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { SettingsSchema } from "@/schemas";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
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
import { countries } from "@/lib/definitions";

import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";


export default function SettingUser() {
    const user = useCurrentUser();

    const [imageUrl, setImageUrl] = useState(user?.image || undefined);
    const [imageTitle, setImageTitle] = useState(user?.imageTitle || undefined);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            lastname: user?.lastName || undefined,
            nickname: user?.nickname || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            image: user?.image || undefined,
            imageTitle: user?.imageTitle || undefined,
            birthdate: user?.birthdate || undefined,
            country: user?.country || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });

    useEffect(() => {
        form.setValue('image', imageUrl);
    }, [imageUrl, form]);

    useEffect(() => {
        form.setValue('imageTitle', imageTitle);
    }, [imageTitle, form]);

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        // startTransition(() => {
        //     settings(values)
        //         .then((data) => {
        //             if (data.error) {
        //                 setError(data.error);
        //             }
        //             if (data.success) {
        //                 update();
        //                 setSuccess(data.success);
        //             }
        //         })
        //         .catch(() => setError("Something went wrong!"));
        // });
        console.log(values)
    };

    return (
        <Card className="w-full md:w-[600px] bg-white mx-auto">
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <><div className="flex items-center justify-between mt-2">
                                    <h1 className="text-xl font-semibold">Foto de perfil</h1>
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
                                            <Button className="ml-4" onClick={() => open()}>
                                                Editar
                                            </Button>
                                        )}
                                    </CldUploadWidget></div><div className="flex justify-center mt-4">
                                        <div className="relative w-36 h-36 border-2 border-dashed border-gray-300 rounded-full overflow-hidden">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt="Foto de perfil"
                                                    layout="fill"
                                                    className="object-cover" />
                                            ) : (
                                                <TbPhotoPlus size={50} className="m-auto" />
                                            )}
                                        </div>
                                    </div></>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center justify-between mt-2">
                                        <h1 className="text-xl font-semibold">Foto de portada</h1>
                                        <CldUploadWidget
                                            onSuccess={(result, { widget }) => {
                                                if (result.event === 'success') {
                                                    widget.close();
                                                    //@ts-ignore
                                                    setImageTitle(result.info?.secure_url);
                                                }
                                            }}
                                            uploadPreset="gcghsfi6"
                                            options={{ maxFiles: 1 }}
                                        >
                                            {({ open }) => (
                                                <Button className="ml-4" onClick={() => open()}>
                                                    Editar
                                                </Button>
                                            )}
                                        </CldUploadWidget>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <div className="relative w-96 h-36 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageTitle ? imageTitle : "https://res.cloudinary.com/dk5b3j3jw/image/upload/v1635730004/cover-default.jpg"}
                                                    alt="Foto de perfil"
                                                    layout="fill"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <TbPhotoPlus size={50} className="m-auto" />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        />
                        <hr className=" w-full h-1 border-none bg-gradient-to-r from-red-950 to-white mt-2" />
                        <h1 className="text-xl font-semibold">Detalles</h1>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
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
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Jimenez Sarango"
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
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nickname</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="@cjristian"
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
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de nacimiento</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="text-black"
                                                disabled={isPending}
                                                type="date"
                                                defaultValue={user?.birthdate || ""}

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
                                                    <SelectValue placeholder={user?.country ? user.country : "Selecciona un pais"} />
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
                                                    <SelectValue placeholder={user?.gender ? user.gender : "Selecciona tu sexo"} />
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

                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="jhon.doe@example.com"
                                                        disabled={isPending}
                                                        type="email"
                                                        className="text-black"
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
                                                        placeholder="XXXXXX"
                                                        disabled={isPending}
                                                        className="text-black"
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nueva contraseña</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="XXXXXX"
                                                        disabled={isPending}
                                                        type="password"
                                                        className="text-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            {user?.isOAuth === false && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription className="text-gray-400">
                                                    Autentificar a través del email
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        {/* <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un rol" className="text-black" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={UserRole.USER}>
                                                Usuario
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="mt-2"
                        >
                            Guardar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}
