'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Input } from "@/components/ui/input"
import { FormFieldName } from "./forms/patientForm"
import { Control } from "react-hook-form"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";




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
    renderSkeleton?: (field: any) => React.ReactNode;
    children?: React.ReactNode;
}


const RenderFields = ({ field, props }: { field: any, props: CustomProps }) => {
    const { formFieldType, placeholder, iconSrc, iconAlt, showTimeSelect, dateformat, renderSkeleton } = props

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
                            className=" mt-1 w-full ml-6 border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-white"
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

        case FormFieldName.DATE_PICKER:
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
                        <DatePicker selected={field.value}
                            onChange={(date) => { field.onChange(date) }}
                            className="bg-grey-500 outline-none border-none ml-3"
                            dateFormat={dateformat ?? 'MM/dd/yyyy' }
                            showTimeSelect={showTimeSelect ?? false}
                            placeholderText="DD/MM/YYYY"
                            
                        />

                    </FormControl>



                </div>
            )


        case FormFieldName.TEXTAREA:
            return (
                <div className="flex rounded-md border-2 border-gray-800 bg-gray-900 p-2">
                    <FormControl>

                        <textarea
                            placeholder={placeholder}
                            {...field}
                            className="resize-y min-h-8 max-h-36 h-8 border-none outline-none bg-transparent w-full text-white"

                        />
                    </FormControl>
                </div>
            )


        case FormFieldName.SKELETON:
            return (
                <div className="">
                    {props.renderSkeleton ? props.renderSkeleton(field) : null

                    }
                </div>

            )


        case FormFieldName.SELECT:
            return (

                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className=" bg-gray-900 p-2 w-full py-4 flex rounded-md border-3 border-gray-800 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent">
                            <SelectTrigger className="">
                                <SelectValue className="  text-white border-none outline-none" placeholder={props.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 text-white border-none outline-none">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>

            )

        case FormFieldName.CHECKBOX:
            return (

                <FormControl>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={props.name}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}

                        />
                        <Label htmlFor={props.name}>{props.label}</Label>

                    </div>
                </FormControl>
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