'use client'
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';


interface LoadingTypes {
    isLoading: boolean;
    className?: string;
    children?: React.ReactNode;
}


const SubmitButton = ({ isLoading, className, children }: LoadingTypes) => {
    
    return (
        <Button  
            type='submit'
            disabled={isLoading}
            className={className ?? ' w-full bg-[#24AE7C] hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800'}
        >
            {
                isLoading ? (
                    <div className='flex items-center gap-4'>
                        <Image 
                        src="/assets/icons/loader.svg"
                        alt="Loading"
                        width={24}
                        height={24}  
                        
                        />

                    </div>
                ) : children
            }
        </Button>


    )
}

export default SubmitButton