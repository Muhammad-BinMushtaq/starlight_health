
import AppointmentForm from '@/components/forms/appointmentForm'

import { getPatient, getUser } from '@/lib/actions/patients.action'
import Image from 'next/image'


const newAppointment = async ({ params }: { params: Promise<{ userId: string }> }) => {
  
    const { userId } = await params
    const patient = await getPatient(userId)

    return (
        <div className="flex flex-col lg:flex-row max-h-screen overflow-hidden">

            {/* Left Side (Form Section) */}
            <section className="flex-1  px-6 py-10 lg:py-16 lg:px-12">


                <div className="max-w-[860px] w-full mx-auto justify-between flex flex-col gap-6">
                    {/* Logo */}
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={40}
                        width={160}
                        alt="Starlight Health Logo"
                        className="mb-6"
                    />

                    {/* Appointment Form */}
                    <AppointmentForm
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                    />



                </div>
            </section>

            {/* Right Side (Image Section) - hidden on small screens */}
            {/* <div className="hidden lg:block lg:w-1/2 h-full "> */}
            <Image
                src="/assets/images/appointment-img.png"
                height={1000}
                width={1000}
                alt="Appointment Image"
                className="hidden lg:block h-full w-full max-w-[390px] object-cover rounded-l-2xl"
            />
            {/* </div> */}
        </div>
    )
}

export default newAppointment