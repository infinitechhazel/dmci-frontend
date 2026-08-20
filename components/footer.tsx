"use client"

import { Button } from "@heroui/button"
import Link from "next/link"
import React, { useState } from "react"
import { FaViber } from "react-icons/fa6"
import { MdArrowOutward } from "react-icons/md"
import { usePathname, useRouter } from "next/navigation"
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTelegramFill,
  RiWechat2Fill,
  RiWhatsappFill,
} from "react-icons/ri"

const Footer = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.includes("/room-planner")) {
    return null
  }

  return (
    <footer className="bg-[#9B0D15] text-[#FFFFFF]">
      <div className="mx-auto px-6 xl:px-20 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center md:text-left">
          {/* About Section */}
          <div className="max-w-xs">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center text-[#FFFFFF]">
              DMCI Homes
            </h2>

            <p className="text-sm text-[#FFFFFF]/80 leading-snug text-justify">
              With skill, passion, and dedication, we continue our quest in
              attaining engineering excellence in quality homebuilding and
              community development that shall endure generations.
            </p>

            <div className="mt-4 text-center">
              <Button
                size="sm"
                className="
                  uppercase
                  text-[#9B0D15]
                  bg-[#FFFFFF]
                  shadow-md
                  hover:bg-[#373A36]
                  hover:text-[#FFFFFF]
                  transition-colors
                "
                endContent={<MdArrowOutward />}
                isLoading={buttonLoading}
                variant="solid"
                onPress={() => {
                  setButtonLoading(true)
                  router.push(
                    "https://dmci-admin-website.vercel.app/auth/login",
                  )
                }}
              >
                Log in as Admin
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-xs">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center text-[#FFFFFF]">
              Quick Links
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-1 text-xs text-justify">
                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/properties"
                  >
                    Properties
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/agent"
                  >
                    Agent
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <ul className="space-y-1 text-xs text-justify">
                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="https://apps.dmcihomes.com/OnlineCRF/Main?ac=EL25650"
                  >
                    Customer Reservation Form
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/room-planner"
                    target="_blank"
                  >
                    Room Planner
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/appointment"
                  >
                    Set Appointment
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/calculator"
                  >
                    Loan Calculator
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
                    href="/career"
                  >
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect With Us */}
          <div className="max-w-xs">
            <h2 className="text-lg font-bold uppercase mb-4 tracking-wide text-center text-[#FFFFFF]">
              Connect With Us
            </h2>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/share/We79XYCKWCDWmhE2/?mibextid=JRoKGi"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <RiFacebookBoxFill className="h-5 w-5" />
              </Link>

              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/ella.dmcihomes"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <RiInstagramFill className="h-5 w-5" />
              </Link>

              <Link
                aria-label="Telegram"
                href="https://t.me/+639175480999"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <RiTelegramFill className="h-5 w-5" />
              </Link>

              <Link
                aria-label="WhatsApp"
                href="https://wa.me/639175480999"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <RiWhatsappFill className="h-5 w-5" />
              </Link>

              <Link
                aria-label="WeChat"
                href="weixin://dl/chat?number=639175480999"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <RiWechat2Fill className="h-5 w-5" />
              </Link>

              <Link
                aria-label="Viber"
                href="viber://chat?number=%2B639175480999"
                className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
              >
                <FaViber className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#FFFFFF]/30 my-6" />

        {/* Footer Bottom */}
        <div className="text-center text-xs text-[#FFFFFF]/70">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://infinitech-website.vercel.app"
            target="_blank"
            className="text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors"
          >
            Infinitech Advertising Corporation
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
