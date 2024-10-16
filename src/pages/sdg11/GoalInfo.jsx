import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
const GoalInfo = () => {
  return (
    <div>
      {/* information icon */}
      <Dialog>
        <DialogTrigger asChild className="dorp-shadow-xl">
          <div className="fixed left-12 top-28 bg-white rounded-xl p-1">
            <InformationCircleIcon
              className="h-10 w-10 text-orange-500"
              strokeWidth="2"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl px-4">
              SDG 11: Sustainable Cities and Communities
            </DialogTitle>
            <DialogDescription className="text-center text-lg ">
              Make cities and human settlements inclusive, safe, resilient and
              sustainable
            </DialogDescription>
            <Separator className="my-4" />
            <DialogDescription className="text-orange-500 text-center text-xl px-20">
              Explore the city and complete the modules to unlock all the
              buildings
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalInfo;
