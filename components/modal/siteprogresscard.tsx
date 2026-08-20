"use client"

import React, { useState } from "react"
import { Card, CardFooter, CardHeader, Image } from "@heroui/react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { formatNumber } from "@/utils/formatNumber"

interface Property {
  name: string
  property_location: string
  status: string
  min_price: number
  max_price: number
  percent: number
  images: string
}

interface SiteProgressProps {
  data: Property[]
}

const PropertyLocation: React.FC<{ location: string }> = ({ location }) => {
  const [expanded, setExpanded] = useState(false)
  const maxLength = 50

  const isLong = location?.length > maxLength

  const displayText =
    !expanded && isLong ? `${location.slice(0, maxLength)}...` : location

  return (
    <p className="text-[10px] text-[#FFFFFF] sm:text-xs">
      {displayText || "No Location Provided"}

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="
            ml-1
            cursor-pointer
            text-[#FFFFFF]
            underline
            underline-offset-2
            transition-opacity
            hover:opacity-70
          "
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  )
}

const SiteProgressCard: React.FC<SiteProgressProps> = ({ data }) => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    breakpoints: {
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 401px) and (max-width: 600px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 601px) and (max-width: 999px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5, spacing: 15 },
      },
    },
  })

  const handlePrev = () => {
    slider.current?.prev()
  }

  const handleNext = () => {
    slider.current?.next()
  }

  return (
    <div className="relative w-full py-6 sm:py-8">
      <div ref={sliderRef} className="keen-slider">
        {data.map((property, index) => {
          let imageUrl = ""

          try {
            const images: string[] = JSON.parse(property.images || "[]")

            if (Array.isArray(images) && images.length > 0) {
              imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/properties/images/${images[0]}`
            }
          } catch (error) {
            console.error("Error parsing images:", error)
          }

          return (
            <div key={index} className="keen-slider__slide">
              <Card
                isFooterBlurred
                className="
                  relative
                  h-[320px]
                  w-full
                  overflow-hidden
                  border
                  border-[#373A36]/20
                  bg-[#373A36]
                  sm:h-[350px]
                  md:h-[380px]
                  lg:h-[400px]
                "
              >
                {/* Status */}
                <CardHeader className="absolute left-0 top-0 z-20 flex-col items-start p-3 sm:p-4">
                  {property.status && (
                    <div
                      className="
                        rounded-md
                        border
                        border-[#FFFFFF]/30
                        bg-[#373A36]/90
                        px-2
                        py-1
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-[#FFFFFF]
                        backdrop-blur-sm
                        sm:text-[10px]
                        md:text-xs
                      "
                    >
                      {property.status}
                    </div>
                  )}
                </CardHeader>

                {/* Property Image */}
                {imageUrl ? (
                  <Image
                    removeWrapper
                    alt={property.name || "DMCI Property"}
                    className="
                      z-0
                      h-full
                      w-full
                      -translate-y-3
                      scale-125
                      object-cover
                      sm:-translate-y-4
                    "
                    src={imageUrl}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#373A36]" />
                )}

                {/* Progress Overlay */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    z-10
                    w-full
                    bg-[#9B0D15]/60
                    transition-all
                    duration-500
                  "
                  style={{
                    height: `${Math.min(
                      Math.max(property.percent || 0, 0),
                      100,
                    )}%`,
                  }}
                />

                {/* Percentage */}
                <div
                  className="
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-center
                    px-4
                    text-center
                    text-xl
                    font-bold
                    text-[#FFFFFF]
                    drop-shadow-lg
                    sm:text-2xl
                    md:text-3xl
                  "
                >
                  {formatNumber(property.percent) || "0.00"}%
                </div>

                {/* Footer */}
                <CardFooter
                  className="
                    absolute
                    bottom-0
                    z-30
                    h-[72px]
                    w-full
                    justify-between
                    border-t
                    border-[#FFFFFF]/30
                    bg-[#373A36]/75
                    px-3
                    backdrop-blur-sm
                    sm:h-[80px]
                    sm:px-4
                  "
                >
                  <div className="min-w-0 overflow-hidden">
                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-[#FFFFFF]
                        sm:text-base
                        md:text-md
                      "
                    >
                      {property.name || "No Property Name"}
                    </p>

                    <PropertyLocation location={property.property_location} />
                  </div>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Navigation Buttons */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-1/2
          z-40
          flex
          w-full
          -translate-y-1/2
          items-center
          justify-between
          px-2
          sm:px-4
        "
      >
        <button
          type="button"
          aria-label="Previous property"
          className="
            pointer-events-auto
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#FFFFFF]/40
            bg-[#9B0D15]/90
            text-xl
            leading-none
            text-[#FFFFFF]
            shadow-lg
            transition-all
            duration-200
            hover:bg-[#9B0D15]
            hover:scale-105
            active:scale-95
            sm:h-10
            sm:w-10
            sm:text-2xl
          "
          onClick={handlePrev}
        >
          &#8249;
        </button>

        <button
          type="button"
          aria-label="Next property"
          className="
            pointer-events-auto
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#FFFFFF]/40
            bg-[#9B0D15]/90
            text-xl
            leading-none
            text-[#FFFFFF]
            shadow-lg
            transition-all
            duration-200
            hover:bg-[#9B0D15]
            hover:scale-105
            active:scale-95
            sm:h-10
            sm:w-10
            sm:text-2xl
          "
          onClick={handleNext}
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}

export default SiteProgressCard
