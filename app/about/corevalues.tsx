import React from "react";

import CoreValuesCard from "./card/corevaluescard";

const CoreValues = () => {
  return (
    <section className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="text-start">
        <h1 className="font-bold text-2xl sm:text-3xl">Our Core Values</h1>
        <p className="text-sm sm:text-base">
          Learn about our company&apos;s fundamental beliefs
        </p>
      </div>
      <CoreValuesCard />
    </section>
  );
};

export default CoreValues;
