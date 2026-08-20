"use client"

import React, { useEffect, useState } from "react"
import { MdArrowOutward } from "react-icons/md"
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"
import { getAuthHeaders } from "../auth"
import RecommendedCard from "@/components/modal/recomendedproperty"
import { Spinner } from "@heroui/react"

const RecommendedForYou = () => {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [buttonLoading, setButtonLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchProperties = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

      const headers = getAuthHeaders()

      try {
        const response = await fetch(`${apiUrl}/api/user/property?limit=5`, {
          method: "GET",
          headers,
          cache: "no-cache",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch recommended properties.")
        }

        const data = await response.json()

        setProperties(data.records?.slice(0, 5) || [])
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Error fetching properties. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <section className="flex flex-col py-6 text-foreground md:py-8">
      <h1 className="text-2xl font-bold uppercase text-foreground">
        Recommended For You
      </h1>

      <div className="flex flex-wrap justify-between gap-4">
        <p className="max-w-md text-sm text-muted-foreground">
          DMCI Homes believes in building world-class communities fit for your
          every need. Take a look at these other communities!
        </p>

        <Button
          isLoading={buttonLoading}
          className="
            rounded-xl
            bg-primary
            px-2
            text-sm
            uppercase
            text-primary-foreground
            hover:bg-primary/90
          "
          variant="solid"
          onPress={() => {
            setButtonLoading(true)
            router.push("/properties")
          }}
        >
          See all properties
          <MdArrowOutward
            className="
              rounded-full
              bg-primary-foreground
              text-primary
              shadow-lg
            "
            size={24}
          />
        </Button>
      </div>

      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <RecommendedCard data={properties} />
        </div>
      ) : (
        <div className="flex h-96 justify-center py-12">
          <Spinner
            size="lg"
            color="primary"
            label="Loading Properties..."
            classNames={{
              label: "text-muted-foreground",
            }}
          />
        </div>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
    </section>
  )
}

export default RecommendedForYou
