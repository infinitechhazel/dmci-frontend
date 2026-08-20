"use client";
import React from "react";
import { Card, CardFooter, Image } from "@heroui/react";

const BrandValuesCard = () => {
  const brandData = [
    {
      key: 1,
      title: "Modern City in Living",
      image:
        `${process.env.NEXT_PUBLIC_API_URL}/assets/img/brand-values-modern-city.jpg`,
    },

    {
      key: 2,
      title: "Medium Density development",
      image:
        `${process.env.NEXT_PUBLIC_API_URL}/assets/img/brand-values-medium-density.jpg`,
    },

    {
      key: 3,
      title: "Resort Living",
      image: `${process.env.NEXT_PUBLIC_API_URL}/assets/img/Resort%20Living.jpg`,
    },
    {
      key: 4,
      title: "themes development",
      image:
        `${process.env.NEXT_PUBLIC_API_URL}/assets/img/brand-values-themed-development.jpg`,
    },
    {
      key: 5,
      title: "quality workmanship",
      image:
          `${process.env.NEXT_PUBLIC_API_URL}/assets/img/brand-values-quality-workmanship.jpg`,
    },

    {
      key: 6,
      title: "ready for occupancy",
      image:
        `${process.env.NEXT_PUBLIC_API_URL}/assets/img/Ready%20for%20occupancy.jpg`,
    },

    {
      key: 7,
      title: "worry-free living",
      image: `${process.env.NEXT_PUBLIC_API_URL}/assets/img/Worry-free%20lving.jpg`,
    },
  ];

  return (
    <div className="grid grid-col-span-1 md:grid-cols-4 gap-4">
      {brandData.map((index) => (
        <Card
          key={index.key}
          isFooterBlurred
          className="border-none"
          radius="lg"
        >
          <Image
            isZoomed
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src={index.image}
            width={"100%"}
          />
          <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-md font-medium capitalize text-white/80">
              {index.title}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BrandValuesCard;
