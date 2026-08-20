"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { getAuthHeaders } from "../auth";
import RecommendedCard from "@/components/modal/recomendedproperty";
import { Spinner } from "@heroui/react";


const RecommendedForYou = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/property?limit=5`, {
          method: "GET",
          headers,
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommended properties.");
        }

        const data = await response.json();

        setProperties(data.records.slice(0, 5) || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Error fetching properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return (
    <section className="flex flex-col py-6 md:py-8">
      <h1 className="font-bold text-2xl  uppercase">Recommended For You</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-sm text-default-500 max-w-md">
          DMCI Homes believes in building world-class communities fit for your
          every need. Take a look at these other communities!
        </p>
        <Button
          isLoading={buttonLoading}
          className="bg-green-600 text-white text-sm uppercase px-2 rounded-xl hover:bg-green-800"
          variant="solid"
          onPress={() => {
            setButtonLoading(true);
            router.push(`/properties`);
          }}
        >
          see all properties{" "}
          <MdArrowOutward
            className="bg-green-300 text-green-700 rounded-full shadow-lg"
            size={24}
          />
        </Button>
      </div>


      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4 py-6">
          <RecommendedCard data={properties} />
        </div>
      ) :
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading Propperties...." />
        </div>
      }

    </section>
  );
};

export default RecommendedForYou;
