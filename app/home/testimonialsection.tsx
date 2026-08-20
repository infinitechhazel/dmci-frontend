"use client"

import React from "react"
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react"
import * as Yup from "yup"
import { ErrorMessage, Formik, Field, Form } from "formik"
import toast from "react-hot-toast"
import axios from "axios"
import Image from "next/image"

import FeedbackImage from "@/public/Feedback-bro.svg"
import { LuCircleArrowRight } from "react-icons/lu"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  message: Yup.string().required("Message is required"),
})

const initialValues = {
  name: "",
  message: "",
}

const TestimonialSection = () => {
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/submit-testimonial`,
        values,
        {
          headers: {
            "User-ID": process.env.NEXT_PUBLIC_API_USER_ID,
          },
        },
      )

      if (response?.data) {
        resetForm()
        toast.success("Testimonial submitted successfully!")
      }
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again!")
      console.error(error)
    }
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Card
        className="
          mx-auto
          w-full
          max-w-screen-lg
          border
          border-[#373A36]/20
          bg-[#FFFFFF]
          p-4
          shadow-md
          sm:p-6
        "
      >
        <CardBody
          className="
            flex
            flex-col
            items-center
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
            md:gap-8
          "
        >
          {/* Image Section */}
          <div
            className="
              w-full
              md:w-1/3
              lg:w-2/5
            "
          >
            <Image
              alt="Testimonial Illustration"
              className="
                mx-auto
                h-auto
                w-full
                max-w-[320px]
                object-contain
                md:max-w-full
              "
              height={300}
              src={FeedbackImage}
            />
          </div>

          {/* Form Section */}
          <div
            className="
              w-full
              md:w-1/2
              lg:w-1/2
            "
          >
            <h2
              className="
                text-lg
                font-bold
                text-[#373A36]
                sm:text-xl
                md:text-2xl
              "
            >
              Submit Your Testimonial
            </h2>

            <p
              className="
                mb-4
                mt-2
                text-sm
                leading-relaxed
                text-[#373A36]/70
              "
            >
              Share your experience with us by submitting a testimonial. Your
              feedback helps us improve!
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <Field name="name">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            isFullWidth
                            label="Full Name"
                            placeholder="e.g., John Doe"
                            classNames={{
                              label: "text-[#373A36]",
                              input: "text-[#373A36]",
                              inputWrapper: `
                                bg-[#FFFFFF]
                                border
                                border-[#373A36]/30
                                hover:border-[#9B0D15]
                                focus-within:border-[#9B0D15]
                              `,
                            }}
                          />
                        )}
                      </Field>

                      <ErrorMessage
                        className="
                          mt-1
                          text-sm
                          text-[#9B0D15]
                        "
                        component="div"
                        name="name"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Field name="message">
                        {({ field }: any) => (
                          <Textarea
                            {...field}
                            isFullWidth
                            label="Message"
                            placeholder="Share your experience..."
                            classNames={{
                              label: "text-[#373A36]",
                              input: "text-[#373A36]",
                              inputWrapper: `
                                bg-[#FFFFFF]
                                border
                                border-[#373A36]/30
                                hover:border-[#9B0D15]
                                focus-within:border-[#9B0D15]
                              `,
                            }}
                          />
                        )}
                      </Field>

                      <ErrorMessage
                        className="
                          mt-1
                          text-sm
                          text-[#9B0D15]
                        "
                        component="div"
                        name="message"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div
                    className="
                      mt-6
                      flex
                      w-full
                      flex-col
                      gap-4
                      sm:flex-row
                    "
                  >
                    <Button
                      className="
                        w-full
                        bg-[#9B0D15]
                        font-medium
                        uppercase
                        text-[#FFFFFF]
                        shadow-md
                        transition-all
                        duration-200
                        hover:bg-[#9B0D15]/90
                        sm:w-auto
                      "
                      disabled={isSubmitting}
                      type="submit"
                      endContent={<LuCircleArrowRight size={18} />}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default TestimonialSection
