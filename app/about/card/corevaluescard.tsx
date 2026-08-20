"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Image, Chip } from "@heroui/react";
import { GoDotFill } from "react-icons/go";

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
  ];

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (key: number) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:flex gap-4 py-6">
      {CoreValues.map((item) => (
        <Card
          key={item.key}
          isFooterBlurred
          className="w-full h-[300px] col-span-12 sm:col-span-7"
        >
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <Chip startContent={<GoDotFill />} variant="flat" color="primary" className="uppercase font-bold">{item.title}</Chip>
          </CardHeader>
          <Image
            isZoomed
            removeWrapper
            alt={item.title}
            className="z-0 w-full h-full object-cover"
            src={item.image}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <div className="flex flex-col">
                <p className="text-sm text-white/80 inline">
                  {expanded[item.key]
                    ? item.description
                    : `${item.description.slice(0, 50)}...`}
                  <span
                    onClick={() => toggleExpand(item.key)}
                    className="ml-2 text-green-400 cursor-pointer hover:text-green-200"
                  >
                    {expanded[item.key] ? " See less" : " See more..."}
                  </span>
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CoreValuesCard;
