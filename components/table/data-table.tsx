"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import Image from "next/image"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (


        <div className=" z-10 w-full overflow-hidden rounded-lg border border-gray-950 shadow-lg">
            <Table className="rounded-lg overflow-hidden  !important;">
                <TableHeader className="bg-gray-950  border-0 ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="  text-light-200 hover:bg-transparent border-none !important;" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                className=" text-light-200 border-none !important;"
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex w-full items-center justify-between space-x-2 p-4 ">

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-none !important"
                >
                    <Image
                        src={'/assets/icons/arrow.svg'}
                        height={30}
                        width={30}
                        alt="abc"
                    />
                </Button>


                <Button
                    className="border-none !important"
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <Image
                        src={'/assets/icons/arrow.svg'}
                        height={30}
                        width={30}
                        alt="abc"
                        className="rotate-180"
                    />
                </Button>
            </div>
        </div>




    )
}