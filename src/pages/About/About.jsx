import React from "react";
import SdgCarousel from "/src/pages/About/SdgCarousel";

import holding_sdg_wheel from "/src/assets/images/holding_sdg_wheel.svg";
import logo_horizontal from "/src/assets/icons/logo_horizontal.svg";
import SDG_logo_Square_Transparent from "/src/assets/images/SDG_logo_Square_Transparent.svg";
import background from "/src/assets/images/plants-background.svg";

export const About = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        {/* LHS */}
        <div className="flex flex-col justify-between md:w-1/2 p-10">
          <div>
            <h1>About</h1>
            <img src={logo_horizontal} alt="SDG logo" />
            <div> Redefining SDG Education, One Goal at a Time </div>
          </div>

          <div className="mt-20">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis ab sunt aliquam suscipit dolor inventore laborum
              doloribus, aliquid consequuntur laudantium nam ipsa voluptates
              porro ad est incidunt impedit esse corrupti, necessitatibus
              accusantium. Qui quam sed beatae dignissimos enim officiis nam,
              voluptates molestias esse cumque magni similique nobis a magnam
              perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime
              velit consequatur, veritatis similique voluptates, dolorem alias
              impedit ducimus commodi error! Voluptatem fuga adipisci at,
              nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae?
              Cumque neque ullam hic, vitae iure nulla similique unde eaque cum
              omnis? Rerum perferendis culpa tempore, saepe officia mollitia
              sed!
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

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-between md:w-1/2 p-10 border-r border-gray-300 px-4">
          <img
            src={SDG_logo_Square_Transparent}
            alt="Sustainable Development Goals"
            className="w-auto h-auto p-4"
          />
        </div>

        <div className="md:w-1/2 flex justify-center items-center p-10">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid
            consequuntur laudantium nam ipsa voluptates porro ad est incidunt
            impedit esse corrupti, necessitatibus accusantium. Qui quam sed
            beatae dignissimos enim officiis nam, voluptates molestias esse
            cumque magni similique nobis a magnam perferendis perspiciatis?
            Eligendi corrupti quod laboriosam maxime velit consequatur,
            veritatis similique voluptates, dolorem alias impedit ducimus
            commodi error! Voluptatem fuga adipisci at, nostrum quo rem,
            quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam
            hic, vitae iure nulla similique unde eaque cum omnis? Rerum
            perferendis culpa tempore, saepe officia mollitia sed!
          </p>
        </div>
      </div>

      <div
        className="relative -mt-52 h-screen bg-no-repeat bg-center bg-contain flex justify-center items-center "
        style={{
          backgroundImage: `url(${background})`,
          // zIndex: -1,
          // pointerEvents: "auto",
        }}
      >
        <div className="mt-10">
          <SdgCarousel />
        </div>
      </div>
    </div>
  );
};
