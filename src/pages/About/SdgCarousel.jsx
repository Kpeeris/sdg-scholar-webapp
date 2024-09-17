import * as React from "react";

const images = import.meta.glob("/src/assets/goals/*.svg", { eager: true });
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SdgCarousel = () => {
  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent className="-ml-1">
        {listOfGoals.map((goal) => (
          <CarouselItem key={goal.id} className="p-2 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <a
                    href={goal.path}
                    target="_blank"
                    rel="nooopener noreferrer"
                  >
                    <img
                      src={goal.image}
                      alt={goal.title}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="w-12 h-12" />
      <CarouselNext className="w-12 h-12" />
    </Carousel>
  );
};

const listOfGoals = [
  {
    id: 1,
    title: "1 No Poverty",
    path: "https://sdgs.un.org/goals/goal1",
    image: images["/src/assets/goals/Goal_1.svg"].default,
  },
  {
    id: 2,
    title: "2 Zero Hunger",
    path: "https://sdgs.un.org/goals/goal2",
    image: images["/src/assets/goals/Goal_2.svg"].default,
  },
  {
    id: 3,
    title: "3 Good Health and Well-being",
    path: "https://sdgs.un.org/goals/goal3",
    image: images["/src/assets/goals/Goal_3.svg"].default,
  },
  {
    id: 4,
    title: "4 Quality Education",
    path: "https://sdgs.un.org/goals/goal4",
    image: images["/src/assets/goals/Goal_4.svg"].default,
  },
  {
    id: 5,
    title: "5 Gender Equality",
    path: "https://sdgs.un.org/goals/goal5",
    image: images["/src/assets/goals/Goal_5.svg"].default,
  },
  {
    id: 6,
    title: "6 Clean Water and ",
    path: "https://sdgs.un.org/goals/goal6",
    image: images["/src/assets/goals/Goal_6.svg"].default,
  },
  {
    id: 7,
    title: "7 Affordable and Clean Energy",
    path: "https://sdgs.un.org/goals/goal7",
    image: images["/src/assets/goals/Goal_7.svg"].default,
  },
  {
    id: 8,
    title: "8 Decent Work and Economic Growth",
    path: "https://sdgs.un.org/goals/goal8",
    image: images["/src/assets/goals/Goal_8.svg"].default,
  },
  {
    id: 9,
    title: "9 Industry, Innovation and Infrastructure",
    path: "https://sdgs.un.org/goals/goal9",
    image: images["/src/assets/goals/Goal_9.svg"].default,
  },
  {
    id: 10,
    title: "10 Reduce Inequalities",
    path: "https://sdgs.un.org/goals/goal10",
    image: images["/src/assets/goals/Goal_10.svg"].default,
  },
  {
    id: 11,
    title: "11 Sustainable Cities and Communities",
    path: "https://sdgs.un.org/goals/goal11",
    image: images["/src/assets/goals/Goal_11.svg"].default,
  },
  {
    id: 12,
    title: "12 Responsible Consumption and Production",
    path: "https://sdgs.un.org/goals/goal12",
    image: images["/src/assets/goals/Goal_12.svg"].default,
  },
  {
    id: 13,
    title: "13 Climate Action",
    path: "https://sdgs.un.org/goals/goal13",
    image: images["/src/assets/goals/Goal_13.svg"].default,
  },
  {
    id: 14,
    title: "14 Life Below Water",
    path: "https://sdgs.un.org/goals/goal14",
    image: images["/src/assets/goals/Goal_14.svg"].default,
  },
  {
    id: 15,
    title: "15 Life on Land",
    path: "https://sdgs.un.org/goals/goal15",
    image: images["/src/assets/goals/Goal_15.svg"].default,
  },
  {
    id: 16,
    title: "16 Peace, Justice and Strong Institutions",
    path: "https://sdgs.un.org/goals/goal16",
    image: images["/src/assets/goals/Goal_16.svg"].default,
  },
  {
    id: 17,
    title: "17 Partnerships for the Goals",
    path: "https://sdgs.un.org/goals/goal17",
    image: images["/src/assets/goals/Goal_17.svg"].default,
  },
];

export default SdgCarousel;
