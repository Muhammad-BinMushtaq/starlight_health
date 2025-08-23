import { z } from "zod";

export const UserFormValidation = z.object({

    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});


export const PatientFormValidation = z.object({

    name: z.string().min(2, "Name must be at least 2 characters").max(50),

    email: z.string().email("Invalid email address"),

    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),


    birthDate: z.date().optional(),

    gender: z.enum(["Male", "Female", "Other"]),

    address: z.string().min(5).max(500),

    occupation: z.string().min(2).max(500),

    emergencyContactName: z.string().min(2).max(50),

    emergencyContactNumber: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),


    primaryPhysician: z.string().min(2, "Select at least one doctor"),

    insuranceProvider: z.string().min(2).max(50),

    insurancePolicyNumber: z.string().min(2).max(50),

    allergies: z.string().optional(),

    currentMedication: z.string().optional(),

    familyMedicalHistory: z.string().optional(),

    pastMedicalHistory: z.string().optional(),

    identificationType: z.string().optional(),

    identificationNumber: z.string().optional(),

    identificationDocument: z
        .array(z.instanceof(File))
        .min(1, "Please upload at least one document")
        .max(1, "Only one document allowed"),

    treatmentConsent: z
        .boolean()
        .refine((val) => val === true, { message: "You must consent to treatment in order to proceed" })
    ,
    disclosureConsent: z
        .boolean()
        .refine((val) => val === true, { message: "You must consent to disclosure in order to proceed" })
    ,
    privacyConsent: z
        .boolean()
        .refine((val) => val === true, { message: "You must consent to privacy in order to proceed" })

});




export const CreateAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    appointmentDate: z.date(),
    reasonforAppointment: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    additionalComments: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    appointmentDate: z.date(),
    reasonforAppointment: z.string().optional(),
    additionalComments: z.string().optional(),
    cancellationReason: z.string().optional(),

});

export const CancelAppointmentSchema = z.object({
    primaryPhysician: z.string().min(2, "Select at least one doctor"),
    appointmentDate: z.date(),
    reasonforAppointment: z.string().optional(),
    additionalComments: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters")
        .optional(),

});

export function getAppointmentSchema(type: string) {
    switch (type) {
        case "create":
            return CreateAppointmentSchema;
        case "cancel":
            return CancelAppointmentSchema;
        default:
            return ScheduleAppointmentSchema;
    }
}