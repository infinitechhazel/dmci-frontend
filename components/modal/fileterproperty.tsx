"use client";
import React, { useState } from "react";
import {
  Select,
  SelectItem,
  Card,
  CardBody,
  Input,
  Slider,
  Button,
  Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const FilterPropertyModal = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [types, setTypes] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1000000, 50000000,
  ]);
  const router = useRouter();

  const options = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "Tandem Unit",
    "Studio w/ Parking",
    "1 Bedroom w/ Parking",
    "2 Bedroom w/ Parking",
    "3 Bedroom w/ Parking",
    "Tandem Unit w/ Parking",
    "Studio w/ Tandem Parking",
    "1 Bedroom w/ Tandem Parking",
    "2 Bedroom w/ Tandem Parking",
    "3 Bedroom w/ Tandem Parking",
    "Tandem Unit w/ Tandem Parking",
    "1 Parking Slot",
    "Tandem Parking",
  ];

  const handleSearch = () => {
    setLoading(true);
    const query = {
      location: location.trim(),
      types: types || "",
      min_price: priceRange[0].toString(),
      max_price: priceRange[1].toString(),
    };
    const queryString = new URLSearchParams(query).toString();
    setLoading(false);
    router.push(`/property-finder?${queryString}`);
  };

  return (
    <Card className="w-full mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-xl border border-white/40 p-4">
      <CardBody>
        <div className="flex flex-col">
          {/* Title */}
          <h2 className="text-lg font-semibold text-white">
            What are you looking for?
          </h2>
          <Divider className="my-4" />

          <form
            className="flex flex-col md:flex-row items-center gap-4 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            {/* Location Input */}
            <Input
              className="inline-flex w-full"
              size="lg"
              label="Enter Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* Unit Type Select */}
            <Select
              className="inline-flex w-full"
              size="lg"
              label="Select Unit/PS Type"
              value={types || ""}
              onChange={(e) => setTypes(e.target.value)}
            >
              {options.map((option) => (
                <SelectItem key={option}>{option}</SelectItem>
              ))}
            </Select>

            {/* Price Range Slider */}
            <div className="flex flex-col w-full">
              <Slider
                className="w-full inline-flex text-white"
                formatOptions={{ style: "currency", currency: "PHP" }}
                label="Price Range"
                maxValue={50000000}
                minValue={1000000}
                step={100000}
                value={priceRange}
                onChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>

            {/* Search Button */}
            <Button
              isLoading={loading}
              color="primary"
              size="lg"
              type="submit"
              className="inline-flex w-full max-w-sm"
            >
              Search Property
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
};

export default FilterPropertyModal;
