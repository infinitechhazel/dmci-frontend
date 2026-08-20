import React from "react";

import AffiliatesImage from "./affiliatesimage";
//for deployment
const Affiliates = () => {
  return (
    //section
    <section className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="text-start">
        <h1 className="font-bold text-2xl sm:text-3xl">Our Affiliates</h1>
        <h2 className="text-sm sm:text-base font-normal">
          DMCI Holdings Inc. along with its subsidiaries has conquered the test
          of time and are always dedicated in providing only the best to the
          communities it serves.
        </h2>
      </div>
      <AffiliatesImage />
    </section>
  );
};

export default Affiliates;
