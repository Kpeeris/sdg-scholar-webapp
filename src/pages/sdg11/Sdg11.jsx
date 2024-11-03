import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase/firebaseConfig.js";
import { useAuthContext } from "@/AuthProvider";

import FULL_CITY from "/src/assets/images/City_scape.png";
import BuildingComponent from "./BuildingComponent";
import ListOfBuildings from "./ListOfBuildings";
import GoalInfo from "./GoalInfo";
import FullScreenDiv from "./FullScreenDiv";

export const Sdg11 = () => {
  const { user, role } = useAuthContext();
  const [isFirstView, setIsFirstView] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkFirstView = async () => {
      // Skip if already checked in this session
      // if (!user?.uid || hasChecked || role != "learner") return;
      if (!user?.uid || hasChecked || role !== "learner") {
        console.log("Skipping database check.");
        return;
      }

      const learnerDocRef = doc(db, "learners", user.uid);
      const learnerDoc = await getDoc(learnerDocRef);

      if (learnerDoc.exists() && learnerDoc.data().sdg11FirstView === false) {
        setIsFirstView(true);
        console.log(
          "First view detected. Showing GoalInfo and updating Firestore."
        );

        // Update Firestore to set sdg11FirstView to true
        await updateDoc(learnerDocRef, { sdg11FirstView: true });
      } else {
        console.log("Already marked as viewed.");
      }

      // Mark as checked to avoid more reads in this session
      setHasChecked(true);
      console.log("Session check completed, setting hasChecked to true.");
    };

    checkFirstView();
  }, [user, hasChecked, role]);

  return (
    <FullScreenDiv>
      <img
        src={FULL_CITY}
        alt="full city"
        className="w-full h-full object-cover"
      />

      {ListOfBuildings.map((building) => (
        <BuildingComponent
          key={building.id}
          id={building.id}
          buildingName={building.buildingName}
          dark_image={building.dark_image}
          full_image={building.full_image}
          left={building.left}
          top={building.top}
          clipPath={building.clipPath}
        />
      ))}

      <GoalInfo isOpen={isFirstView} />
    </FullScreenDiv>
  );
};
export default Sdg11;
