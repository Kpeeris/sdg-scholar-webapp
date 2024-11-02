import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LockedBuildingImage from "/src/assets/images/SDG11PopUpLocked.svg";
import UnlockedBuildingImage from "/src/assets/images/SDG11PopUpUnlocked.svg";

import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

const GoalInfo = ({ isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  // Update `open` state whenever `isOpen` prop changes
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      {/* Information icon */}
      <Dialog open={open} onOpenChange={setOpen} data-testid="infoButton">
        <DialogTrigger asChild className="drop-shadow-xl">
          <div className="fixed left-12 top-28 bg-white rounded-xl p-2 text-orange-500 font-bold">
            SDG 11
          </div>
        </DialogTrigger>

        {/* TO DO: FIX INFO POP UP UI */}
        <DialogContent genieAniation={true} className="max-w-3xl ">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl px-4">
              {/* <InformationCircleIcon
              className="h-10 w-10 text-orange-500"
              strokeWidth="2"
            /> */}
              SDG 11: Sustainable Cities and Communities
            </DialogTitle>
            <DialogDescription className="text-center text-lg mb-4 ">
              Make cities and human settlements inclusive, safe, resilient, and
              sustainable
            </DialogDescription>

            {/* <DialogDescription className="text-orange-500 text-center text-xl px-20">
              Explore the city and complete the modules to unlock all the
              buildings
            </DialogDescription> */}
          </DialogHeader>

           {/* How to Play Section */}
           <div className="bg-gray-100 rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
              <p className="mb-6">
                Explore this virtual city by hovering over buildings to reveal SDG 11 targets. Ace quizzes to unlock buildings and track your progress toward completing SDG 11!
              </p>

              {/* Icons and Explanations */}
              <div className="flex items-center justify-around mt-8">
                <div className="text-center">
                  <img src={LockedBuildingImage} alt="Locked" className="w-20 h-20 mx-auto" />
                  <p className="mt-2 font-medium">Locked</p>
                </div>
                <div className="text-center font-semibold">
                  <p>User Scores</p>
                  <p>100% on Target Quiz</p>
                </div>
                <div className="text-center">
                  <img src={UnlockedBuildingImage} alt="Unlocked" className="w-20 h-20 mx-auto" />
                  <p className="mt-2 font-medium">Unlocked</p>
                </div>
              </div>
            </div>


        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalInfo;

// Old code without first login thing
// const GoalInfo = ( ) => {
//   return (
//     <div>
//       {/* information icon */}
//       <Dialog data-testid="infoButton">
//         <DialogTrigger asChild className="dorp-shadow-xl">
//           <div className="fixed left-12 top-28 bg-white rounded-xl p-2 text-orange-500 font-bold">
//             {/* <InformationCircleIcon
//               className="h-10 w-10 text-orange-500"
//               strokeWidth="2"
//             /> */}
//             SDG 11
//           </div>
//         </DialogTrigger>

//         <DialogContent genieAniation={true}>
//           <DialogHeader>
//             <DialogTitle className="text-center text-3xl px-4">
//               SDG 11: Sustainable Cities and Communities
//             </DialogTitle>
//             <DialogDescription className="text-center text-lg ">
//               Make cities and human settlements inclusive, safe, resilient and
//               sustainable
//             </DialogDescription>
//             <Separator className="my-4" />
//             <DialogDescription className="text-orange-500 text-center text-xl px-20">
//               Explore the city and complete the modules to unlock all the
//               buildings
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default GoalInfo;

