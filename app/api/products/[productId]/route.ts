import Collection from "@/lib/models/Collection";
import product from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        await connectToDB();

        const product = await Product.findById(params.productId).populate({ path: "collections", model: Collection })
        // console.log(params.productId)
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "product not found" }), { status: 404 })
        }

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        console.log("[productId_GET]", error)
        return new NextResponse("Internal error", { status: 500 })

    }
}

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "unauthorized" }), { status: 401 })
        }
        await connectToDB();
        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 })
        }

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json()
        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create a new products", { status: 400 })
        }

        const addedCollections = collections.filter((collection: string) => !product.collection.includes(collection))

        const removeCollections = product.collections.filter((collectionId: string) => !collections.includes(collectionId))
        // Update  collection 
        await Promise.all([
            // Update added collection with this product 
            ...addedCollections.map((collectionId: string) => Collection.findByIdAndUpdate(collectionId, {
                $push: { products: product._id }
            })),
            // update remove collections without this products
            ...removeCollections.map((collectionId: string) => Collection.findByIdAndDelete(collectionId, {
                $pull: { products: product._id }
            })),
        ]);
        //update Product
        const updateProduct = await Product.findByIdAndUpdate(product._id, {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense
        }, { new: true }).populate({ path: "collections", model: Collection });

        await updateProduct.save();

        return new NextResponse(JSON.stringify({ message: "Product updated successfully" }), { status: 200 })
    } catch (error) {
        console.log("[productId_POST]", error)
        return new NextResponse("Internal error", { status: 500 })

    }
}