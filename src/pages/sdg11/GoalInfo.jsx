import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LockedBuildingImage from "/src/assets/images/SDG11PopUpLocked.svg";
import UnlockedBuildingImage from "/src/assets/images/SDG11PopUpUnlocked.svg";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

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
          <div className="fixed left-12 top-28 bg-white rounded-xl text-gray-700 p-2 ">
            <div className="flex items-center">
              <InformationCircleIcon
                className="h-7 w-7 mr-1 text-orange-500"
                strokeWidth="2"
              />
              <span className="font-bold">SDG 11</span>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent genieAniation={true} className="max-w-3xl ">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl px-4">
              SDG 11: Sustainable Cities and Communities
            </DialogTitle>
            <DialogDescription className="text-center text-lg mb-4 ">
              Make cities and human settlements inclusive, safe, resilient, and
              sustainable
            </DialogDescription>
          </DialogHeader>

          {/* How to Play Section */}
          <div className="bg-gray-100 rounded-lg p-6 mt-2">
            <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
            <p className="mb-6">
              Explore this virtual city by hovering over buildings to reveal SDG
              11 targets. Ace quizzes to unlock buildings and track your
              progress toward completing SDG 11!
            </p>

            {/* Icons and Explanations */}
            <div className="flex items-center justify-around mt-8">
              <div className="text-center">
                <img
                  src={LockedBuildingImage}
                  alt="Locked"
                  className="w-30 h-30 mx-auto"
                />
                <p className="mt-2 font-medium">Locked</p>
              </div>

              <div className="text-center flex flex-col items-center font-semibold">
                <ArrowLongRightIcon className="h-16 w-40 text-black" />
                <p>Get 100% On The Quiz</p>
              </div>

              <div className="text-center">
                <img
                  src={UnlockedBuildingImage}
                  alt="Unlocked"
                  className="w-30 h-30 mx-auto"
                />
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
