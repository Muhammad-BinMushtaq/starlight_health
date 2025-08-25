
import { RegisterForm } from '@/components/forms/registerForm'
import { getUser } from '@/lib/actions/patients.action'
import Image from 'next/image'
import React from 'react'


const Register = async ({ params }: { params: Promise<{ userId: string }> }) => {

  const { userId } = await params
  // const user = await getUser(userId)

  return (
    <div className="flex flex-col lg:flex-row h-auto overflow-x-hidden overflow-y-hidden">

      {/* Left Side (Form Section) */}
      <section className="flex-1  px-6 py-10 lg:py-16 lg:px-12">


        <div className="max-w-[860px] w-full mx-auto  flex flex-col gap-6">
          {/* Logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={40}
            width={160}
            alt="Starlight Health Logo"
            className="mb-6"
          />

          {/* Patient Form */}
          <RegisterForm  userId={userId} />

          {/* Footer */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p className="text-center md:text-left">© 2024 Starlight Health</p>

          </div>
        </div>
      </section>

      {/* Right Side (Image Section) - hidden on small screens */}
      {/* <div className="hidden lg:block lg:w-1/2 h-full "> */}
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient onboarding"
        className="hidden lg:block h-full w-full max-w-[390px] object-cover rounded-l-2xl"
      />
      {/* </div> */}
    </div>
  )
}

export default Register