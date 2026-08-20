"use client";
import React from "react";
import { Image } from "@heroui/react";

const PartmetImage = () => {
  const partnerData = [
    {
      key: 1,
      image: "https://www.dmcihomes.com/uploads/media/bpi.jpg",
    },

    {
      key: 2,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1550835568259.jpg",
    },

    {
      key: 3,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551156543414.jpg",
    },
    {
      key: 4,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551156606344.jpg",
    },
    {
      key: 5,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551156695438.jpg",
    },
    {
      key: 6,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157038919.jpg",
    },
    {
      key: 7,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157111806.jpg",
    },
    {
      key: 8,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157171813.jpg",
    },
    {
      key: 9,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157229700.jpg",
    },
    {
      key: 10,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157297236.jpg",
    },
    {
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157346861.jpg",
    },
    {
      key: 11,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157401916.jpg",
    },
    {
      key: 12,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157434324.jpg",
    },
    {
      key: 13,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157470053.jpg",
    },
    {
      key: 14,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157531692.jpg",
    },
    {
      key: 15,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157577108.jpg",
    },
    {
      key: 16,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157619204.jpg",
    },
    {
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157663219.jpg",
    },
    {
      key: 17,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157852213.jpg",
    },

    {
      key: 18,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157899283.jpg",
    },
    {
      key: 19,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157939371.jpg",
    },
    {
      key: 20,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551157972275.jpg",
    },
    {
      key: 21,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551158019618.jpg",
    },
    {
      key: 22,
      image:
        "https://www.dmcihomes.com/uploads/media/partner-image-1551158059652.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 py-6">
      {partnerData.map((index) => (
        <Image
          key={index.key}
          alt="NextUI hero Image"
          src={index.image}
          width={120}
        />
      ))}
    </div>
  );
};

export default PartmetImage;
