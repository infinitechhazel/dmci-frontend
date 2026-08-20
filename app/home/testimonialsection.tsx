"use client";

import React from "react";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";
import * as Yup from "yup";
import { ErrorMessage, Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

import FeedbackImage from "@/public/Feedback-bro.svg";
import { LuCircleArrowRight } from "react-icons/lu";
// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  message: Yup.string().required("Message is required"),
});

// Initial Values
const initialValues = {
  name: "",
  message: "",
};

const TestimonialSection = () => {
  // Submit Handler
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
      );

      if (response?.data) {
        resetForm();
        toast.success("Testimonial submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit testimonial. Please try again!");
      console.error(error);
    }
  };

  return (
    <div className="py-8">
      <Card className="p-6 max-w-screen-lg mx-auto">
        <CardBody className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Image Section */}
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              alt="Testimonial Illustration"
              className="w-full"
              height={300}
              src={FeedbackImage}
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-gray-700 dark:text-white">
              Submit Your Testimonial
            </h2>
            <p className="text-gray-500 mb-4 text-sm dark:text-gray-200">
              Share your experience with us by submitting a testimonial. Your feedback helps us improve!
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, resetForm }) => (
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
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-sm"
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
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-sm"
                        component="div"
                        name="message"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    <Button className="bg-green-600 text-white uppercase font-medium" disabled={isSubmitting} type="submit" endContent={<LuCircleArrowRight size={18}/>}>
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
  );
};

export default TestimonialSection;
