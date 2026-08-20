import React from "react";

import BrandValuesCard from "./card/brandvaluescard";

const BrandValues = () => {
  return (
    <section className="flex flex-col gap-4 py-6 md:py-8 ">
      <div className="text-start py-6">
        <h1 className="font-bold text-3xl">Brand Values</h1>
        <h2>
          Know what makes a DMCI Homes development a cut above the rest.
        </h2>
      </div>
      <BrandValuesCard />
    </section>
  );
};

export default BrandValues;
