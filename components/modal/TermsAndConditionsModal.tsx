"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const TermsAndConditionsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  return (

    <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    size="3xl"
    hideCloseButton
    className="overflow-hidden max-h-[95vh] sm:max-h-[200vh]"
  >
  
      <ModalContent>
        {(onClose) => (
          <>
          <button
            onClick={onClose}
            className="absolute top-2 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1E40AF]/10 active:bg-[#1E40AF]/20 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 hover:text-[#1E40AF] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
            <ModalHeader className="flex flex-col items-center justify-center mt-6 space-y-1">
            <div className="flex items-center justify-center w-full gap-4">
              <div className="flex-grow border-t border-gray-300" />
              <h2 className="text-xl font-semibold text-[#1E40AF] whitespace-nowrap">
                TERMS AND CONDITIONS
              </h2>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            <p className="text-xs text-gray-500">Updated as of March 18, 2025</p>
          </ModalHeader>
          <ModalBody className="text-xs text-default-700 space-y-2 leading-snug px-6 overflow-y-auto sm:overflow-visible max-h-[80vh] sm:max-h-none">

              <p>
                Welcome to DMCI! These Terms and Conditions govern your use of our platform and
                services. By accessing or using any part of our platform, you agree to comply with
                these terms. Please read them carefully.
              </p>

              <p>
                <strong>1. Acceptance of Terms:</strong> By using DMCI's platform, you agree to be
                bound by these terms, along with any applicable policies or future amendments.
                If you do not agree, please discontinue the use of our services.
              </p>

              <p>
                <strong>2. Account and Security:</strong> Users are responsible for maintaining
                the confidentiality of their account credentials. Any activity that occurs under
                your account is your responsibility. Notify us immediately in case of unauthorized
                use or breach.
              </p>

              <p>
                <strong>3. Use of Platform:</strong> You agree to use the platform solely for
                legitimate purposes, complying with applicable laws and regulations. Unauthorized
                use, data scraping, or exploitation of the platform is strictly prohibited.
              </p>

              <p>
                <strong>4. Intellectual Property:</strong> All content, including text, graphics,
                logos, and digital assets, remain the intellectual property of DMCI. Unauthorized
                use, reproduction, or distribution is not permitted.
              </p>

              <p>
                <strong>5. Modifications and Termination:</strong> DMCI reserves the right to
                modify, suspend, or terminate services or access at any time without prior notice.
                We may also update these terms periodically, and continued use of the platform
                constitutes acceptance of the changes.
              </p>

              <p>
                <strong>6. Limitation of Liability:</strong> DMCI shall not be held liable for any
                direct, indirect, or consequential damages arising from the use of our platform,
                services, or any associated content.
              </p>

              <p>
                <strong>7. Governing Law:</strong> These terms are governed by the laws of the
                Philippines. Any disputes shall be resolved in accordance with applicable
                Philippine law.
              </p>
            </ModalBody>
            <ModalFooter>
             
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TermsAndConditionsModal;
