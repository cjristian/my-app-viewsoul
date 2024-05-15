'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateFormSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
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
import {
    PencilSquareIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export function CreateForm() {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateFormSchema>>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues: {
            photo: "",
            text: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CreateFormSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            createPost(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }
                    // if (data?.success) {
                    //     form.reset()
                    //     setSuccess(data.success)
                    // }
                })
                .catch(() => setError("Algo ha ido mal"));
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
                            <FormItem>
                                <FormLabel>Foto</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="file"
                                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 cursor-pointer"
                                        />
                                        <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Escribe tus post
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <PencilSquareIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
                                        <Textarea
                                            placeholder="What's on your mind?"
                                            className="pl-8 resize-none"
                                            {...field}
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
                    className="w-full"
                >
                    Subir Post
                </Button>
            </form>
        </Form>

    )

}