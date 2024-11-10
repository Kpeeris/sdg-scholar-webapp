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
import db from "../../../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useAuthContext } from "@/AuthProvider";

/**
 *  BuildingComponent is a component that represents a building on the map.
 * It is a button that when clicked opens a dialog box with the target number and description of the target.
 * The dialog box also contains a button that when clicked navigates to the content page of the target.
 * @param {string} buildingName - name of the building
 * @param {string} id - the id of the target in the db
 * @param {string} dark_image - path to the "dark" image of the building
 * @param {string} full_image - paths to the full sized image of the building
 * @param {string} left - the position of the button from the left of the screen
 * @param {string} top - the position if the button for the top of the screen
 * @param {string} clipPath - the list of x,y coords that make the silhouette of the building
 */
const BuildingComponent = ({
  id,
  buildingName,
  dark_image,
  full_image,
  left,
  top,
  clipPath,
}) => {
  const navigate = useNavigate();
  //eslint-disable-next-line
  const { user, userData, role } = useAuthContext();
  const [description, setDescription] = useState("");
  const [targetNum, setTargetNum] = useState("");
  const [score, setScore] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  /**
   * Gets the description of the target from the db
   * @param {string} id - the id of the target in the db
   */
  useEffect(() => {
    const getDescription = async (id) => {
      try {
        const docRef = doc(db, `quizzes/sdg11t${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDescription(docSnap.data().targetText);
          setTargetNum(docSnap.data().targetNumber);
          console.log("Document text:", docSnap.data().targetText);
          console.log("Document num:", docSnap.data().targetNumber);
        } else {
          console.log("Document does not exist");
        }
      } catch (e) {
        console.error("Error retreiving document: ", e);
      }
    };
    getDescription(id);
  });

  const lastLetter = targetNum.slice(-1);
  /**
   * Gets the lerner's score for the specific building from the db
   * @param {string} id - the id of the target in the db
   */
  const getScore = async (id) => {
    if (!userData) {
      console.log("No user data found");
      return;
    } else if (!userData.email) {
      console.log("No email found in user data");
      return;
    }
    let email = userData.email;
    const learnersRef = collection(db, "learners");
    const queryByEmail = query(learnersRef, where("email", "==", email));
    const querySnapshot = await getDocs(queryByEmail);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const learnerData = doc.data();

        const scores = learnerData.scores;
        const userScore = scores ? scores[`sdg11t${id}`] : undefined;

        if (userScore !== undefined) {
          console.log(`score for sdg11t${id}:`, userScore);
          setScore(userScore);
        } else {
          console.log(`No score found for sdg11t${id}`);
        }
      });
    } else {
      console.log("No learner was found with that email");
    }
  };

  useEffect(() => {
    const fetchScore = async () => {
      await getScore(id);
    };
    if (role !== "admin") {
      fetchScore();
    }
    console.log("score: ", score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      {/* Dark Buildign image */}
      {role !== "admin" && score !== 100 ? (
        // only render the dark image if the learner has not completed the target
        <div
          data-testid={`dark-${buildingName}`}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <img
            src={dark_image}
            alt={buildingName}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      ) : null}

      {/* this div covers the building image so that when the mouse hovers 
      over it the button becomes opaque */}
      <div
        className="absolute w-full h-full"
        style={{
          left: 0,
          top: 0,
          clipPath: clipPath,
        }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      ></div>

      {/* pop-up with description about the target */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            data-testid={`open-${buildingName}`}
            variant="success"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: left,
              top: top,
            }}
          >
            Open
          </Button>
        </DialogTrigger>
        <DialogContent data-testid={`${buildingName}-dialog`}>
          <DialogHeader>
            <DialogTitle className="flex justify-center text-4xl pb-2">
              Target {targetNum}
            </DialogTitle>
            {/* Description */}
            <DialogDescription className="text-center pb-2">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img src={full_image} alt={buildingName} />
            <DialogTitle className="flex justify-center pb-5">
              {buildingName}
            </DialogTitle>

            {/* Link to content page */}
            <Button
              data-testid={`${buildingName}-navigate`}
              variant="success"
              onClick={() => navigate(`/module/${lastLetter}/content`)}
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
