"use client"

import React, { useState } from "react"
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  Slider,
  Button,
  Divider,
} from "@heroui/react"
import { useRouter } from "next/navigation"

const FilterPropertyModal = () => {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("")
  const [types, setTypes] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1000000, 50000000,
  ])

  const router = useRouter()

  const options = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "Tandem Unit",
    "Studio w/ Parking",
    "1 Bedroom w/ Parking",
    "2 Bedroom w/ Parking",
    "3 Bedroom w/ Parking",
    "Tandem Unit w/ Parking",
    "Studio w/ Tandem Parking",
    "1 Bedroom w/ Tandem Parking",
    "2 Bedroom w/ Tandem Parking",
    "3 Bedroom w/ Tandem Parking",
    "Tandem Unit w/ Tandem Parking",
    "1 Parking Slot",
    "Tandem Parking",
  ]

  const handleSearch = () => {
    setLoading(true)

    const query = {
      location: location.trim(),
      types: types || "",
      min_price: priceRange[0].toString(),
      max_price: priceRange[1].toString(),
    }

    const queryString = new URLSearchParams(query).toString()

    router.push(`/property-finder?${queryString}`)
  }

  return (
    <Card
      className="
        mx-auto
        w-full
        rounded-xl
        border
        border-[#FFFFFF]/40
        bg-[#373A36]/80
        p-4
        shadow-lg
        backdrop-blur-lg
      "
    >
      <CardBody>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-[#FFFFFF]">
            What are you looking for?
          </h2>

          <Divider className="my-4 bg-[#FFFFFF]/30" />

          <form
            className="
              flex
              w-full
              flex-col
              items-center
              gap-4
              md:flex-row
            "
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}
          >
            {/* Location */}
            <Input
              className="inline-flex w-full"
              size="lg"
              label="Enter Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              classNames={{
                label: "text-[#FFFFFF]",
                input: "text-[#373A36]",
                inputWrapper: `
                  bg-[#FFFFFF]
                  border-[#FFFFFF]
                  hover:border-[#9B0D15]
                  focus-within:border-[#9B0D15]
                `,
              }}
            />

            {/* Unit Type */}
            <Select
              className="inline-flex w-full"
              size="lg"
              label="Select Unit/PS Type"
              selectedKeys={types ? [types] : []}
              onChange={(e) => setTypes(e.target.value)}
              classNames={{
                label: "text-[#FFFFFF]",
                value: "text-[#373A36]",
                trigger: `
                  bg-[#FFFFFF]
                  border-[#FFFFFF]
                  hover:border-[#9B0D15]
                  data-[focus=true]:border-[#9B0D15]
                `,
              }}
            >
              {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
              ))}
            </Select>

            {/* Price Range */}
            <div className="flex w-full flex-col">
              <Slider
                className="inline-flex w-full"
                formatOptions={{
                  style: "currency",
                  currency: "PHP",
                }}
                label="Price Range"
                maxValue={50000000}
                minValue={1000000}
                step={100000}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
                classNames={{
                  label: "text-[#FFFFFF]",
                  value: "text-[#FFFFFF]",
                  filler: "bg-[#9B0D15]",
                  track: "bg-[#FFFFFF]/40",
                  thumb: "border-[#9B0D15] bg-[#FFFFFF]",
                }}
              />
            </div>

            {/* Search */}
            <Button
              isLoading={loading}
              size="lg"
              type="submit"
              className="
                inline-flex
                w-full
                max-w-sm
                bg-[#9B0D15]
                font-semibold
                text-[#FFFFFF]
                shadow-md
                transition-all
                duration-200
                hover:bg-[#9B0D15]/90
              "
              spinner={
                <span className="border-[#FFFFFF] border-t-transparent" />
              }
            >
              Search Property
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  )
}

export default FilterPropertyModal
