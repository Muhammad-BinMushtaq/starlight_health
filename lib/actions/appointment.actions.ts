'use server'


import { APPOINTMENT_COLLECTION_ID, database, DB_ID } from "../appwrite.config";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { string } from "zod";


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
    console.log("appointment id is this ",appointmentId)
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