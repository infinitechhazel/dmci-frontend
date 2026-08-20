"use client"

import { useEffect, useState } from "react"
import { getAuthHeaders } from "../auth"
import SiteProgressCard from "@/components/modal/siteprogresscard"
import NoDataFound from "@/components/fallback/nodatafound"
import { Spinner } from "@heroui/react"

interface Property {
  name: string
  property_location: string
  status: string
  min_price: number
  max_price: number
  percent: number
  images: string
}

const SiteProgress = () => {
  const [propertyData, setPropertyData] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

      const headers = getAuthHeaders()

      try {
        const response = await fetch(`${apiUrl}/api/user/properties`, {
          method: "GET",
          headers,
          cache: "no-cache",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }

        const data = await response.json()

        const properties: Property[] = (data.records || []).filter(
          (record: Property) => record.percent < 100,
        )

        if (properties.length === 0) {
          setError("No properties available.")
          setPropertyData([])
        } else {
          setPropertyData(properties)
          setError(null)
        }
      } catch (err) {
        setError("Error fetching properties. Please try again later.")
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <section className="flex w-full flex-col py-6 md:py-8">
      {/* Heading */}
      <h1
        className="
          text-2xl
          font-bold
          uppercase
          text-[#373A36]
          sm:text-3xl
        "
      >
        Site Progress
      </h1>

      {/* Description */}
      <div className="mt-2 flex w-full flex-wrap gap-4">
        <p
          className="
            max-w-md
            text-sm
            leading-relaxed
            text-[#373A36]/70
          "
        >
          DMCI Homes is dedicated to delivering quality developments on time or
          even ahead of what we promised.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div
          className="
            flex
            min-h-[300px]
            w-full
            items-center
            justify-center
            py-12
          "
        >
          <Spinner
            size="lg"
            label="Loading Data..."
            classNames={{
              label: "text-[#373A36]",
              circle1: "border-b-[#9B0D15]",
              circle2: "border-b-[#9B0D15]",
            }}
          />
        </div>
      ) : error || propertyData.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[300px] w-full items-center justify-center">
          {error ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                text-center
              "
            >
              <p className="text-sm text-[#373A36]/70">{error}</p>

              <div
                className="
                  h-1
                  w-16
                  rounded-full
                  bg-[#9B0D15]
                "
              />
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      ) : (
        /* Property Cards */
        <div className="mt-6 w-full">
          <SiteProgressCard data={propertyData} />
        </div>
      )}
    </section>
  )
}

export default SiteProgress
