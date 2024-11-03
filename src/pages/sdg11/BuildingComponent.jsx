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

/* buildingName: name of the building
 id: the id of the target in the db
 dark_image: path to the "dark" image of the building 
 full_image: paths to the full sized image of the building
 left: the position of the button from the left of the screen 
 top: the position if the button for the top of the screen
 clipPath: the list of x,y coords that make the silhouette of the building */
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
  // API call to get target description and title from the database
  useEffect(() => {
    const getDescription = async (id) => {
      try {
        const docRef = doc(db, `quizzes/sdg11t${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //console.log(docSnap.data().targetText);
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
  const getScore = async (id) => {
    if (!userData) {
      console.log("No user data found");
      return;
    } else if (!userData.email) {
      console.log("No email found in user data");
      return;
    }
    let email = userData.email;
    // console.log("the email is: ", email);
    // console.log("the userData: ", userData);

    //TODO: make the email from the db lowercase before comparing
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
    fetchScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      {/* have to make it so that this image becomes invisible when the learner completes the quiz  */}
      {role !== "admin" && score !== 100 ? (
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

      {/* this div covers the building so that when the mouse hovers over it the button becomes opaque */}
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

      <Dialog>
        <DialogTrigger asChild>
          {/* have to change the text in the button depending on start or restart */}
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

            <DialogDescription className="text-center pb-2">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <img src={full_image} alt={buildingName} />
            <DialogTitle className="flex justify-center pb-5">
              {buildingName}
            </DialogTitle>
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
