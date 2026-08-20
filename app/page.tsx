import RecommendedForYou from "./home/recommended";
import SiteProgress from "./home/siteprogress";
import ContactUs from "./home/contactus";
import HeroSection from "./home/herosection";
import HomeNews from "./home/news";
import TestimonialSection from "./home/testimonialsection";
import Testimonials from "./home/testimonials";
import FrequentlyAskQuestions from "./home/faq";

export default function Home() {
  return (
    <section className="overflow-x-hidden">
      <HeroSection />
      <div className="flex-grow px-4 xl:px-24">
        <Testimonials />
        <RecommendedForYou />
        <SiteProgress />
        <HomeNews />
        <FrequentlyAskQuestions/>
        <ContactUs />
        <TestimonialSection />
      </div>
    </section>
  );
}
