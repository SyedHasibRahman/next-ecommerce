"use client"
import Loader from '@/components/customUi/Loader'
import { ProductForm } from '@/components/products/ProducForm'
import React, { useEffect, useState } from 'react'

const ProductDetails = ({ params }: { params: { productId: string } }) => {
    const [loading, setLoading] = useState(true)
    const [productDetails, setProductDetails] = useState<ProductType | null>(null)
    console.log(productDetails)
    const getProductDetails = async () => {
        try {
            const res = await fetch(`/api/products/${params.productId}`, {
                method: "GET"
            })
            const data = await res.json()
            setProductDetails(data)
            setLoading(false);
        } catch (error) {
            console.log("[collection_GET]", error)
        }
    }
    useEffect(() => {
        getProductDetails();
    }, [])
    return loading ? <Loader /> : (
        <div>
            <ProductForm initialData={productDetails} />
        </div>
    )
}

export default ProductDetails