import SdgCarousel from "/src/pages/About/SdgCarousel";

import holding_sdg_wheel from "/src/assets/images/holding_sdg_wheel.svg";
import logo_horizontal from "/src/assets/icons/logo_horizontal.svg";
import SDG_logo_Square_Transparent from "/src/assets/images/SDG_logo_Square_Transparent.svg";
import background from "/src/assets/images/plants-background.svg";
import RelaventSDGAccodian from "./RelaventSDGAccordian";
export const About = () => {
  return (
    <div data-testid="about-page">
      {/* About SDG Scholar */}
      <div className="flex flex-col md:flex-row">
        {/* LHS */}
        <div className="flex flex-col justify-between md:w-1/2 p-10">
          <div>
            <span className="text-7xl font-extrabold">About</span>
            <img src={logo_horizontal} alt="SDG logo" />
            <div> Redefining SDG Education, One Goal at a Time </div>
          </div>

          <div className="mt-14">
            <p>
              Our platform is designed to bring together educators and learners
              to deepen understanding and drive action toward the United Nations
              Sustainable Development Goals (SDGs). We aim to redefine SDG
              education by addressing and correcting misconceptions about the
              SDGs through interactive learning. Whether you&apos;re an admin
              guiding others or a learner on your learning journey, we provide
              the resources and tools to help you make a positive impact.
            </p>
          </div>
        </div>

        {/* RHS */}
        <div className="md:w-1/2 flex justify-center items-center p-10">
          <img
            src={holding_sdg_wheel}
            alt="SDG wheel"
            className="w-auto h-auto"
          />
        </div>
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
          How are SDGs related to You?
        </span>
        <RelaventSDGAccodian />
      </div>
    </div>
  );
};
