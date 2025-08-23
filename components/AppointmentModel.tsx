'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import AppointmentForm from './forms/appointmentForm'
import { Appointment } from '@/types/appwrite.types'

const AppointmentModel = ({ type, patientId, userId, appointment }: {
    type: 'schedule' | 'cancel', patientId: string, userId: string
    , appointment: Appointment
}) => {
    const [open, setOpen] = useState(false)
    // console.log("this is appoeintmetn",appointment)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='ghost' className={type === 'schedule' ? 'text-[#24ae7c]' : 'text-[#f37877]'}>{type}</Button>
            </DialogTrigger>
            <DialogContent className=' bg-gray-950 border-dark-500 !important;'>
                <DialogHeader>
                    <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the form to {type}
                    </DialogDescription>
                </DialogHeader>

                <AppointmentForm
                    type={type}
                    userId={userId}
                    patientId={patientId}
                    appointment={appointment}
                    setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModel