import z from "zod";

export const PatientFormValidation = z.object({
    name: z.string()
        .min(2, { message: "Username must be at least 2 characters." },
        )
        .max(50, {
            message: "Username must be at most 50 characters.",
        }),

    phone: z.string()
        .min(10, {
            message: "Phone number must be at least 10 digits.",
        })
        .refine((value) => {
            return /^\d{10}$/.test(value),{message: "Invalid Phone Number."};
        })
    ,
    email: z.string().email({
        message: "Enter a valid email address.",
    })
})