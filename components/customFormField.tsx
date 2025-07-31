'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FormFieldName } from "./forms/patientForm"
import { Control } from "react-hook-form"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



interface CustomProps {
    control: Control<any>
    formFieldType: FormFieldName
    name: string
    label: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateformat?: string
    showTimeSelect?: boolean
    chidlren?: React.ReactNode
    renderskeleton?: () => React.ReactNode
}


const RenderFields = ({ field, props }: { field: any, props: CustomProps }) => {
    const { formFieldType, control, name, label, placeholder, iconSrc, iconAlt } = props

    switch (formFieldType) {
        case FormFieldName.INPUT:
            return (
                <div className="flex rounded-md border-2 border-gray-800 bg-gray-900 p-2">
                    {
                        iconSrc && (
                            <Image
                                className="ml-6"
                                src={iconSrc}
                                height={24}
                                width={24}
                                alt={iconAlt || 'User Icon'}
                            />
                        )}

                    <FormControl>
                        <Input placeholder={placeholder}
                            {...field}

                            className="border-none outline-none bg-transparent"
                        />
                    </FormControl>



                </div>
            )

        case FormFieldName.PHONE_INPUT:
            return (
                <div className="flex rounded-md border-2 border-gray-800 bg-gray-900 p-2">
                    <FormControl>
                        <PhoneInput
                            placeholder={placeholder}
                            className=" mt-1 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-white"
                            defaultCountry="US"
                            international
                            withCountryCallingCode
                            value={typeof field.value === 'string' ? field.value : ''}
                            onChange={field.onChange}
                           
                            countrySelectProps={{
                                className: "bg-gray-900 text-white border-none outline-none "
                            }}

                        />
                    </FormControl>
                </div>
            )
        default:
            break;
    }


}

const CustomFormField = (props: CustomProps) => {
    const { formFieldType, control, name, label } = props
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">

                    {formFieldType !== FormFieldName.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )
                    }

                    <RenderFields field={field} props={props} />


                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField