'use server'


import { APPOINTMENT_COLLECTION_ID, database, DB_ID, messaging } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";


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
    // console.log("appointment id is this ", appointmentId)
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
        // console.log("This getappointmets list ", appointmentsData)
        return (appointmentsData)
    } catch (error) {
        console.log(error)
    }
}

export const updateAppointment = async ({ appointment, userId, appointmentId, type }: UpdateAppointmentParams) => {
    try {

        const updatedAppointment = await database.updateDocument(
            DB_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment

        )
        // console.log("updated Appoinedmet after database call of type ", updatedAppointment)

        if (!updatedAppointment) {
            throw new Error("Appointment not found")
        }
        else {


            const content = `This message has been sent from Starlight Health to
                ${type === 'schedule' ? `You appointment has been scheduled with Doctor ${appointment.primaryPhysician} on ${formatDateTime(appointment.appointmentDate).dateTime}` :
                    `We are regret to inform you that Your appintment has been canceled with Doctor ${appointment.primaryPhysician} Due to Reason ${appointment.cancellationReason}`
                } `

            const sendMessage = await sendSMS(content, userId)

            revalidatePath('/admin')
            return parseStringify(updatedAppointment)

        }

    } catch (error) {
        console.log(error)
    }
}

export const sendSMS = async (content: string, userId: string) => {
    try {
        const sms = messaging.createSms(
            ID.unique(),
            content,
            [userId],
            []

        )
        return sms

    } catch (error) {
        console.log(error)
    }
}