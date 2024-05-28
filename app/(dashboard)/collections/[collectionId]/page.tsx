"use client"

import { CollectionForm } from "@/components/collections/CollectionForm"
import Loader from "@/components/customUi/Loader"
import { useEffect, useState } from "react"


export default function CollectionDetails({ params }: { params: { collectionId: string } }) {
    const [loading, setLoading] = useState(true)
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    console.log(collectionDetails, params.collectionId)
    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
            })
            const data = await res.json()
            setCollectionDetails(data)
            setLoading(false);
        } catch (error) {
            console.log("[collection_GET]", error)
        }
    }
    useEffect(() => {
        getCollectionDetails();
    }, [])
    return loading ? <Loader /> : (
        <CollectionForm initialData={collectionDetails} />
    )
}
