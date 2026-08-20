import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import React from "react";
import "lightbox2/dist/css/lightbox.min.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Testimonial {
    name: string;
    image: string;
    created_at: string;
}

interface TestimonialProps {
    data: Testimonial[];
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
};
const animation = { duration: 50000, easing: (t: number) => t };
const ContractSigning: React.FC<TestimonialProps> = ({ data }) => {
    
    // Sort data by date (newest first)
    const sortedData = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
                slides: { perView: 6, spacing: 15 },
            },
        },
    });

    return (
        <div>
            <div ref={sliderRef} className="keen-slider">
                {sortedData.map((testimonial, index) => (
                    <div key={index} className="keen-slider__slide">
                        <Card>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-0 w-full object-top"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/contracts/${testimonial.image}`}
                                height={400}
                                width={150}
                            />
                            <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">{formatDate(testimonial.created_at)}</p>
                                <h4 className="text-white font-medium text-large">{testimonial.name}</h4>
                            </CardFooter>

                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContractSigning;
