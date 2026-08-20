import ContactUs from "../home/contactus";

import VisionMission from "./visionmission";
import CoreValues from "./corevalues";
import BrandHistory from "./brandhistory";
// import BrandValues from "./brandvalues";
import Certificates from "./certificate";
import Partners from "./partners";
import Executives from "./executives";
import Affiliates from "./affiliates";
import AboutNews from "./news";

import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="mx-auto px-4  xl:px-24">
      <VisionMission />
      <CoreValues />
      <BrandHistory />
      {/* <BrandValues /> */}
      <Certificates />
      <Partners />
      <Executives />
      <Affiliates />
      <ContactUs />
    </div>
  );
}
