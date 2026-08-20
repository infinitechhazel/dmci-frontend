import React from "react";

import PartmetImage from "./partnerimage";

const Partners = () => {
  return (
    <section className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:py-8 lg:px-8">
      <div className="text-start">
        <h1 className="font-bold text-2xl sm:text-3xl">Our Partners</h1>
        <p className="text-sm sm:text-base">
          DMCI Homes fosters partnerships with only the best companies to ensure
          the excellent quality of properties we provide.
        </p>
      </div>
      <PartmetImage />
    </section>
  );
};

export default Partners;
