"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "@/components/status"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModel from "../AppointmentModel"
import { Appointment } from "@/types/appwrite.types"



export const columns: ColumnDef<Appointment>[] = [
    {

        header: "Id",
        cell({ row }) {
            return (<p>{row.index + 1}</p>)

        },

    },

    {

        header: "Name",
        cell({ row }) {
            return (<p className="text-14 font-medium">{row.original.patient.name}</p>)
        }

    },
    {
        header: "Status",
        cell({ row }) {
            return (
                <div className="w-full">
                    <StatusBadge status={row.original.status} />
                </div>
            )
        }
    },


    {
        header: "Appointment",
        cell({ row }) {
            return (<p className="text-14 min-w-[100px] font-medium" > {formatDateTime(row.original.appointmentDate).dateTime}</p>)
        }
    },
    {

        header: "Email",
        cell({ row }) {
            return (<p className="text-14 font-medium">{row.original.patient.email}</p>)
        }


    },
    {
        header: "Doctor",

        cell: ({ row }) => {

            const docter = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
            return <div className="flex items-center flex-row gap-1">
                <Image
                    src={docter?.image!}
                    height={100}
                    width={100}
                    alt="img"
                    className="size-8"
                />
                <p className="font-medium">{docter?.name}</p>

            </div>
        },
    },


    {
        id: 'actions',
        header: () => <div className="pl-4">Actions</div>,
        cell({ row: { original: data } }) {
            
            return (
                <div className="flex ">
                    <AppointmentModel
                        patientId={data.patient.$id}
                        userId={data.userId}
                        appointment={data}
                        type='schedule' />

                    <AppointmentModel
                        patientId={data.patient.$id}
                        userId={data.userId}
                        appointment={data}
                        type='cancel' />
                </div>
            )
        },

    }
]