"use client"

import { DataTable } from "@/components/customUi/DataTable"
import Loader from "@/components/customUi/Loader"
import { columns } from "@/components/products/ProductColumns"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function Products() {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductType[]>([])

    const router = useRouter();
    const getProducts = async () => {

        try {
            const res = await fetch("/api/products", {
                method: "GET",
            })
            const data = await res.json()
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.log("products_GET", error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])
    return loading ? <Loader /> : (
        <div className="px-10 py-5">
            <div className='flex items-center justify-between'>
                <p className='text-heading2-bold'>Products</p>
                <Button className='bg-blue-1 text-white' onClick={() => router.push("/products/new")}>
                    <Plus className='h-4 w-4 mr-2' /> Create Products
                </Button>
            </div>
            <Separator className='bg-grey-1 my-4' />
            <DataTable columns={columns} data={products} searchKey="title" />
        </div>
    )
}
