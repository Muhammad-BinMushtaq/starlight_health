'use client'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileuploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}
const FileUploader = ({ files, onChange }: FileuploaderProps) => {
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className=' bg-gray-900 text-12-regular flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5'>
            <input {...getInputProps()} />

            {files && files.length > 0 ? (
                <Image
                    src={URL.createObjectURL(files[0])}
                    height={1000}
                    width={1000}
                    alt="Uploaded file preview"
                    className=" rounded-md object-cover overflow-hidden"
                />
            ) : (
                <Image
                    src="/assets/icons/upload.svg"
                    height={40}
                    width={40}
                    alt="Upload Icon"
                    className="h-6 w-6"
                />
            )}

            {
                isDragActive ?


                    <p className='text-sm'>Drop the files here ...</p> :
                    <p className='text-sm'>Drag And drop some files here, or click to select files</p>
            }
        </div>

    )
}

export default FileUploader