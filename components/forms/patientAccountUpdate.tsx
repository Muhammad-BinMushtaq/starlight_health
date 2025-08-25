"use client"


import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomFormField from "../customFormField"
import { Form } from "../ui/form"
import { useRouter } from "next/navigation"
import {  updateUser } from "@/lib/actions/patients.action"

import SubmitButton from "../submitButton"

import { User } from "@sentry/nextjs"



export enum FormFieldName {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
    RADIO_GROUP = "radioGroup",
}



export function PatientAccountUpdate({ user }: { user: User }) {

    const router = useRouter()

    const [disable, setDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({

        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: user ? user.name : "",
            email: user ? user.email : "",
            phone: user ? user.phone : "",
        },
    })

    const onSubmit = async (value: z.infer<typeof UserFormValidation>) => {

        if (disable) {

            setDisable(!disable)
        }
        else {
            console.log("onsubmit is called")
            setIsLoading(true);

            try {
                const userData = {
                    ...(value.name !== user.name && { name: value.name }),
                    ...(value.email !== user.email && { email: value.email }),
                    ...(value.phone !== user.phone && { phone: value.phone }),
                    userId: user.$id

                };
                const newUser = await updateUser(userData);
                if (newUser) {
                    setDisable(!disable)
                }

            } catch (error) {

                console.log("Error submitting form:", error);
            }

            finally {
                setIsLoading(false)
            }
        }

    }


    return (


        <div>



            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">





                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="name"
                        label="Full Name"
                        placeholder="Ali Khan"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="User"
                        disabled={disable}
                    />

                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="ali@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="Email"
                        disabled={disable}
                    />

                    <CustomFormField
                        formFieldType={FormFieldName.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="300 1234567"
                        disabled={disable}
                    />


                    {/* <Button type='submit'>Get Started</Button> */}
                    <SubmitButton isLoading={isLoading}>{disable ? 'Edit' : 'Update'}</SubmitButton>
                </form>
            </Form >
        </div >
    )
}

export default PatientAccountUpdate
