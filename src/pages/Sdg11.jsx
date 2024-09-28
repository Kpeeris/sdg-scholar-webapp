import FULL_CITY from "/src/assets/images/City_scape.png";
import BuildingComponent from "./sdg11/BuildingComponent";
import ListOfBuildings from "./sdg11/ListOfBuildings";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Sdg11 = () => {
  return (
    <div className="pt-16">
      <div className="relative min-h-screen min-w-screen">
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
          <img src={FULL_CITY} alt="full city" className="w-full h-auto" />
        </div>

        {ListOfBuildings.map((building) => (
          <BuildingComponent
            id={building.id}
            buildingName={building.buildingName}
            dark_image={building.dark_image}
            full_image={building.full_image}
            left={building.left}
            top={building.top}
          />
        ))}

        {/* information icon */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="fixed left-8 top-20">
              <InformationCircleIcon class="h-10 w-10 text-gray-300" />
              {/* <img src={info} alt="info icon" /> */}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sustainable Develppment Goal 11</DialogTitle>
              <DialogDescription>
                Make cities and human settlements inclusive, safe, resilient and
                sustainable
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* <StackedImages /> */}
    </div>
  );
};
export default Sdg11;
