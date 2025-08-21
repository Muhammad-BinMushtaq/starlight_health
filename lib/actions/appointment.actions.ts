'use server'


import { APPOINTMENT_COLLECTION_ID, database, DB_ID } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { stat } from "fs";


export const CreateAppointment = async (appointmentData: CreateAppointmentParams) => {

    try {


        const newAppointment = await database.createDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointmentData

        )

        if (newAppointment) {
            return parseStringify(newAppointment)
        }

    } catch (error) {

        console.log(error)
    }

}

export const getAppointment = async (appointmentId: string) => {
    console.log("appointment id is this ", appointmentId)
    try {
        const appointmentData = await database.getDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId

        )


        return parseStringify(appointmentData)



    } catch (error) {

        console.log(error)
    }

}

export const getRecentAppointments = async () => {
    try {
        const RecentAppointments = await database.listDocuments(
            DB_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]

        )
        const Appointments = RecentAppointments.documents
        console.log(RecentAppointments)

        //  "pending" | "scheduled" | "cancelled";
        const stats = {
            pending: 0,
            scheduled: 0,
            cancelled: 0
        }

        Appointments.forEach(doc => {
            if (doc.status === 'scheduled') stats.scheduled++
            if (doc.status === 'pending') stats.pending++
            if (doc.status === 'cancelled') stats.cancelled++
        });

        const data = {
            Appointments,
            totalAppointments: RecentAppointments.total,
            ...stats

        }
        const appointmentsData = parseStringify(data)
        console.log(appointmentsData)
        return (appointmentsData)
    } catch (error) {
        console.log(error)
    }
}

