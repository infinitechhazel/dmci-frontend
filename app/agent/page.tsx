"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { getAuthHeaders } from "../auth";
import AgentCertificates from "./certificates";
import AgentTestimonial from "./testemonial";
import AgentGallery from "./gallery";
import ProfileCard from "./profilecard";


interface AgentData {
  id: string;
  user_id: string;
  name: string;
  message: string;
  created_at: string;
  image: string;
  title: string;
  about: string;
  position: string;
  facebook: string;
  email: string;
  phone: string;
}

const AgentPage = () => {
  const [activeTab, setActiveTab] = useState<string>("certificates");
  const [testimonials, setTestimonials] = useState<AgentData[]>([]);
  const [certificates, setCertificates] = useState<AgentData[]>([]);
  const [images, setGallery] = useState<AgentData[]>([]);
  const [profile, setProfile] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/api/user`;

      try {
        const headers = getAuthHeaders();
        const response = await fetch(endpoint, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();

        setTestimonials(data.record.testimonials || []);
        setCertificates(data.record.certificates || []);
        setGallery(data.record.images || []);
        setProfile(data.record || []);

      

      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12 h-96">
      <Spinner size="lg" label="Loading Agent Profile..." />
    </div>;
  }

  if (!testimonials.length) {
    return <div className="flex justify-center py-12 h-96">No testimonials available.</div>;
  }

  return (
    <div className="mx-auto flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 items-start px-4 xl:px-24">
      {/* Profile Sidebar */}
      <div className="w-full col-span-2 md:col-span-1 bg-blue-900 text-white rounded-lg px-6 py-8">
        <ProfileCard profile={profile} />
      </div>

      {/* Main Content */}
      <div className="col-span-2">
        <Tabs
          aria-label="Agent Details Tabs"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab key="certificates" title="Certificates">
            <AgentCertificates agentdata={certificates} />
          </Tab>

          <Tab key="gallery" title="Gallery">
            <AgentGallery agentdata={images} />
          </Tab>

          <Tab key="testimonials" title="Testimonials">
            <AgentTestimonial testimonials={testimonials} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentPage;
