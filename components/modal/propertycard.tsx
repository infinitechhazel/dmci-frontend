"use client"

import React, { useEffect, useState } from "react"
import { Card, CardBody, CardFooter, Tooltip } from "@heroui/react"
import {
  LuCircleCheck,
  LuHousePlus,
  LuBuilding2,
  LuBedDouble,
} from "react-icons/lu"
import Link from "next/link"
import NoDataFound from "../fallback/nodatafound"
import toast from "react-hot-toast"
import { usePathname } from "next/navigation"
import { toSlug } from "@/utils/slug"
import { filterMaxPrice } from "@/utils/priceformat"

interface Property {
  id: string
  property_name: string
  property_location: string
  status: string
  min_price: number
  max_price: number
  images: string
  description: string
}

interface Listings {
  id: string
  name: string
  location: string
  unit_name: string
  unit_location: string
  unit_type: string
  status: string
  unit_price: number
  images: string
  property: {
    name: string
    location: string
    description: string
  }
}

interface RecommendedCardProps {
  data: Property[] | Listings[]
  type: "property" | "listing"
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ data, type }) => {
  const pathname = usePathname()

  const [compareList, setCompareList] = useState<string[]>([])

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("compareList") || "[]")

    setCompareList(storedList)

    const handleStorageChange = () => {
      setCompareList(JSON.parse(localStorage.getItem("compareList") || "[]"))
    }

    window.addEventListener("storage", handleStorageChange)

    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleCompare = (id: string) => {
    let updatedCompareList = [...compareList]

    if (updatedCompareList.includes(id)) {
      updatedCompareList = updatedCompareList.filter((item) => item !== id)
    } else {
      if (updatedCompareList.length < 3) {
        updatedCompareList.push(id)
      } else {
        toast.error("You can only compare up to 3 items.")
        return
      }
    }

    localStorage.setItem("compareList", JSON.stringify(updatedCompareList))

    setCompareList(updatedCompareList)

    window.dispatchEvent(new Event("storage"))
  }

  return (
    <>
      {data?.length > 0 ? (
        data.map((item) => {
          const isProperty = type === "property"

          const name = isProperty
            ? (item as Property).property_name
            : (item as Listings).property.name

          const unitType = isProperty ? (item as Property).max_price : null

          const description = isProperty
            ? (item as Property).description
            : (item as Listings).property.description

          const location = isProperty
            ? (item as Property).property_location
            : (item as Listings).property.location

          const status = isProperty
            ? (item as Property).status
            : (item as Listings).unit_type

          const price = isProperty
            ? (item as Property).min_price
            : (item as Listings).unit_price

          let imageUrl = ""

          try {
            const images: string[] = JSON.parse(
              isProperty
                ? (item as Property).images
                : (item as Listings).images,
            )

            if (Array.isArray(images) && images.length > 0) {
              imageUrl = isProperty
                ? `${process.env.NEXT_PUBLIC_API_URL}/properties/images/${images[0]}`
                : `${process.env.NEXT_PUBLIC_API_URL}/listings/${images[0]}`
            }
          } catch (error) {
            console.error("Error parsing images:", error)
          }

          const defaultImage =
            "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg"

          const propertyId = isProperty
            ? (item as Property).id
            : (item as Listings).id

          const linkHref = `${toSlug(name)}/${toSlug(
            item.id,
          )}/${toSlug(description || "")}`

          /*
           * Theme:
           * Red   #9B0D15
           * Gray  #373A36
           * White #FFFFFF
           */
          const statusClass =
            status === "RFO"
              ? "bg-[#9B0D15] text-[#FFFFFF]"
              : status === "Under Construction"
                ? "bg-[#9B0D15]/15 text-[#9B0D15]"
                : status === "New"
                  ? "bg-[#373A36] text-[#FFFFFF]"
                  : "bg-[#373A36]/15 text-[#373A36]"

          return (
            <Card
              key={propertyId}
              className="
                w-full
                overflow-hidden
                border
                border-[#373A36]/15
                bg-[#FFFFFF]
                shadow-sm
                transition-all
                duration-200
                hover:shadow-md
              "
            >
              <Link href={linkHref}>
                <CardBody className="overflow-visible p-1">
                  {/* Image */}
                  <div className="overflow-hidden rounded-xl">
                    <img
                      alt={name || "Property Image"}
                      className="
                        aspect-video
                        max-h-32
                        w-full
                        rounded-xl
                        object-cover
                        transition-all
                        duration-300
                        hover:scale-125
                        md:min-h-48
                      "
                      src={imageUrl || defaultImage}
                    />
                  </div>

                  {/* Property Information */}
                  <div className="flex flex-col items-start px-1">
                    {/* Badges */}
                    <div
                      className="
                        mt-2
                        flex
                        w-full
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      {/* Status */}
                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-1
                          rounded-md
                          px-2
                          py-1
                          text-tiny
                          font-semibold
                          uppercase
                          ${statusClass}
                        `}
                      >
                        <LuBuilding2 size={14} />

                        <p className="text-[9px] md:text-tiny">{status}</p>
                      </div>

                      {/* Price / Unit Type */}
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-md
                          bg-[#373A36]
                          px-2
                          py-1
                          font-semibold
                          uppercase
                          text-[#FFFFFF]
                        "
                      >
                        <LuBedDouble size={14} />

                        <p className="text-[9px] md:text-tiny">
                          {filterMaxPrice(unitType as number)}
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <h4
                      className="
                        line-clamp-1
                        text-sm
                        font-bold
                        uppercase
                        text-[#373A36]
                        md:text-large
                      "
                    >
                      {name || "No Data Found"}
                    </h4>

                    {/* Location */}
                    <p
                      className="
                        line-clamp-1
                        text-sm
                        text-[#373A36]/70
                      "
                    >
                      {location || "No Data Found"}
                    </p>
                  </div>
                </CardBody>
              </Link>

              {/* Footer */}
              <CardFooter>
                <div
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-2
                  "
                >
                  {/* Price */}
                  <p
                    className="
                      text-md
                      font-bold
                      uppercase
                      text-[#373A36]
                      md:text-lg
                    "
                  >
                    &#8369; {price?.toLocaleString(undefined) || "0.00"}
                  </p>

                  {/* Compare */}
                  {pathname === "/properties" && (
                    <Tooltip content="Compare">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleCompare(propertyId)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            handleCompare(propertyId)
                          }
                        }}
                        className="
                          flex
                          h-10
                          w-10
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          bg-[#9B0D15]/10
                          text-[#9B0D15]
                          transition-all
                          duration-200
                          hover:bg-[#9B0D15]
                          hover:text-[#FFFFFF]
                        "
                      >
                        {compareList.includes(propertyId) ? (
                          <LuCircleCheck size={20} />
                        ) : (
                          <LuHousePlus size={20} />
                        )}
                      </div>
                    </Tooltip>
                  )}
                </div>
              </CardFooter>
            </Card>
          )
        })
      ) : (
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <NoDataFound />
        </div>
      )}
    </>
  )
}

export default RecommendedCard
