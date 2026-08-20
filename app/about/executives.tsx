"use client";
import React from "react";

import ExecutivesCard from "./card/executivescard";

const Executives = () => {
  return (
    <section className="flex flex-col gap-4 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="text-start">
        <h1 className="font-bold text-2xl sm:text-3xl">Executives</h1>
        <h2 className="text-sm sm:text-base font-normal">
          DMCI Homes is guided by seasoned executives with vast knowledge and
          experience in property development.
        </h2>
      </div>
      <ExecutivesCard />
    </section>
  );
};

export default Executives;
