"use client"

import { Accordion, AccordionItem } from "@heroui/react"
import React from "react"
import useSWR from "swr"
import { getAuthHeaders } from "../auth"

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const FrequentlyAskQuestions = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/questions`,
    fetcher,
  )

  if (isLoading) {
    return (
      <p
        className="text-sm"
        style={{
          color: "#373A36",
          opacity: 0.65,
        }}
      >
        Loading FAQs...
      </p>
    )
  }

  if (error) {
    return (
      <p
        className="text-sm"
        style={{
          color: "#9B0D15",
        }}
      >
        Failed to load FAQs. Please try again later.
      </p>
    )
  }

  const faqData = data?.records || []

  return (
    <section className="flex flex-col py-6 md:py-8">
      <h1
        className="text-2xl font-bold uppercase"
        style={{
          color: "#373A36",
        }}
      >
        Frequently Asked Questions
      </h1>

      <div className="flex flex-wrap justify-between gap-4">
        <p
          className="max-w-md text-sm"
          style={{
            color: "#373A36",
            opacity: 0.65,
          }}
        >
          Find answers to the most common questions about our services,
          processes, and policies.
        </p>
      </div>

      <div className="py-8">
        <Accordion className="w-full">
          {faqData
            .filter(
              (faq: {
                id: number
                question: string
                answer: string
                status: string
              }) => faq.status === "active",
            )
            .map(
              (faq: {
                id: number
                question: string
                answer: string
                status: string
              }) => (
                <AccordionItem
                  key={faq.id}
                  aria-label={`Accordion ${faq.id}`}
                  title={
                    <span
                      className="font-semibold"
                      style={{
                        color: "#373A36",
                      }}
                    >
                      {faq.question}
                    </span>
                  }
                  className="border-b"
                  style={{
                    borderColor: "#373A36",
                  }}
                >
                  <div
                    className="text-sm leading-6"
                    style={{
                      color: "#373A36",
                    }}
                  >
                    {faq.answer}
                  </div>
                </AccordionItem>
              ),
            )}
        </Accordion>
      </div>
    </section>
  )
}

export default FrequentlyAskQuestions
