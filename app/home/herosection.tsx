"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Image, Spinner } from "@heroui/react"
import FilterPropertyModal from "@/components/modal/fileterproperty"
import { getAuthHeaders } from "../auth"
import { MdArrowOutward } from "react-icons/md"
import { toSlug } from "@/utils/slug"
import { raleway } from "@/utils/font"

const HeroSection = () => {
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchProperty = async () => {
      const headers = getAuthHeaders()

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/featured-property`,
          {
            method: "GET",
            headers,
          },
        )

        const data = await response.json()
        setProperty(data.record)
      } catch (error) {
        console.error("Error fetching featured property:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [])

  if (loading) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#373A36] py-12">
        <Spinner
          size="lg"
          label="Loading Section..."
          color="danger"
          classNames={{
            label: "text-[#FFFFFF]",
          }}
        />
      </section>
    )
  }

  if (!property) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-[#FFFFFF] text-[#373A36]">
        <p>Failed to load featured property.</p>
      </section>
    )
  }

  return (
    <section
      className="
        relative
        h-auto
        w-full
        bg-[#373A36]
        bg-cover
        bg-right-top
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/hero-banner.png')",
      }}
    >
      {/* Gray Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[#373A36]/55" />

      {/* Brand / Logo */}
      <div
        className="
          absolute
          inset-0
          top-12
          z-20
          w-full
          bg-contain
          bg-center
          bg-no-repeat
          py-12
          opacity-20
          xl:left-24
          xl:bg-left
        "
      >
        {/* Mobile Logo */}
        <div className="mt-[-60px] flex justify-center sm:hidden">
          <Image
            src="/dmci-logo-hero.png"
            alt="DMCI Logo Mobile"
            width={210}
            height={68}
            className="ml-[-60px] mt-[-17px] object-contain"
          />

          <div
            className="
              ml-[-100px]
              text-5xl
              font-bold
              text-[#FFFFFF]
              underline
              sm:text-7xl
              md:text-7xl
              lg:text-8xl
              xl:text-[200px]
              [@media(max-width:344px)]:text-2xl
            "
          >
            DMCI HOMES
          </div>
        </div>

        {/* Tablet / Desktop Logo */}
        <div className="hidden flex-row items-center gap-4 sm:flex">
          <Image src="/dmci-logo-hero.png" alt="DMCI Logo" height={350} />

          <div
            className="
              text-4xl
              font-bold
              text-[#FFFFFF]
              underline
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-[200px]
            "
          >
            DMCI HOMES
          </div>
        </div>
      </div>

      {/* Mobile Ma'am Ela */}
      <div
        className="
          absolute
          right-[-25px]
          top-[220px]
          z-20
          xl:hidden
          [@media(min-width:320px)_and_(max-width:385px)]:top-[230px]
          [@media(min-width:640px)_and_(max-width:770px)]:top-[250px]
          [@media(min-width:1085px)_and_(max-width:1273px)]:top-[100px]
        "
      >
        <Image
          src="/ella-profile.png"
          alt="Ella Profile Mobile"
          className="
            h-[250px]
            w-[250px]
            object-contain
            md:h-[300px]
            md:w-[300px]
          "
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col px-4 text-[#FFFFFF] xl:px-24">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          {/* Content */}
          <div className="relative h-auto w-full bg-contain bg-left bg-no-repeat py-24">
            <div className="z-40 flex w-full max-w-3xl flex-col text-center xl:text-start">
              <h1>
                <span
                  className={`
                    text-5xl
                    font-bold
                    capitalize
                    text-[#FFFFFF]
                    sm:text-7xl
                    ${raleway.className}
                  `}
                >
                  {property?.property?.slogan || ""}
                </span>
              </h1>

              <p className="mt-4 line-clamp-5 text-lg text-[#FFFFFF]/90 xl:text-xl">
                {property?.property_description}
              </p>
            </div>

            {/* CTA */}
            <div className="z-50 mt-8 flex justify-center gap-3 xl:justify-start">
              <Button
                size="lg"
                endContent={<MdArrowOutward />}
                isLoading={buttonLoading}
                variant="solid"
                className="
                  bg-[#9B0D15]
                  font-semibold
                  text-[#FFFFFF]
                  shadow-lg
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-[#9B0D15]/90
                "
                onPress={() => {
                  setButtonLoading(true)

                  router.push(
                    `${toSlug(property.property.name)}/${toSlug(
                      property.id,
                    )}/${toSlug(property.property_description || "")}`,
                  )
                }}
              >
                Visit {property?.property?.name || "Property"}
              </Button>
            </div>

            {/* Mobile Filter */}
            <div className="z-50 flex w-full justify-center py-4 xl:hidden">
              <FilterPropertyModal />
            </div>
          </div>

          {/* Desktop Ela Image */}
          <div className="hidden justify-center xl:flex">
            <Image
              src="/ella-profile.png"
              width={600}
              height={700}
              className="object-cover object-top"
              alt="Ella Profile Desktop"
            />
          </div>
        </div>
      </div>

      {/* Desktop Filter */}
      <div className="absolute bottom-0 left-0 z-20 mb-4 hidden w-full justify-center px-4 xl:flex xl:px-24">
        <FilterPropertyModal />
      </div>

      {/* Red Bottom Accent */}
      <div className="absolute bottom-0 left-0 z-30 h-2 w-full bg-[#9B0D15]" />
    </section>
  )
}

export default HeroSection
