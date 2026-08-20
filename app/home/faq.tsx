"use client";
import { Accordion, AccordionItem } from "@heroui/react";
import React from "react";
import useSWR from "swr";
import { getAuthHeaders } from "../auth";

// Define the fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const FrequentlyAskQuestions = () => {
  // Fetch FAQ data from API
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/questions`,
    fetcher
  );

  if (isLoading) {
    return <p className="text-sm text-default-500">Loading FAQs...</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Failed to load FAQs. Please try again later.
      </p>
    );
  }

  const faqData = data.records;

  return (
    <section className="flex flex-col py-6 md:py-8">
      <h1 className="font-bold text-2xl uppercase">Frequently Asked Questions</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-sm text-default-500 max-w-md">
          Find answers to the most common questions about our services,
          processes, and policies.
        </p>
      </div>
      <div className="py-8">
        <Accordion>
          {faqData?.map(
            (faq: {
              id: number;
              question: string;
              answer: string;
              status: string;
            }) => (
              <>
                {faq.status == "active" && (
                  <AccordionItem
                    key={faq.id}
                    aria-label={`Accordion ${faq.id}`}
                    title={faq.question}
                  >
                    {faq.answer}
                  </AccordionItem>
                )}
              </>
            )
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default FrequentlyAskQuestions;
