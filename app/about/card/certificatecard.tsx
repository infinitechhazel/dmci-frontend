"use client";
import React from "react";
import { Card, CardBody, Image } from "@heroui/react";

const CertificateCard = () => {
  const certificateData = [
    {
      key: 1,
      title: "Quadruple A Contractor",
      image:
        "https://www.dmcihomes.com/uploads/media/quadruple-a-contractor-66c6a0b70243b.webp",
      description:
        "The notice on DMCI Homes' upgraded category was released on January 18, 2017 by Philippine Contractors Accreditation Board (PCAB). The AAAA license given to DMCI Homes is currently the highest given to firms that satisfy the institution's requirements.",
    },

    {
      key: 2,
      title: "Philippine Quill Awards 2012",
      image:
        "https://www.dmcihomes.com/uploads/media/certifications-and-awards-1551158091582.png",
      description:
        "DMCI Homes Ikaw Na, Maybe Customer Service Campaign won an Excellence Award in the 11th Philippine Quill Awards for Communication Management Division Employee/Member Communication Category. The Philippine Quill is the country s most prestigious and relevant award for business communicators.",
    },

    {
      key: 3,
      title: "Annual Communicator Awards",
      image:
        "https://www.dmcihomes.com/uploads/media/certifications-and-awards-1551158162380.png",
      description:
        "DMCI Homes was awarded with distinction for its: Corporate Website, Mobile Application, and Print Ad: Ours is a Story on Quality. The Communicator Awards is the leading international awards program recognizing big ideas in marketing and communications. ",
    },

    {
      key: 4,
      title: "ULI Healthy Places Awards",
      image:
        "https://www.dmcihomes.com/uploads/media/certifications-and-awards-1551158690171.png ",
      description:
        "Aiming to recognize outstanding and innovative development with advance design strategies that focus on the development of environment and promote healthy living in the country, the recently-concluded 1st ULI Philippines Healthy Places Awards conferred DMCI Homes Arista Place as the winner in the residential category.  ",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
      {certificateData.map((index) => (
        <Card
          key={index.key}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 "
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="Album cover"
                  className="object-cover"
                  height={200}
                  shadow="md"
                  src={index.image}
                  width="100%"
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h1 className="text-large font-bold">{index.title}</h1>
                    <p className="text-small text-foreground/80 ">
                      {index.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CertificateCard;
