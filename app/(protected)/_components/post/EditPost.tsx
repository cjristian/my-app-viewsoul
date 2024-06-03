
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UpdateFormSchema } from "@/schemas";

export default function EditPost() {
    const form = useForm<z.infer<typeof UpdateFormSchema>>({
        resolver: zodResolver(UpdateFormSchema),
        defaultValues: {
            
        }
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Editar Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Post</DialogTitle>
                    <DialogDescription>
                        Editar el contenido de tu post
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        // onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Texto</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Texto"
                                                className="text-black"
                                                // disabled={isPending}
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
                                    <FormItem>
                                        <FormLabel>Foto</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Foto"
                                                className="text-black"
                                                // disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
