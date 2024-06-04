"use client";

import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image'


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
    CardContent
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

import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";


export default function SettingUser() {
    const user = useCurrentUser();

    const [imageUrl, setImageUrl] = useState(user?.image || undefined)
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
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });
    useEffect(() => {
        form.setValue('image', imageUrl);
    }, [imageUrl, form]);

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }
                    if (data.success) {
                        update();
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))

        })
    }

    return (
        <Card className="w-[600px]  bg-white">
            <CardHeader>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row justify-center">
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
                                                <FormLabel className="text-bold text-xl">Foto de perfil</FormLabel>
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
                            {/* <FormField
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
                                        <FormItem className="flex flex-row items-center
                                    justify-between rounded-lg p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Two Factor Authentication</FormLabel>
                                                <FormDescription className="text-gray-400">Autentificar a través del email</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                >

                                                </Switch>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
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
                                            <SelectContent >
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
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                        >

                            Guardar
                        </Button>
                    </form>

                </Form>

            </CardContent>
        </Card >

    )
}



