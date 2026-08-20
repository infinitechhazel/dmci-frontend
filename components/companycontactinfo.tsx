"use client"

import { Button } from "@heroui/button"
import Link from "next/link"
import React from "react"
import { LuCalendarRange } from "react-icons/lu"
import {
  MdCalendarMonth,
  MdMail,
  MdPhone,
  MdPhoneInTalk,
  MdSmartphone,
} from "react-icons/md"

const CompanyInfo = () => {
  return (
    <>
      {/* Phone */}
      <div className="flex gap-3 pt-8">
        <div
          className="
            inline-flex
            h-12
            items-center
            rounded-lg
            bg-[#9B0D15]
            px-2
            py-4
            text-[#FFFFFF]
          "
        >
          <MdPhone size={32} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-[#373A36]">Phone</h1>

          <p className="mb-4 text-sm text-[#373A36]/70">
            Our phone lines are available every{" "}
            <strong className="text-[#373A36]">Monday to Friday</strong> from
            8AM to 5PM.
          </p>

          <div className="inline-flex flex-col gap-4">
            <Button
              size="sm"
              onPress={() => (window.location.href = "tel:09622530149")}
              variant="light"
              className="
                flex
                items-center
                gap-2
                text-sm
                text-[#373A36]
                hover:bg-[#9B0D15]/10
                lg:text-lg
              "
            >
              <MdSmartphone size={20} />
              <span>09622530149</span>
            </Button>

            <Button
              size="sm"
              onPress={() => (window.location.href = "tel:(02)7001-6157")}
              variant="light"
              className="
                flex
                items-center
                gap-2
                text-sm
                text-[#373A36]
                hover:bg-[#9B0D15]/10
                lg:text-lg
              "
            >
              <MdPhoneInTalk size={20} />
              <span>(02)7001-6157</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="flex gap-3 pt-8">
        <div
          className="
            inline-flex
            h-12
            items-center
            rounded-lg
            bg-[#9B0D15]
            px-2
            py-4
            text-[#FFFFFF]
          "
        >
          <MdMail size={32} />
        </div>

        <div className="inline-block">
          <h1 className="text-xl font-bold text-[#373A36]">Email</h1>

          <p className="mb-4 text-sm text-[#373A36]/70">
            You may reach us by email for all manner of information. Send an
            enquiry to the following designated email list.
          </p>

          <div className="inline-flex flex-col gap-4">
            <Button
              size="sm"
              onPress={() =>
                (window.location.href = "mailto:ellandmichomes.ph@gmail.com")
              }
              variant="light"
              className="
                flex
                items-center
                gap-2
                text-sm
                text-[#373A36]
                hover:bg-[#9B0D15]/10
                lg:text-lg
              "
            >
              <MdMail size={20} />
              <span>ellandmichomes.ph@gmail.com</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Appointment */}
      <div className="flex gap-3 pt-8">
        <div
          className="
            inline-flex
            h-12
            items-center
            rounded-lg
            bg-[#9B0D15]
            px-2
            py-4
            text-[#FFFFFF]
          "
        >
          <MdCalendarMonth size={32} />
        </div>

        <div className="inline-block">
          <h1 className="text-xl font-bold text-[#373A36]">Set Appointment</h1>

          <p className="mb-4 text-sm text-[#373A36]/70">
            Avoid the long queues, book your next viewing and consultation.
          </p>

          <div className="inline-flex flex-col gap-4">
            <Button
              as={Link}
              href="/appointment"
              startContent={<LuCalendarRange />}
              variant="light"
              className="
                text-md
                text-[#373A36]
                hover:bg-[#9B0D15]/10
                hover:text-[#9B0D15]
              "
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyInfo
