import React from "react";
import { Card, CardBody, Image, CardFooter } from "@heroui/react";

const ExecutivesCard = () => {
  const executivesData = [
    {
      key: 1,
      image:
        "https://www.dmcihomes.com/uploads/media/executives-1553166509286.jpg",
      name: "Isidro A. Consunji",
      position: "Chairman",
    },
    {
      key: 2,
      image:
        "https://www.dmcihomes.com/uploads/media/executives-1553166575441.jpg",
      name: "Alfredo R. Austria",
      position: "President",
    },
    {
      key: 3,
      image:
        "https://www.dmcihomes.com/uploads/media/executives-1553166678429.jpg",
      name: "Edwina C. Laperal",
      position: "Treasurer",
    },

    {
      key: 4,
      image:
        "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg",
      name: "Enrico C. Wong",
      position:
        "Senior Vice President - General Services, Leasing, Alta Vista De Boracay, Property Management, and Purchasing",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6">
      {executivesData.map((executive) => (
        <Card key={executive.key}>
          <CardBody>

            <div>
              <Image
                isZoomed
                alt={executive.name}
                className="object-cover rounded-xl"
                src={executive.image}
                width={1000}
                height={250}
              />
            </div>
            <div className="flex flex-col justify-start mt-4">
              <h1 className="font-bold text-large uppercase">{executive.name}</h1>
              <small className="text-default-500 ">
                {executive.position}
              </small>
            </div>
          </CardBody>

        </Card>
      ))}
    </div>
  );
};

export default ExecutivesCard;
