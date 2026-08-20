"use client";

import { Tab, Tabs } from "@heroui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { getAuthHeaders } from "../auth";
import TestimonialClients from "./testimonialsclient";
import ContractSigning from "./contract";
import TestimonialSlider from "./testemonialslider";

type Testimonial = {
  id: string;
  user_id: string;
  name: string;
  message: string;
  status: string;
};

const fetcher = async (url: string) => {
  const headers = getAuthHeaders();
  const response = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch testimonials: ${response.status} - ${response.statusText}`
    );
  }
  return response.json();
};

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<string>("gallery");
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) {
    console.error("Error fetching testimonials:", error);
    return <p>Error loading testimonials.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const testimonials = data.record?.videos || [];
  const clientTestimonials =
    data.record?.testimonials.filter(
      (testimonial: Testimonial) => testimonial.status == "active"
    ) || [];
  const contracts = data.record?.contracts || [];

  return (
    <div className="py-6 md:py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <Tabs
        aria-label="Agent Details Tabs"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="w-full text-sm sm:text-base md:text-lg mx-auto"
      >
        <Tab
          key="gallery"
          title={
            <span className="text-xs sm:text-sm md:text-base">Videos</span>
          }
        >
          <div className="relative z-10">
            <TestimonialSlider data={testimonials} />
          </div>
        </Tab>

        <Tab
          key="testimonials"
          title={
            <span className="text-xs sm:text-sm md:text-base">
              Testimonials
            </span>
          }
        >
          <div className="relative z-10">
            <TestimonialClients data={clientTestimonials} />
          </div>
        </Tab>
        <Tab
          key="contract"
          title={
            <span className="text-xs sm:text-sm md:text-base">
              Contract Signing
            </span>
          }
        >
          <div className="relative z-10 ">
            <ContractSigning data={contracts} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Testimonials;
