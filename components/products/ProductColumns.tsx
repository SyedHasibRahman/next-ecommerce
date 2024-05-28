"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Delete } from "../customUi/Delete"
import Link from "next/link"

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <Link href={`/products/${row.original._id}`} className="hover:text-red-500">{row.original.title}</Link >
        // { <Link href={`/collections/${row.original._id}`} className="hover:text-red-500">  <p>{row.original.title}</p></Link> }
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "collections",
        header: "Collections",
        cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
    },
    {
        accessorKey: "price",
        header: "Price ($)",
    },
    {
        accessorKey: "expense",
        header: "Expense ($)",
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="product" id={row.original._id} />
    },
]
/* export default function CollectionColumns() {
    return (
        <div>CollectionColumns</div>
    )
}
 */