"use client"

import React, { useEffect, useState } from "react"
import { Card, CardBody, CardFooter, Chip, Image, Tooltip } from "@heroui/react"
import {
  LuCircleCheck,
  LuHousePlus,
  LuBuilding,
  LuBedDouble,
  LuLandPlot,
} from "react-icons/lu"
import Link from "next/link"
import NoDataFound from "../fallback/nodatafound"
import toast from "react-hot-toast"
import { usePathname } from "next/navigation"
import { toSlug } from "@/utils/slug"

interface Property {
  id: string
  property_location: string
  status: string
  property_price: number
  property_type: string
  images: string
  property_description: string
  property_size: string
  property_level: string
  property: {
    name: string
    location: string
  }
}

interface RecommendedCardProps {
  data: Property[]
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ data }) => {
  const pathname = usePathname()

  const [compareList, setCompareList] = useState<string[]>([])

  useEffect(() => {
    const storedCompareList = localStorage.getItem("compareList")

    if (storedCompareList) {
      try {
        setCompareList(JSON.parse(storedCompareList))
      } catch {
        setCompareList([])
      }
    }

    const handleStorageChange = () => {
      const stored = localStorage.getItem("compareList")

      try {
        setCompareList(stored ? JSON.parse(stored) : [])
      } catch {
        setCompareList([])
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleCompare = (id: string) => {
    let updatedCompareList = [...compareList]

    if (updatedCompareList.includes(id)) {
      updatedCompareList = updatedCompareList.filter((item) => item !== id)
    } else {
      if (updatedCompareList.length >= 3) {
        toast.error("You can only compare up to 3 items.")
        return
      }

      updatedCompareList.push(id)
    }

    localStorage.setItem("compareList", JSON.stringify(updatedCompareList))

    setCompareList(updatedCompareList)

    window.dispatchEvent(new Event("storage"))
  }

  const getOrdinalSuffix = (num: string | number) => {
    const n = parseInt(String(num))

    if (isNaN(n)) return ""

    const rem10 = n % 10
    const rem100 = n % 100

    if (rem100 >= 11 && rem100 <= 13) {
      return `${n}th`
    }

    switch (rem10) {
      case 1:
        return `${n}st`
      case 2:
        return `${n}nd`
      case 3:
        return `${n}rd`
      default:
        return `${n}th`
    }
  }

  /*
   * Remove records where the nested property is missing.
   * This prevents:
   * Cannot read properties of null (reading 'name')
   */
  const validData = (data ?? []).filter(
    (item) => item && item.property && item.property.name,
  )

  const defaultImage =
    "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg"

  return (
    <>
      {validData.length > 0 ? (
        [...validData]
          .sort((a, b) => a.property.name.localeCompare(b.property.name))
          .map((item) => {
            const name = item.property.name
            const description = item.property_description
            const location = item.property_location
            const status = item.property_type
            const price = item.property_price

            let imageUrl = ""

            try {
              const images: string[] = JSON.parse(item.images)

              if (Array.isArray(images) && images.length > 0) {
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/properties/images/${images[0]}`
              }
            } catch (error) {
              console.error("Error parsing images:", error)
            }

            const propertyId = item.id

            const linkHref = `${toSlug(name)}/${toSlug(
              item.id,
            )}/${toSlug(description || "")}`

            return (
              <Card
                key={propertyId}
                className="
                  w-full
                  border
                  border-[#373A36]/10
                  bg-[#FFFFFF]
                  text-[#373A36]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <Link href={linkHref}>
                  <CardBody className="min-h-[356px] overflow-visible p-1">
                    {/* Property Image */}
                    <div className="overflow-hidden rounded-xl">
                      <Image
                        alt={name || "Property Image"}
                        className="
                          aspect-video
                          min-h-52
                          w-full
                          rounded-xl
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-105
                          md:max-h-52
                        "
                        src={imageUrl || defaultImage}
                        width={1000}
                      />
                    </div>

                    <div className="flex flex-col items-start px-1">
                      {/* Property Name */}
                      <h4
                        className="
                          mt-3
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

                      {/* Property Location */}
                      <p
                        className="
                          line-clamp-1
                          text-sm
                          text-[#373A36]/70
                        "
                      >
                        {location || "No Data Found"}
                      </p>

                      {/* Property Details */}
                      <div className="flex flex-wrap gap-2 py-2">
                        <Chip
                          startContent={
                            <LuBuilding className="text-[#9B0D15]" />
                          }
                          className="
                            rounded-md
                            border
                            border-[#9B0D15]/20
                            bg-[#9B0D15]/10
                            px-2
                            py-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            text-[#9B0D15]
                            md:text-tiny
                          "
                        >
                          {getOrdinalSuffix(item.property_level)} Floor
                        </Chip>

                        <Chip
                          startContent={
                            <LuLandPlot className="text-[#9B0D15]" />
                          }
                          className="
                            rounded-md
                            border
                            border-[#9B0D15]/20
                            bg-[#9B0D15]/10
                            px-2
                            py-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            text-[#9B0D15]
                            md:text-tiny
                          "
                        >
                          {item.property_size} Sqm.
                        </Chip>

                        <Chip
                          startContent={
                            <LuBedDouble className="text-[#9B0D15]" />
                          }
                          className="
                            rounded-md
                            border
                            border-[#9B0D15]/20
                            bg-[#9B0D15]/10
                            px-2
                            py-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            text-[#9B0D15]
                            md:text-tiny
                          "
                        >
                          {status}
                        </Chip>
                      </div>
                    </div>
                  </CardBody>
                </Link>

                <CardFooter className="border-t border-[#373A36]/10">
                  <div className="flex w-full items-center justify-between gap-3">
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
                        <button
                          type="button"
                          aria-label={
                            compareList.includes(propertyId)
                              ? "Remove from comparison"
                              : "Add to comparison"
                          }
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#9B0D15]/20
                            bg-[#9B0D15]/10
                            text-[#9B0D15]
                            transition-all
                            duration-200
                            hover:bg-[#9B0D15]
                            hover:text-[#FFFFFF]
                          "
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleCompare(propertyId)
                          }}
                        >
                          {compareList.includes(propertyId) ? (
                            <LuCircleCheck size={20} />
                          ) : (
                            <LuHousePlus size={20} />
                          )}
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )
          })
      ) : (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <NoDataFound />
        </div>
      )}
    </>
  )
}

export default RecommendedCard
