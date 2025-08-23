'use client'

import { StatusIcon } from "@/constants"
import clsx from "clsx"
import Image from "next/image"
import { Interface } from "readline"


const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className={clsx('flex w-fit items-center gap-2 rounded-full px-2 overflow-hidden py-2', {
      'bg-[#0D2A1F]': status === 'scheduled',
      'bg-[#152432]': status === 'pending',
      'bg-[#3E1716]': status === 'cancelled'
    })}>
      <Image
        src={StatusIcon[status]}
        height={23}
        width={24}
        className="h-fit w-3"
        alt="img" />
      <p className={clsx('font-semibold capitalize', {
        'text-[#24AE7C]': status === 'scheduled',
        'text-[#79B5EC]': status === 'pending',
        'text-[#F37877]': status === 'cancelled'
      })}>{status}</p>
    </div>

  )
}

export default StatusBadge