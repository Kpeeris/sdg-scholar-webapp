import { Link, useNavigate } from "react-router-dom";
import City from "/src/assets/images/City_scape.png";
import goal_11 from "/src/assets/goals/Goal_11.svg";
import ListOfGoals from "@/components/ListOfGoals";
import { useAuthContext } from "@/AuthProvider";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "../../firebase/firebaseConfig.js";

export const Home = () => {
  const { user, userData, role } = useAuthContext();

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Redirect to the specified path
    }
  };

  // Fetch learner's sdg 11 scores and count completed targets
  const [goalsWithScores, setGoalsWithScores] = useState(ListOfGoals);
  const fetchLearnerScores = async (uid) => {
    try {
      const learnerDocRef = doc(collection(db, "learners"), uid);
      const learnerDoc = await getDoc(learnerDocRef);

      if (learnerDoc.exists()) {
        const learnerData = learnerDoc.data();
        const scores = learnerData.scores;

        // Map through ListOfGoals and add count for completed sdg 11 targets
        const updatedGoals = ListOfGoals.map((goal) => {
          if (goal.id === 11) {
            const completedTargets = Object.keys(scores || {}).reduce(
              (count, key) => {
                if (key.startsWith("sdg11t") && scores[key] === 100) {
                  return count + 1;
                }
                return count;
              },
              0
            );

            return { ...goal, score: `${completedTargets}/10` };
          }
          return goal;
        });
        setGoalsWithScores(updatedGoals);
      } else {
        console.log("No learner data found for this UID.");
      }
    } catch (error) {
      console.error("Error fetching learner score.", error);
    }
  };

  useEffect(() => {
    if (user?.uid && role === "learner") {
      fetchLearnerScores(user.uid);
    }
  }, [user, role]);

  return (
    <div data-testid="home-page">
      {/* Renders Hi message based on if their first name or last name exists */}
      <h1 className="pt-4 pb-12">
        {userData?.firstName
          ? userData.lastName
            ? `Hi ${userData.firstName} ${userData.lastName}!`
            : `Hi ${userData.firstName}!`
          : "Hi!"}
      </h1>

      <div className="bg-orange-200 -mx-12 h-96 flex items-center justify-around">
        <div className="flex flex-col justify-around">
          <h1>
            Discover SDG 11: Sustainable
            <br /> Cities and Communities
          </h1>

          <h4 className="text-2xl font-normal mt-6">
            Learn how to make cities and human settlements <br />
            inclusive, safe, resilient and sustainable
          </h4>
          <Link to="/sdg11">
            <Button
              variant="white"
              className="w-2/6 border-white mt-6 font-semibold text-lg"
            >
              Explore SDG 11 <ArrowRightIcon className="h-6 w-6 mx-4 y" />
            </Button>
          </Link>

          {/* <p className="text-9xl text-white opacity-100 p-4 border-b-4 ml-10">
            Play Now!
          </p>
          <img src={Right_arrow} alt="right arrow" className="w-30 h-30" /> */}
        </div>

        <Link to="/sdg11">
          <div className="relative rounded-xl w-80 h-80 overflow-hidden">
            <img
              src={City}
              alt="SDG11 City"
              className="absolute w-full h-full object-cover object-[left]"
            />
            <img
              src={goal_11}
              alt="goal 11"
              className="absolute w-28 h-28 bottom-2 right-2"
            />
          </div>
        </Link>
      </div>

      <h2 className="leading-[1.3] mt-16 mb-8 text-center text-4xl font-bold">
        Your SDGs
      </h2>

      {/* grid of modules */}
      <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {goalsWithScores.map((goal) => (
          <div
            key={goal.id}
            className={`relative aspect-square rounded-xl `}
            onClick={() => handleNavigation(goal.path)}
            style={
              goal.background
                ? {
                    backgroundImage: `url(${goal.background})`,
                    backgroundSize: "cover",
                  }
                : { backgroundColor: "#e2e8f0" }
            }
          >
            {/* score and star Icon for sdg 11 */}
            {goal.score && (
              <div className="absolute top-2.5 left-2 flex items-center bg-white rounded-full px-2 py-1 text-base font-semibold">
                <span>{goal.score}</span>
                <StarIcon className="h-5 w-5 ml-1 text-primary" />
              </div>
            )}

            <img
              src={goal.image}
              alt={goal.title}
              className="w-28 h-28 absolute bottom-2 right-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
