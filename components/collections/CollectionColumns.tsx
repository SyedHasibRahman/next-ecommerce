"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Delete } from "../customUi/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <Link href={`/collections/${row.original._id}`} className="hover:text-red-500">{row.original.title}</Link >
        // { <Link href={`/collections/${row.original._id}`} className="hover:text-red-500">  <p>{row.original.title}</p></Link> }
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
        id: "actions",
        cell: ({ row }) => <Delete item="collection" id={row.original._id} />
    },
]
/* export default function CollectionColumns() {
    return (
        <div>CollectionColumns</div>
    )
}
 */