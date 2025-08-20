'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import CustomFormField from "../customFormField"
import { Form } from "../ui/form"
import { useRouter } from "next/navigation"
import { FormFieldName } from "./patientForm"
import { Doctors } from "@/constants"
import Image from "next/image"
import { SelectItem } from "@/components/ui/select"
import { getAppointmentSchema } from "@/lib/validation"
import { CreateAppointment } from "@/lib/actions/appointment.actions"
import SubmitButton from "../submitButton"
import { useState } from "react"




export function AppointmentForm({ type, userId, patientId }: { type: 'create' | 'cancel' | 'schedule', userId: string, patientId: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const AppointmentFormValidation = getAppointmentSchema(type)    // const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            reasonforAppointment: "",
            additionalComments: "",
            appointmentDate: new Date,

        },


    })


    const onSubmit = async function (values: z.infer<typeof AppointmentFormValidation>) {
        
        setIsLoading(true)


        let status = 'pending';
        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break


            case 'cancel':
                status = 'cancelled'
                break;



        }


        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    reasonforAppointment: values.reasonforAppointment,
                    additionalComments: values.additionalComments,
                    appointmentDate: new Date(values.appointmentDate),
                    status: status as Status
                }
                const appointment = await CreateAppointment(appointmentData)
                if (appointment) {
                    form.reset()
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }

            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }



    }


    let buttonLabel;
    switch (type) {
        case 'create':
            buttonLabel = 'Submit and continue'
            break;

        case 'cancel':
            buttonLabel = 'Cancel Appointment'
            break;

        case 'schedule':
            buttonLabel = 'Schedule Appointment'
            break
    }

    return (


        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <section className="mb-8 space-y-4">
                    <h1 className="text-4xl mb-1 font-semibold tracking-tight">Hey there👋 </h1>
                    <p className="text-gray-400  tracking-tighter">Request a new appointment in 10 seconds</p>

                </section>


                <div className="flex flex-col gap-7">
                    {

                        type === 'create' && (

                            <>

                                {/* primaryPhysician*/}
                                <CustomFormField
                                    formFieldType={FormFieldName.SELECT}
                                    control={form.control}
                                    name="primaryPhysician"
                                    label="Doctor"
                                    placeholder="Select a doctor"
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



                                {/* Reason of appointment and Additional Notes (if any)  */}
                                <div className="flex flex-col gap-4 md:flex-row xl:flex-row ">


                                    <CustomFormField
                                        formFieldType={FormFieldName.TEXTAREA}
                                        control={form.control}
                                        name="reasonforAppointment"
                                        label="Reason for Appointment"
                                        placeholder="ex: Checkup, Consultation, etc."

                                    />
                                    <CustomFormField
                                        formFieldType={FormFieldName.TEXTAREA}
                                        control={form.control}
                                        name="additionalComments"
                                        label="Additional Comments (if any)"
                                        placeholder="ex: I have a headache, I need a follow-up, etc."
                                        iconSrc=""

                                    />
                                </div>




                                {/* Appointment Date  */}

                                <CustomFormField
                                    formFieldType={FormFieldName.DATE_PICKER}
                                    control={form.control}
                                    name="appointmentDate"
                                    label="Expected appointment date"
                                    placeholder="Select a date"
                                    iconSrc="/assets/icons/calendar.svg"
                                    iconAlt="Date"
                                    showTimeSelect
                                    dateformat="MM/dd/yyyy - h:mm aa"
                                />
                            </>
                        )
                    }


                    {
                        type === 'cancel' && (

                            <CustomFormField
                                formFieldType={FormFieldName.TEXTAREA}
                                control={form.control}
                                name="cancellationReason"
                                label="Cancellation Reason"
                                placeholder="ex: I am not feeling well, I have a scheduling conflict, etc."
                            />
                        )
                    }




                </div>


                <SubmitButton isLoading={isLoading} className={` w-full ${type === 'create' ? 'bg-green-600' : 'bg-red-500'}`} >{buttonLabel}</SubmitButton>
            </form>
        </Form >
    )
}

export default AppointmentForm
