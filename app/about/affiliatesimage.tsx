"use client";
import React from "react";
import { Image } from "@heroui/react";

const AffiliatesImage = () => {
  const partnerData = [
    {
      key: 1,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1563253721818.jpg",
    },

    {
      key: 2,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377809892.jpg",
    },

    {
      key: 3,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377895748.jpg",
    },
    {
      key: 4,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377920581.jpg",
    },
    {
      key: 5,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377952905.jpg",
    },
    {
      key: 6,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377977900.jpg",
    },
    {
      key: 7,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1553167305245.jpg",
    },
    {
      key: 8,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552377998070.jpg",
    },
    {
      key: 9,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1563258239287.jpg",
    },
    {
      key: 10,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1641127835619.jpeg",
    },
    {
      key: 11,
      image:
        "https://www.dmcihomes.com/uploads/media/affiliates-1552378020317.jpg",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {partnerData.map((index) => (
        <img
          key={index.key}
          alt="NextUI hero Image"
          src={index.image}
          width={120}
        />
      ))}
    </div>
  );
};

export default AffiliatesImage;
