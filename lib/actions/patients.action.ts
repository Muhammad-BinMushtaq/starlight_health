"use server"
import { ID, Query } from "node-appwrite"
import { InputFile } from 'node-appwrite/file'
import { BUCKET_ID, database, DB_ID, END_POINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"




export const createUser = async (user: CreateUserParams) => {

    try {

        console.log("User creation funvtion is called now")
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name

        )

        return parseStringify(newUser)

    } catch (error: any) {
        if (error && error?.code === 409) {
            console.log(error)

            const existingUser = await users.list(
                [Query.equal("email", [user.email])],
            )
            return existingUser?.users[0] 
        } console.error("An error occurred while creating a new user:", error);
    }
}


export const getUser = async (userId: string) => {

    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error: any) {
        console.error("Error fetching user:", error)
        return null
    }
}


export const registerPatient = async ({ identificationDocument, ...patientData }: RegisterUserParams) => {

    try {

        let file;
        if (identificationDocument) {

            const blob = identificationDocument.get('blobFile') as Blob;
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Create an InputFile from the buffer
            const inputFile = InputFile.fromBuffer(

                buffer,
                identificationDocument?.get('name') as string,
            )

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        const fileUrl = file ? `${END_POINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}` : null;

        console.log({
            identificationDocumentId: file ? file.$id : null,
            identificationDocumentUrl: fileUrl,
            ...patientData,
        })




        const newPatient = await database.createDocument(
            DB_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {

                identificationDocumentId: file ? file.$id : null,
                identificationDocumentURL: fileUrl,
                ...patientData,

            }

        )

        if (newPatient) {
            return (newPatient)
        }

    } catch (error) {

        console.log(error)
    }

}


export const getPatient = async (userId: string) => {

    try {
        const patient = await database.listDocuments(
            DB_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userId', [userId])],

        )
        return parseStringify(patient?.documents[0] || null)

    } catch (error: any) {
        console.error("Error fetching user:", error)
        return null
    }
}