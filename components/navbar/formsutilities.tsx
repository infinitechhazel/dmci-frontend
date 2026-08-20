"use client"

import { siteConfig } from "@/config/site"
import { Button, Tooltip } from "@heroui/react"
import Link from "next/link"
import React from "react"
import {
  LuCalendarCheck,
  LuCalendarFold,
  LuCalculator,
  LuFileUser,
} from "react-icons/lu"

const FormUtilities = () => {
  const buttonClass =
    "border-white/60 text-white hover:bg-white hover:text-[#9B0D15] transition-colors"

  return (
    <div className="flex gap-2">
      {/* Customer Reservation Form - display only */}
      <Tooltip content="Customer Reservation Form">
        <Button
          size="md"
          className={buttonClass}
          radius="full"
          variant="bordered"
          isIconOnly
          aria-label="Customer Reservation Form"
        >
          <LuCalendarCheck size={18} />
        </Button>
      </Tooltip>

      {/* Room Planner disabled */}
      {/*
      <Link href="/room-planner" target="_blank">
        <Tooltip content="Room Planner">
          <Button
            size="md"
            className={buttonClass}
            radius="full"
            variant="bordered"
            isIconOnly
            aria-label="Room Planner"
          >
            <LuLampDesk size={16} />
          </Button>
        </Tooltip>
      </Link>
      */}

      {/* Set Appointment */}
      <Link href={siteConfig.links.appointment}>
        <Tooltip content="Set Appointment">
          <Button
            size="md"
            className={buttonClass}
            radius="full"
            variant="bordered"
            isIconOnly
            aria-label="Set Appointment"
          >
            <LuCalendarFold size={16} />
          </Button>
        </Tooltip>
      </Link>

      {/* Loan Calculator */}
      <Link href={siteConfig.links.loancalculator}>
        <Tooltip content="Loan Calculator">
          <Button
            size="md"
            className={buttonClass}
            radius="full"
            variant="bordered"
            isIconOnly
            aria-label="Loan Calculator"
          >
            <LuCalculator size={16} />
          </Button>
        </Tooltip>
      </Link>

      {/* Apply Now */}
      <Link href={siteConfig.links.career}>
        <Tooltip content="Apply Now">
          <Button
            size="md"
            className={buttonClass}
            radius="full"
            variant="bordered"
            isIconOnly
            aria-label="Apply Now"
          >
            <LuFileUser size={16} />
          </Button>
        </Tooltip>
      </Link>
    </div>
  )
}

export default FormUtilities
