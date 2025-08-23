"use client"


import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomFormField from "../customFormField"
import { Form } from "../ui/form"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.action"
import { Button } from "../ui/button"
import SubmitButton from "../submitButton"



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



export function PatientForm() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({

    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
    console.log("onsubmit is called")
    setIsLoading(true);

    try {
      const userData = { name, email, phone };
      const newUser = await createUser(userData);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
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
          <h1 className="text-3xl mb-2">Hello 👋</h1>
          <p className="text-gray-400">Welcome to Starlight Health</p>
        </section>


        <CustomFormField
          formFieldType={FormFieldName.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Ali Khan"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User"
        />

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

        {/* <Button type='submit'>Get Started</Button> */}
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form >
  )
}

export default PatientForm
