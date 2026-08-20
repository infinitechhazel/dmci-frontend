"use client";
import { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { LuPlay } from "react-icons/lu";

interface Testimonial {
  id: string;
  user_id: string;
  name: string;
  video: string;
  thumbnail: string;
}

interface TestimonialProps {
  data: Testimonial[];
}

const animation = { duration: 50000, easing: (t: number) => t };

const TestimonialSlider: React.FC<TestimonialProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: true, // Allow manual dragging
    slides: { perView: 1, spacing: 15 }, // Default spacing
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 720px) and (max-width: 999px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
  });
  
  return (
    <div className="relative py-4">
      <div ref={sliderRef} className="keen-slider">
        {data.map((testimonial) => {
          const videoRef = useRef<HTMLVideoElement>(null);
          const [isPlaying, setIsPlaying] = useState(false);

          const handlePlay = () => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          };

          return (
            <div key={testimonial.id} className="keen-slider__slide border rounded-lg shadow-sm relative">
              <video
                ref={videoRef}
                src={`${process.env.NEXT_PUBLIC_API_URL}/video/${testimonial.video}`}
                className="w-full h-80 rounded-md object-cover"
                style={{ aspectRatio: "16/9" }}
                poster={`${process.env.NEXT_PUBLIC_API_URL}/video/${testimonial.thumbnail}`}
                controls={isPlaying}
              />
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md"
                >
                  <LuPlay className="w-16 h-16 text-white" />
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default TestimonialSlider;
