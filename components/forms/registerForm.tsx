"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import CustomFormField from "../customFormField"
import { Form, FormControl } from "../ui/form"
import { useRouter } from "next/navigation"
import { FormFieldName } from "./patientForm"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@radix-ui/react-label"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import Image from "next/image"
import { SelectItem } from "@/components/ui/select"
import FileUploader from "../fileUploader"
import { Button } from "../ui/button"
import { PatientFormValidation } from "@/lib/validation"
import { registerPatient } from "@/lib/actions/patients.action"
import { useState } from "react"
import SubmitButton from "../submitButton"




export function RegisterForm({ user }: { user: User }) {

    const router = useRouter()


    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: PatientFormDefaultValues,


    })


    const onSubmit = async function (values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true)
        const formData = new FormData();

        if (values.identificationDocument && values.identificationDocument.length > 0) {

            const blobFile = new Blob([values.identificationDocument[0]],
                { type: values.identificationDocument[0].type })

            formData.append('blobFile', blobFile)
            formData.append('name', values.identificationDocument[0].name)


        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                identificationDocument: formData,


            }

            const newPatient = await registerPatient(patientData)
            if (newPatient) {
                router.push(`/patients/${user.$id}/appointment`)

            }

        } catch (error) {

            console.log("Error submitting form:", error);
        }

        finally {
            setIsLoading(false)
        }


    }




    return (


        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <section className="mb-8 space-y-4">
                    <h1 className="text-4xl mb-1 font-semibold tracking-tight">Welcome👋 </h1>
                    <p className="text-gray-400  tracking-tighter">Welcome to Starlight Health</p>
                    <h1 className="text-3xl mb-2 mt-8 font-bold tracking-tight">Personal Information</h1>
                </section>



                {/* Full name */}
                <CustomFormField
                    formFieldType={FormFieldName.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Ali Khan"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User"

                />


                {/* Phone and email */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">
                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="ali@gmail.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="Email"
                    />

                    <CustomFormField
                        formFieldType={FormFieldName.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone Number"
                        placeholder="300 1234567"

                    />
                </div>


                {/* Date picker and gender */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">
                    <CustomFormField
                        formFieldType={FormFieldName.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                        placeholder="DD/MM/YYYY"
                        iconSrc="/assets/icons/calendar.svg"
                        iconAlt="Date"
                    />

                    <CustomFormField
                        formFieldType={FormFieldName.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex rounded-md border-2 border-gray-800 bg-gray-900 p-2"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>


                                    {
                                        GenderOptions.map((option) => (
                                            <div key={option} className="flex cursor-pointer items-center gap-3">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option}>{option}</Label>
                                            </div>

                                        ))
                                    }




                                </RadioGroup>
                            </FormControl>
                        )}


                    />
                </div>


                {/* Address and occupation */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">
                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Ex:14 street,New York"
                    />

                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Ex: Software Engineer"

                    />
                </div>


                {/* Emergency contactName and contactNumber */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">



                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency Contact Name"
                        placeholder="Guardian Name"

                    />
                    <CustomFormField
                        formFieldType={FormFieldName.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency ContactNumber"
                        placeholder="300 1234567"
                        iconSrc=""

                    />
                </div>


                {/* Medical information */}
                <h1 className="text-3xl space-y-4 mt-8 font-bold tracking-tight">Medical Information</h1>

                {/* PRIMARY CARE PHYSICIAN */}
                <CustomFormField
                    formFieldType={FormFieldName.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary care physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor, i) => (

                        <SelectItem key={doctor.name + i} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    width={32}
                                    height={32}
                                    alt="doctor"
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>


                {/* Insurance provider and insurance policy Number */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">


                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Ex: Starlight Health Insurance"

                    />
                    <CustomFormField
                        formFieldType={FormFieldName.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="ABC123456789"
                        iconSrc=""

                    />
                </div>


                {/* Allergies (if any ) and Current mediacation  */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">


                    <CustomFormField
                        formFieldType={FormFieldName.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="  Ex: Penicillin, Nuts"

                    />
                    <CustomFormField
                        formFieldType={FormFieldName.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication"
                        placeholder="Current Medication"
                        iconSrc=""

                    />
                </div>



                {/* Family medical history and Past medical history  */}
                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">


                    <CustomFormField
                        formFieldType={FormFieldName.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label=" Family Medical History"
                        placeholder="Ex: Diabetes, Hypertension"

                    />
                    <CustomFormField
                        formFieldType={FormFieldName.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label=" Past Medical History"
                        placeholder="  Ex: Previous surgeries"
                        iconSrc=""

                    />
                </div>


                {/* Identification and Verfication */}
                <h1 className="text-3xl space-y-4 mb-8 mt-8 font-bold tracking-tight">Identification and Verfication</h1>


                {/* Verification Type*/}
                <CustomFormField
                    formFieldType={FormFieldName.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Verification Type"
                    placeholder="Birth Certificate"
                >
                    {IdentificationTypes.map((value, i) => (

                        <SelectItem key={value + i} value={value}>

                            {value}

                        </SelectItem>
                    ))}
                </CustomFormField>

                {/* Identification Number */}
                <CustomFormField
                    formFieldType={FormFieldName.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="Ex: 1234567890" />


                {/* IDentification  Document upload */}


                <CustomFormField
                    formFieldType={FormFieldName.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scaned copy of Identification Document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader
                                files={field.value || []}
                                onChange={field.onChange}

                            />
                        </FormControl>
                    )}

                />

                {/* consent checkboxes */}
                <h1 className="text-3xl space-y-4 mb-8 mt-8 font-bold tracking-tight">Consent and privacy</h1>

                <div className="flex flex-col gap-4 ">
                    <CustomFormField
                        formFieldType={FormFieldName.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to take treatment " />

                    <CustomFormField
                        formFieldType={FormFieldName.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I agree to the terms and conditions" />

                    <CustomFormField
                        formFieldType={FormFieldName.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I agree to the privacy terms and conditions" />
                </div>



                <SubmitButton isLoading={isLoading} className="bg-green-600 w-full"  >Get Started</SubmitButton>
            </form>
        </Form >
    )
}

export default RegisterForm
