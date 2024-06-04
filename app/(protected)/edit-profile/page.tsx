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
    CardContent,
} from "@/components/ui/card";
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
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { settings } from "@/actions/settings";

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
            gender: user?.gender as "MASCULINO" | "FEMENINO" | "OTRO" || undefined,
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
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };
    return (
        <Tabs defaultValue="account" className="w-[300px] md:w-[800px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Fotos</TabsTrigger>
                <TabsTrigger value="password">Detalles del perfil</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardContent className="space-y-2 h-[580px] md:h-[600px] md:mt-24">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <><div className="flex items-center justify-between mt-2 mb-2">
                                            <h1 className="text-xl font-semibold">Foto perfil</h1>

                                            <CldUploadWidget
                                                onSuccess={(result, { widget }) => {
                                                    if (result.event === 'success') {
                                                        widget.close();
                                                        // @ts-ignore
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
                                <hr className="md:hidden w-full h-1 border-none bg-gradient-to-r from-red-950 to-white mt-2" />
                                <FormField
                                    control={form.control}
                                    name="imageTitle"
                                    render={({ field }) => (
                                        <>
                                            <div className="flex items-center justify-between mt-9">

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
                                            <div className="flex justify-center mt-4 mb-2">
                                                <div className="relative w-96 h-36 border-2 border-dashed border-gray-300 rounded-lg ">
                                                    {imageUrl ? (
                                                        <Image
                                                            src={imageTitle ? imageTitle : "https://dummyimage.com/600x400/cccccc/808080?text=No+Image"}
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
                </Card>
            </TabsContent>

            <TabsContent value="password">
                <Card>
                    <CardContent className="space-y-2 h-[400px] md:h-[500px]">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <hr className=" w-full h-1 border-none bg-gradient-to-r from-red-950 to-white mt-2" />
                                <h1 className="text-xl font-semibold">Detalles</h1>
                                <div className="grid grid-cols-2 gap-4 md:mt-9 mb-2">
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
                                                <FormLabel className="hidden md:block">Fecha de nacimiento</FormLabel>
                                                <FormLabel className="md:hidden">F.nacimiento</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="text-black"
                                                        disabled={isPending}
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
                                                <Select onValueChange={field.onChange} defaultValue="OTRO" value={field.value} required>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={"Selecciona tu sexo"} />
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
                </Card>
            </TabsContent>
        </Tabs>
    )
}
