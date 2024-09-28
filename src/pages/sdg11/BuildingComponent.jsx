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
import { useState, useEffect } from "react";
import db from "../../../firebaseFiles/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/* buildingName: name of the building
 target: the target that the building corresponds to 
 image: path to the "dark" image of the building 
 left: the position of the button from the left of the screen 
 top: the position if the button for the top of the screen*/
const BuildingComponent = ({
  id,
  buildingName,
  target,
  dark_image,
  full_image,
  left,
  top,
}) => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [targetNum, setTargetNum] = useState("");

  useEffect(() => {
    const getDescription = async (id) => {
      try {
        const docRef = doc(db, `quizzes/sdg11t${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data().targetText);
          setDescription(docSnap.data().targetText);
          setTargetNum(docSnap.data().targetNumber);
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error("Error retreiving document: ", e);
      }
    };
    getDescription(id);
  });

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* have to make it so that this image becomes invisible when the learned completes the quiz  */}
        <img
          src={dark_image}
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
            Open
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center text-4xl">
              Target {targetNum}
            </DialogTitle>

            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img src={full_image} alt={buildingName} />
            <DialogTitle className="flex justify-center">
              {buildingName}
            </DialogTitle>
            <Button
              variant="success"
              onClick={() => navigate(`/module/${target}/content`)}
              style={{}}
            >
              Open
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuildingComponent;
