"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardFooter, Image, Chip } from "@heroui/react"
import { GoDotFill } from "react-icons/go"

const CoreValuesCard = () => {
  const CoreValues = [
    {
      key: 1,
      title: "Interdependence",
      image:
        "https://www.dmcihomes.com/uploads/media/core-values-interdependence.jpg",
      description:
        "With unity in purpose and mutual trust and respect for each other, we work toward shared aspirations and transcend boundaries along functional and organizational lines.",
    },
    {
      key: 2,
      title: "Customer Orientation",
      image:
        "https://www.dmcihomes.com/uploads/media/core-values-customer-orientation.jpg",
      description:
        "Our goal is to delight and please our customers. Thus, all activities and programs we undertake result in innovative projects and in the enhancement of productivity and quality.",
    },
    {
      key: 3,
      title: "Excellence",
      image:
        "https://www.dmcihomes.com/uploads/media/core-values-excellence.jpg",
      description:
        "We reject mediocrity and strive for excellence in even the smallest of details.",
    },
    {
      key: 4,
      title: "Integrity",
      image:
        "https://www.dmcihomes.com/uploads/media/core-values-1550807898224.jpg",
      description:
        "All our actions are guided by what is ethical, fair, and right. Believing in profit with honor, we are committed to good governance and the highest moral standards.",
    },
  ]

  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const toggleExpand = (key: number) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
      {CoreValues.map((item) => (
        <Card
          key={item.key}
          isFooterBlurred
          className="w-full h-[300px] col-span-1"
        >
          {/* Title */}
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <Chip
              startContent={<GoDotFill />}
              variant="flat"
              className="uppercase font-bold bg-[#FFFFFF] text-[#9B0D15]"
            >
              {item.title}
            </Chip>
          </CardHeader>

          {/* Image */}
          <Image
            isZoomed
            removeWrapper
            alt={item.title}
            className="z-0 w-full h-full object-cover"
            src={item.image}
          />

          {/* Description */}
          <CardFooter className="absolute bg-[#373A36]/80 bottom-0 z-10 border-t border-[#FFFFFF]/30">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-sm text-[#FFFFFF]/90 inline">
                  {expanded[item.key]
                    ? item.description
                    : `${item.description.slice(0, 50)}...`}

                  <button
                    type="button"
                    onClick={() => toggleExpand(item.key)}
                    className="ml-2 text-[#FFFFFF] font-semibold cursor-pointer hover:text-[#9B0D15] transition-colors"
                  >
                    {expanded[item.key] ? "See less" : "See more..."}
                  </button>
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default CoreValuesCard
