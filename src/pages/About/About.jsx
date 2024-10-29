import SdgCarousel from "/src/pages/About/SdgCarousel";
import { Icon } from "@iconify/react";
import holding_sdg_wheel from "/src/assets/images/holding_sdg_wheel.svg";

//import logo_horizontal from "/src/assets/icons/logo_horizontal.svg";

import SDG_logo_Square_Transparent from "/src/assets/images/SDG_logo_Square_Transparent.svg";
import background from "/src/assets/images/plants-background.svg";
import RelevantSDGAccodian from "./RelevantSDGAccordian";
import FeaturesCards from "./FeaturesCards";
export const About = () => {
  return (
    <div data-testid="about-page">
      {/* About SDG Scholar */}

      <div className="flex flex-col md:flex-row">
        {/* LHS */}
        <div className="flex flex-col md:w-1/2 justify-center pr-8 pl-8 pb-8">
          <h1 className="leading-[1.2] mb-1">Redefining <span className="text-orange-500">SDG Education, </span>One Goal at a Time</h1>
          <p>Discover the United Nations’ SDGs like never before! Explore each SDGs’ worlds—complete quizzes, unlock new places and make an impact as you learn and grow</p>
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
      <div className="mt-12 mb-12 pb-8 pl-8">
        <h1 className="leading-[1.3] mb-1 text-center">Dive into the Experience</h1>
        <p className="text-center">SDG Scholar is designed to make learning about the SDGs fun, engaging, and impactful</p>
        <FeaturesCards />
      </div>

      {/* What are the SDGs s */}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-between md:w-1/2 p-10 border-r border-gray-300 px-4">
          <img
            src={SDG_logo_Square_Transparent}
            alt="Sustainable Development Goals"
            className="w-auto h-auto p-4"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center items-center p-10">
          <p>
            The Sustainable Development Goals (SDGs) are a set of 17 global
            goals adopted by all United Nations Member States in 2015, to
            address issues including poverty, inequality, climate change, and
            environmental degradation. These goals are interconnected, targeting
            a more sustainable and equitable future for everyone by 2030.
          </p>
          <p>
            It&apos;s easy to feel overwhelmed by the scale of the work
            required. However, the beauty of the SDGs lies in their universality
            and adaptability; they are designed to be pursued at all levels,
            from global initiatives to local actions, and they invite
            participation from everyone.
          </p>
          <p>
            In every field of study, in every profession, and in every
            community, there is an opportunity to contribute to these global
            goals. By working together we can overcome the challenges ahead and
            build a more sustainable and equitable world for future generations.
          </p>
        </div>
      </div>

      <div
        className="relative -mt-52 h-screen bg-no-repeat bg-center bg-contain flex justify-center items-center "
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="mt-10">
          <SdgCarousel />
        </div>
      </div>

      {/* How are SDGs related to you */}
      <div className="flex flex-col items-center mx-16">
        <span className="mb-5 text-3xl font-bold">
          How Are SDGs Related To You?
        </span>
        <RelevantSDGAccodian />
      </div>
    </div>
  );
};
