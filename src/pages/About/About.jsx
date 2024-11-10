import SdgCarousel from "/src/pages/About/SdgCarousel";
import holding_sdg_wheel from "/src/assets/images/holding_sdg_wheel.svg";

import background from "/src/assets/images/plants-background.svg";
import RelevantSDGAccodian from "./RelevantSDGAccordion";
import FeaturesCards from "./FeaturesCards";

export const About = () => {
  return (
    <div data-testid="about-page">

      {/* About SDG Scholar */}
      <div className="flex flex-col md:flex-row">

        {/* LHS */}
        <div className="flex flex-col md:w-1/2 justify-center pr-8 pl-8 pb-8">
          <h1 className="leading-[1.2] mb-1">Redefining <span className="text-orange-500">SDG Education, </span>One Goal at a Time</h1>
          <p>Discover the United Nations&apos; SDGs like never before! Explore each SDGs&apos; worlds—complete quizzes, unlock new places and make an impact as you learn and grow</p>
        </div>

        {/* RHS */}
        <div className="md:w-1/2 flex justify-center items-center pr-8 pl-8 pb-8">
          <img
            src={holding_sdg_wheel}
            alt="SDG wheel"
            className="w-auto h-auto"
          />
        </div>
      </div>

      {/* SDG Scholar Key Features */}
      <div className="px-16 pt-12">
        <h2 className="leading-[1.3] mb-1 text-center text-4xl font-bold">Dive into the Experience</h2>
        <p className="text-center">SDG Scholar is designed to make learning about the SDGs fun, engaging, and impactful</p>
        <FeaturesCards />
      </div>

      {/* What are the SDGs s */}
      <div className="relative h-screen bg-no-repeat bg-center bg-contain flex justify-center items-center" 
      style={{
        backgroundImage: `url(${background})`,
        }}>

        {/* Text Section that overlaps the background image */}
        <div className="absolute top-20 w-full">
          <h2 className="leading-[1.3] mb-2 text-center text-4xl font-bold">What are the SDGs?</h2>
          <p className="text-center mx-auto max-w-5xl">
            The Sustainable Development Goals (SDGs) are a set of 17 global goals adopted by all United Nations Member States in 2015, to address issues including poverty, inequality, climate change, and environmental degradation. These goals are interconnected, targeting a more sustainable and equitable future for everyone by 2030.
          </p>
          <p className="text-center pt-16 font-semibold text-black">
            Find out more from the official United Nations website!
          </p>
        </div>

        {/* Carousel Section */}
        <div className="mt-32">
          <SdgCarousel />
        </div>
      </div>

      {/* How are SDGs related to you */}
      <div className="flex flex-col items-center mx-16">
        <h2 className="leading-[1.3] mb-1 text-center text-4xl font-bold">How Are SDGs Related To You?</h2>
        <p className="text-center">Discover how the SDGs connect to your studies and career across fields</p>
        <RelevantSDGAccodian />
      </div>

      {/* Attributions */}
      <div className="flex flex-col items-center p-12">
        <h2 className="leading-[1.3] text-center text-4xl font-bold">Attributions</h2>
        <p className="text-center max-w-4xl">We use images from <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Freepik</a> to 
        enhance our site&apos;s visuals and referenced the official <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">UN website</a> to develop our content. 
        We also use <a href="https://www.npmjs.com/package/react-quill" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">ReactQuill</a> for the text editor in our admin content pages.</p>
      </div>

    </div>
  );
};
