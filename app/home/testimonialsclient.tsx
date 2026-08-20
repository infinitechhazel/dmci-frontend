"use client"

import { Card, CardBody, CardFooter, Divider } from "@heroui/react"
import React, { useEffect, useState } from "react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

interface Testimonial {
  name: string
  message: string
  created_at: string
}

interface TestimonialProps {
  data: Testimonial[]
}

const animation = {
  duration: 50000,
  easing: (t: number) => t,
}

const TestimonialClients: React.FC<TestimonialProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: true,
    slides: {
      perView: 1,
      spacing: 15,
    },

    created(s) {
      s.moveToIdx(5, true, animation)
    },

    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },

    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },

    breakpoints: {
      "(max-width: 400px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },

      "(min-width: 720px) and (max-width: 999px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },

      "(min-width: 1000px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
    },
  })

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  useEffect(() => {
    if (slider.current) {
      slider.current.update()
    }
  }, [data, slider])

  return (
    <div className="relative py-4">
      <div ref={sliderRef} className="keen-slider">
        {data.map((testimonial, index) => (
          <div key={index} className="keen-slider__slide">
            <Card
              className="
                mb-4
                min-h-[250px]
                border
                border-[#373A36]/20
                bg-[#FFFFFF]
                shadow-md
              "
            >
              <CardBody className="py-6">
                <p
                  className="
                    inline
                    text-md
                    italic
                    text-[#373A36]
                  "
                >
                  &quot;
                  {expandedIndex === index || testimonial.message.length <= 200
                    ? testimonial.message
                    : `${testimonial.message.slice(0, 200)}...`}
                  &quot;
                  {testimonial.message.length > 200 && (
                    <span
                      onClick={() => toggleExpand(index)}
                      className="
                        ml-2
                        cursor-pointer
                        font-semibold
                        text-[#9B0D15]
                        hover:text-[#9B0D15]/80
                      "
                    >
                      {expandedIndex === index ? "See Less" : "See More"}
                    </span>
                  )}
                </p>
              </CardBody>

              <Divider className="bg-[#373A36]/20" />

              <CardFooter
                className="
                  flex
                  flex-col
                  items-start
                  justify-start
                "
              >
                <h1
                  className="
                    py-2
                    text-start
                    text-lg
                    font-bold
                    text-[#9B0D15]
                  "
                >
                  {testimonial.name}
                </h1>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialClients
