import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Success = async ({ params, searchParams }: {
    params: Promise<{ userId: string }>,
    searchParams: Promise<{ appointmentId: string }>
}) => {
    const { userId } = await params
    const { appointmentId } = await searchParams

    const appointmentData = await getAppointment(appointmentId)
    console.log(appointmentData)

    const doctorImage = Doctors.find((doc) => doc.name === appointmentData.primaryPhysician)
    const formatedTime = formatDateTime(appointmentData.appointmentDate)
    console.log(formatedTime)
    return (
        <div className="min-h-screen p-[5%] w-full bg-[#131619] rounded-3xl text-white flex items-center justify-center  sm:p-6">
            <div className="flex justify-center items-center flex-col relative w-full max-w-[1200px] mx-auto px-4">



                {/* Logo */}
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={40}
                    width={160}
                    alt="Starlight Health Logo"
                    className="mb-6"
                />





                {/* Check circle */}
                <div className="absolute left-1/2 -translate-x-1/2 top-32 sm:top-40 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#131619] shadow-[0_10px_45px_-3px_rgba(74,201,126,0.3),0_4px_26px_-4px_rgba(74,201,126,0.16)] flex items-center justify-center">
                    <div className="h-full w-full rounded-full border-[5px] border-[#4AC97E] flex items-center justify-center">
                        <img
                            src="/assets/icons/check.svg"
                            alt="check"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                        />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="mt-56 sm:mt-64 text-center font-bold text-3xl sm:text-4xl leading-tight max-w-2xl sm:max-w-3xl mx-auto">
                    Dear <span className='italic text-[#4AC97E]'> {`${appointmentData.patient.name}`}</span> your appointment request  has been successfully submitted!
                </h1>

                {/* Subtitle */}
                <p className="mt-3 sm:mt-4 text-center text-green-300 text-sm sm:text-lg leading-6 sm:leading-7 tracking-wide px-2">
                    We&apos;ll be in touch shortly to confirm.
                </p>

                {/* Divider 1 */}
                <div className="mt-6 sm:mt-8 h-px w-full max-w-[944px] mx-auto bg-[rgba(54,58,61,0.6)]" />


                {/* Details row */}
                <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
                    <p className="text-[#ABB8C4] text-md sm:text-2xl leading-7 sm:leading-9">
                        Requested appointment details:
                    </p>

                    {/* Doctor chip */}
                    <div className="flex items-center gap-2 rounded border border-white/10 bg-[linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)] px-3 py-2">
                        <Image
                            src={doctorImage?.image!}
                            alt="doctor"
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="text-white text-xs font-semibold tracking-wide">
                            {appointmentData.primaryPhysician}
                        </span>
                    </div>

                    {/* date */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Date chip */}
                        <div className="flex items-center gap-2">
                            <img
                                src="/assets/icons/calendar.svg" // 🔹 Local calendar icon
                                alt="calendar"
                                className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                            <span className="text-[#ABB8C4] text-sm sm:text-base leading-6 sm:leading-7 tracking-wide">
                                {formatedTime.dateTime}

                            </span>
                        </div>
                    </div>
                </div>



                {/* Divider 2 */}
                <div className="mt-6 sm:mt-8 h-px w-full max-w-[944px] mx-auto bg-[rgba(54,58,61,0.6)]" />

                <Button className='mt-5 cursor-pointer'>

                    <Link
                        href={`/patients/${userId}/new-appointment/`}>↪ Book new Appointment </Link>

                </Button>
            </div>
        </div>



    );

}

export default Success