import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebase/firebaseConfig.js";
import { useAuthContext } from "@/AuthProvider";

import FULL_CITY from "/src/assets/images/City_scape.png";
import BuildingComponent from "./components/BuildingComponent";
import ListOfBuildings from "./components/ListOfBuildings";
import GoalInfo from "./components/GoalInfo";
import FullScreenDiv from "./components/FullScreenDiv";

/**
 * SDG11 page component
 * This is the main page for SDG11 it displays the complete city as the background
 * It has interactive buildings that users can click on.
 */
export const Sdg11 = () => {
  const { user, role } = useAuthContext();
  const [isFirstView, setIsFirstView] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  /**
   * Check if it is the learners first time entering the page
   */
  useEffect(() => {
    const checkFirstView = async () => {
      // Skip if already checked in this session or user is not a learner
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
      {/* Background */}
      <img
        src={FULL_CITY}
        alt="full city"
        className="w-full h-full object-cover"
      />

      {/* Buildings */}
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

      {/* Info button */}
      <GoalInfo isOpen={isFirstView} />
    </FullScreenDiv>
  );
};
export default Sdg11;
