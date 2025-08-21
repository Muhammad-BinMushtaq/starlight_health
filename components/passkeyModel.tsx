'use client'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils'


const PasskeyModel = () => {
    const otpClass = 'text-4xl font-bold  justify-center flex border border-dark-500 rounded-lg size-16 gap-4 !important;'

    const router = useRouter()
    const [open, setOpen] = useState(true)
    const [passkey, setPasskey] = useState('')
    const [error, setError] = useState('')
    const path = usePathname()

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('passkey') : null
    useEffect(() => {

        const decryptedKey = encryptedKey && decryptKey(encryptedKey!)
        console.log(decryptKey)
        if (path) {
            if (decryptedKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setError("Enter your passkey to open dashboard")
            }

            else {
                const encryptedKey = encryptKey(decryptedKey)
                localStorage.setItem('passkey', encryptedKey)

                setOpen(false)
                router.push('/admin')
            }

        }

        else { setOpen(true) }
    }, [encryptedKey!])

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (passkey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            setError("Incorrect Passkey! Try Again")
        }

        else {
            const encryptedKey = encryptKey(passkey)
            localStorage.setItem('passkey', encryptedKey)
            setOpen(false)
            router.push('/admin')
        }
    }

    const updateAlert = () => {
        setOpen(false)
        router.push('/')
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogContent className='flex flex-col p-7 gap-8 bg-[#1A1D21F5] border-none '>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-[#FFFFFF] flex flex-row justify-between items-center'>Access Verification
                        <Image
                            className='cursor-pointer'
                            src={'/assets/icons/close.svg'}
                            alt='Cross'
                            height={20}
                            width={20}
                            onClick={updateAlert} />
                    </AlertDialogTitle>
                    <AlertDialogDescription className='flex items-start text-sm text-[#ABB8C4]'>
                        To access the admin page, please enter the passkey.....
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className=' w-full flex justify-between !important'>
                            <InputOTPSlot className={otpClass} index={0} />
                            <InputOTPSlot className={otpClass} index={1} />
                            <InputOTPSlot className={otpClass} index={2} />
                            <InputOTPSlot className={otpClass} index={3} />
                            <InputOTPSlot className={otpClass} index={4} />
                            <InputOTPSlot className={otpClass} index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                </div>
                {error ? (<p className='text-sm text-red-500'>{error}</p>) : ''}
                <AlertDialogFooter>


                    <AlertDialogAction onClick={(e) => validatePasskey(e)} className='cursor-pointer w-full bg-[#24AE7C] hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800'>Enter admin panel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PasskeyModel