import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ListOfGoals from "@/components/ListOfGoals";

const SdgCarousel = () => {
  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent className="-ml-1">
        {ListOfGoals.map((goal) => (
          <CarouselItem key={goal.id} className="p-2 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <a
                    href={goal.link}
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

export default SdgCarousel;
