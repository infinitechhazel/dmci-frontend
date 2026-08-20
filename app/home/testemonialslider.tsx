"use client"

import { useRef, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { LuPlay } from "react-icons/lu"

interface Testimonial {
  id: string
  user_id: string
  name: string
  video: string
  thumbnail: string
}

interface TestimonialProps {
  data: Testimonial[]
}

const animation = {
  duration: 50000,
  easing: (t: number) => t,
}

const TestimonialSlider: React.FC<TestimonialProps> = ({ data }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
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
          spacing: 10,
        },
      },
    },
  })

  return (
    <div className="relative w-full py-4">
      <div ref={sliderRef} className="keen-slider">
        {data.map((testimonial) => (
          <TestimonialVideo key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

interface TestimonialVideoProps {
  testimonial: Testimonial
}

const TestimonialVideo: React.FC<TestimonialVideoProps> = ({ testimonial }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div
      className="
        keen-slider__slide
        relative
        overflow-hidden
        rounded-lg
        border
        border-[#373A36]/20
        bg-[#373A36]
        shadow-sm
      "
    >
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_API_URL}/video/${testimonial.video}`}
        poster={`${process.env.NEXT_PUBLIC_API_URL}/video/${testimonial.thumbnail}`}
        className="
          h-64
          w-full
          rounded-md
          object-cover
          sm:h-72
          md:h-80
        "
        style={{
          aspectRatio: "16/9",
        }}
        controls={isPlaying}
        onPause={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play testimonial video from ${testimonial.name}`}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            rounded-md
            bg-[#373A36]/60
            transition-all
            duration-200
            hover:bg-[#9B0D15]/70
          "
        >
          <span
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#9B0D15]
              shadow-lg
              transition-transform
              duration-200
              hover:scale-110
              sm:h-20
              sm:w-20
            "
          >
            <LuPlay
              className="
                ml-1
                h-8
                w-8
                fill-[#FFFFFF]
                text-[#FFFFFF]
                sm:h-10
                sm:w-10
              "
            />
          </span>
        </button>
      )}
    </div>
  )
}

export default TestimonialSlider
