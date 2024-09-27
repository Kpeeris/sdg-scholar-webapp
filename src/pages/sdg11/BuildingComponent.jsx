import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* buildingName: name of the building
 target: the target that the building corresponds to 
 image: path to the "dark" image of the building 
 left: the position of the button from the left of the screen 
 top: the position if the button for the top of the screen*/
const BuildingComponent = ({ buildingName, target, image, left, top }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* have to make it so that this image becomes invisible when the learned completes the quiz  */}
        <img
          src={image}
          alt={buildingName}
          className="w-full h-auto pointer-events-none"
        />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          {/* have to change the text in the button depending on start or restart */}
          <Button
            variant="success"
            className="absolute"
            style={{ left: left, top: top }}
          >
            Starts
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center text-4xl">
              {buildingName}
            </DialogTitle>
            <DialogTitle className="flex justify-center">
              Target 11.{target}
            </DialogTitle>

            {/* have to pull the description of the target from the db */}
            <DialogDescription>
              description of target goes here
            </DialogDescription>
          </DialogHeader>

          {/* have to add a image of the building inside the modal */}
          <div>
            <img src="" alt="" />
            <Button onClick={() => navigate(`/module/${target}/content`)}>
              Start
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuildingComponent;
