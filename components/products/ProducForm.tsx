"use client"
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import { Separator } from '../ui/separator'


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import ImageUpload from '../customUi/ImageUpload'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { MultiText } from '../customUi/MultiText'
import { MultiSelect } from '../customUi/MultiSelect'
import { Delete } from '../customUi/Delete'
import Loader from '../customUi/Loader'

const formSchema = z.object({
    title: z.string().min(2).max(30),
    description: z.string().min(2).max(1500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1)
})

interface ProductFormProps {
    initialData?: ProductType | null; //must have "?" to make it optional
}
export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState<CollectionType[]>([]);

    const getCollections = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/collections", {
                method: "GET",
            })
            const data = await res.json();
            setCollections(data)
            setLoading(false)
        } catch (error) {
            console.log("[collections_GET]", error)
            toast.error("Something went wrong! Please try again.")
        }
    }
    useEffect(() => {
        getCollections();
    }, []);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? { ...initialData, collections: initialData.collections.map((collection) => collection._id) } : {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            sizes: [],
            colors: [],
            price: 0.1,
            expense: 0.1
        },
    })

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            const url = initialData ? `/api/products/${initialData._id}` : '/api/products'
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Product ${initialData ? "updated" : "created"}`);
                window.location.href = "/products"
                router.push("/products");

            }
        } catch (error) {
            console.log("[products_POST]", error)
            toast.error("Something went wrong! Please try again.")
        }
    }
    console.log("initialData", initialData)
    console.log("collections", collections)
    return loading ? <Loader /> : (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Product</p>
                    <Delete item="product" id={initialData._id} />
                </div>

            ) : (<p className='text-heading2-bold'>Create Product</p>)}

            <Separator className='my-4 bg-gray-500 border-spacing-5' />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>

                                <FormMessage className='text-red-1' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                                </FormControl>

                                <FormMessage className='text-red-1' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => field.onChange([...field.value, url])}
                                        onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url)])} />
                                </FormControl>

                                <FormMessage className='text-red-1' />
                            </FormItem>
                        )}
                    />
                    <div className='md:grid md:grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Price" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expense ($)</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Expense" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText placeholder="Tags"
                                            value={field.value}
                                            onChange={(tag) => field.onChange([...field.value, tag])}

                                            onRemove={(tagToRemove) => field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}
                                        />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                        {collections.length > 0 && (
                            <FormField
                                control={form.control}
                                name="collections"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collections</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                placeholder="Collections"
                                                collections={collections}
                                                value={field.value}
                                                onChange={(_id) => field.onChange([...field.value, _id])}

                                                onRemove={(itToRemove) => field.onChange([...field.value.filter((collectionId) => collectionId !== itToRemove)])}
                                            />
                                        </FormControl>

                                        <FormMessage className='text-red-1' />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Colors</FormLabel>
                                    <FormControl>
                                        <MultiText placeholder="Colors"
                                            value={field.value}
                                            onChange={(color) => field.onChange([...field.value, color])}

                                            onRemove={(colorToRemove) => field.onChange([...field.value.filter((color) => color !== colorToRemove)])}
                                        />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sizes</FormLabel>
                                    <FormControl>
                                        <MultiText placeholder="Sizes"
                                            value={field.value}
                                            onChange={(size) => field.onChange([...field.value, size])}

                                            onRemove={(sizeToRemove) => field.onChange([...field.value.filter((size) => size !== sizeToRemove)])}
                                        />
                                    </FormControl>

                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex gap-10'>
                        <Button type="submit" className='bg-blue-1 text-white'>Submit</Button>
                        <Button type="submit" onClick={() => router.push("/products")} className='bg-blue-1 text-white'>Discard</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
