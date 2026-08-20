"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react"
import React from "react"

interface Props {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const TermsAndConditionsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      hideCloseButton
      className="
        max-h-[95vh]
        overflow-hidden
        bg-[#FFFFFF]
        text-[#373A36]
        sm:max-h-[200vh]
      "
    >
      <ModalContent className="bg-[#FFFFFF]">
        {(onClose) => (
          <>
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                right-4
                top-2
                z-10
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#373A36]/10
                text-[#373A36]
                transition-colors
                hover:bg-[#9B0D15]/10
                hover:text-[#9B0D15]
                active:bg-[#9B0D15]/20
              "
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <ModalHeader
              className="
                mt-6
                flex
                flex-col
                items-center
                justify-center
                space-y-1
                px-4
                sm:px-6
              "
            >
              <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
                <div className="flex-grow border-t border-[#373A36]/20" />

                <h2
                  className="
                    whitespace-nowrap
                    text-base
                    font-semibold
                    text-[#9B0D15]
                    sm:text-xl
                  "
                >
                  TERMS AND CONDITIONS
                </h2>

                <div className="flex-grow border-t border-[#373A36]/20" />
              </div>

              <p className="text-[10px] text-[#373A36]/60 sm:text-xs">
                Updated as of March 18, 2025
              </p>
            </ModalHeader>

            {/* Body */}
            <ModalBody
              className="
                max-h-[80vh]
                space-y-3
                overflow-y-auto
                px-5
                text-xs
                leading-snug
                text-[#373A36]
                sm:px-6
                sm:text-sm
                sm:leading-relaxed
                sm:max-h-none
                sm:overflow-visible
              "
            >
              <p>
                Welcome to DMCI! These Terms and Conditions govern your use of
                our platform and services. By accessing or using any part of our
                platform, you agree to comply with these terms. Please read them
                carefully.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  1. Acceptance of Terms:
                </strong>{" "}
                By using DMCI&apos;s platform, you agree to be bound by these
                terms, along with any applicable policies or future amendments.
                If you do not agree, please discontinue the use of our services.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  2. Account and Security:
                </strong>{" "}
                Users are responsible for maintaining the confidentiality of
                their account credentials. Any activity that occurs under your
                account is your responsibility. Notify us immediately in case of
                unauthorized use or breach.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  3. Use of Platform:
                </strong>{" "}
                You agree to use the platform solely for legitimate purposes,
                complying with applicable laws and regulations. Unauthorized
                use, data scraping, or exploitation of the platform is strictly
                prohibited.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  4. Intellectual Property:
                </strong>{" "}
                All content, including text, graphics, logos, and digital
                assets, remain the intellectual property of DMCI. Unauthorized
                use, reproduction, or distribution is not permitted.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  5. Modifications and Termination:
                </strong>{" "}
                DMCI reserves the right to modify, suspend, or terminate
                services or access at any time without prior notice. We may also
                update these terms periodically, and continued use of the
                platform constitutes acceptance of the changes.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  6. Limitation of Liability:
                </strong>{" "}
                DMCI shall not be held liable for any direct, indirect, or
                consequential damages arising from the use of our platform,
                services, or any associated content.
              </p>

              <p>
                <strong className="font-semibold text-[#9B0D15]">
                  7. Governing Law:
                </strong>{" "}
                These terms are governed by the laws of the Philippines. Any
                disputes shall be resolved in accordance with applicable
                Philippine law.
              </p>
            </ModalBody>

            <ModalFooter className="border-t border-[#373A36]/10" />
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default TermsAndConditionsModal
