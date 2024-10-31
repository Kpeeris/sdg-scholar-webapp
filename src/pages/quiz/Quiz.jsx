import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu.jsx";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../../firebaseFiles/firebaseConfig.js";
import { useAuthContext } from "@/AuthProvider";
import Question from "../../components/Question.jsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import pana from "/src/assets/images/pana.svg";
import ConfettiExplosion from "react-confetti-explosion";
import { cos, round } from "mathjs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import LoadingPage from "@/components/LoadingPage.jsx";

const Quiz = () => {
  // used to navigate to new page when button is clicked
  const navigate = useNavigate();
  //gets the moduleId from the url
  const { moduleId } = useParams();
  const moduleTitle = `Target 11.${moduleId} Quiz`;
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [isExploding, setIsExploding] = useState(false);

  const [result, setResult] = useState(0);
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const questionRefs = useRef([]);

  const [docs, setDocs] = useState({});
  //eslint-disable-next-line
  const { user, userData, role } = useAuthContext();

  let isAdmin = role === "admin";

  //modify the moduleId from the url to match the format that is is the DB
  console.log("moduleId is", moduleId);
  let realModuleId = moduleId;
  if (moduleId == "a") {
    realModuleId = "8";
  } else if (moduleId == "b") {
    realModuleId = "9";
  } else if (moduleId == "c") {
    realModuleId = "10";
  }

  const handleSubmitClick = () => {
    cosole.log("submitting quiz in handleSubmitClick");
    setQuizSubmitted(true);
    let currResult = 0;
    questionRefs.current.forEach((ref) => {
      if (ref.current) {
        currResult += ref.current.markQuestion();
      }
    });
    setResult(currResult);
    console.log("result is", { result });
    const perCent = round((currResult / totalQuestions) * 100, 1);
    saveScore(perCent);
    setScore(perCent);
    console.log("current score is, ", { perCent });
  };

  //gets the total number of questions in the target
  const getTotalQuestions = async () => {
    try {
      let docRef = doc(db, `quizzes/sdg11t${realModuleId}`);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().totalQuestions);
        setTotalQuestions(docSnap.data().totalQuestions);
        return docSnap.data().totalQuestions;
      } else {
        console.log("nQuestions Document does not exist");
      }
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
    return 0;
  };

  const getQuestions = async () => {
    await getTotalQuestions();
    console.log("in getQuestions");
    try {
      let docRef = collection(db, `quizzes/sdg11t${realModuleId}`, "questions");
      let docSnap = await getDocs(docRef);

      const newDocs = {};
      docSnap.forEach((doc) => {
        newDocs[doc.id] = doc.data();
      });
      setDocs(newDocs);
      return newDocs;
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  //save the score to the database
  const saveScore = async (score) => {
    let email = userData.email;

    const learnersRef = collection(db, "learners");
    const queryByEmail = query(learnersRef, where("email", "==", email));
    const querySnapshot = await getDocs(queryByEmail);

    if (querySnapshot.empty) {
      console.log("No learner was found with that email");
      return null;
    }

    querySnapshot.forEach(async (learner) => {
      const learnerDocId = learner.id;
      console.log("updating learner with id: ", learnerDocId);

      const learnerDocRef = doc(db, "learners", learnerDocId);
      await updateDoc(learnerDocRef, {
        [`scores.sdg11t${realModuleId}`]: score,
      });
    });
  };

  //gets the score form the db and saved in to score
  const getScore = async () => {
    console.log("getting score");
    let email = userData.email;

    const learnersRef = collection(db, "learners");
    const queryByEmail = query(learnersRef, where("email", "==", email));
    const querySnapshot = await getDocs(queryByEmail);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const learnerData = doc.data();

        const scores = learnerData.scores;
        const userScore = scores ? scores[`sdg11t${realModuleId}`] : undefined;

        if (userScore !== undefined) {
          console.log(`score for sdg11t${realModuleId}:`, userScore);
          setScore(userScore);
        } else {
          console.log(`No score found for sdg11t${realModuleId}`);
        }
      });
    } else {
      console.log("No learner was found with that email");
    }
  };

  useEffect(() => {
    const fetchScore = async () => {
      await getScore();
      setIsLoading(false);
      console.log("score is", score);
      console.log("isLoading: ", isLoading);
    };

    if (userData) {
      fetchScore();
    } else {
      console.log("No user data found");
    }

    //getScore().then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    if (quizStarted || isAdmin) {
      getQuestions();
    } else {
      console.log("quiz not started");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizStarted, isAdmin]);

  useEffect(() => {
    if (totalQuestions > 0) {
      questionRefs.current = Array(totalQuestions)
        .fill()
        .map((_, i) => questionRefs.current[i] || React.createRef());
      const nRefs = questionRefs.current.length;
      console.log("there are refs", { nRefs }, "there should be", {
        totalQuestions,
      });
    }
  }, [totalQuestions]);

  useEffect(() => {
    if (totalQuestions > 0 && result == totalQuestions) {
      setIsExploding(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const targetRef = useRef(null);

  const handleOusideClick = (e) => {
    if (
      !isAdmin &&
      targetRef.current &&
      !targetRef.current.contains(e.target)
    ) {
      setDialogVisible(true);
    }
  };

  // Use effect to add/remove event listener for clicks
  useEffect(() => {
    // Attach the click event listener
    document.addEventListener("mousedown", handleOusideClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOusideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <div data-testid="quiz-page" className="flex">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <SideMenu moduleTitle={`Target 11.${moduleId}`} moduleId={moduleId} />
          {isAdmin || (quizStarted && !quizSubmitted) ? (
            <div
              data-testid="questionsPage"
              ref={targetRef}
              className="ml-[250px] h-screen flex-1"
            >
              <div className="flex justify-between">
                <h1>{moduleTitle}</h1>
                {/* <h2 style={{ fontSize: "3rem", lineHeight: "1rem" }}>
                {moduleTitle}
              </h2> */}
                {isAdmin ? (
                  <Button
                    data-testid="editQuizButton"
                    className="w-44 text-lg"
                    onClick={() => navigate(`/module/${moduleId}/editquiz`)}
                  >
                    <PencilSquareIcon className="h-6 w-6 text-white" /> Edit
                    Quiz
                  </Button>
                ) : null}
              </div>
              <br />
              <div>
                {Object.values(docs).map((question, index) => {
                  return (
                    <div
                      data-testid="questionComponent"
                      key={question.id || index}
                    >
                      <Question
                        ref={questionRefs.current[index]}
                        //key={question}
                        q={question}
                        i={index}
                      />
                      <br />
                    </div>
                  );
                })}
              </div>

              {isAdmin ? null : (
                <div className="flex flex-col items-center">
                  <br />
                  <Button
                    data-testid="submitQuizButton"
                    className="w-44 mb-16"
                    onClick={() => {
                      setDialogVisible(true);
                    }}
                  >
                    Submit Quiz
                  </Button>
                </div>
              )}
            </div>
          ) : //if user is not an Admin and the quiz is not submitted and the score is 0
          !quizSubmitted && !isAdmin && score === 0 ? (
            <div
              data-testid="preQuizPage"
              className="ml-[250px] flex-1 flex flex-col items-center justify-start"
            >
              <div className="relative h-72 w-72">
                <img
                  src={pana}
                  alt="Start Quiz"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                style={{
                  height: "50px",
                  width: "800px",
                  paddingLeft: "100px",
                  paddingRight: "100px",
                }}
              >
                <div>
                  <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                    Ready for the Quiz?
                  </h2>
                </div>

                <ul className="space-y-0">
                  <li>
                    Test yourself on the knowledge you learned about this target
                  </li>
                  <li>
                    Your progress will{" "}
                    <span style={{ fontWeight: "bold" }}>not</span> be saved if
                    you exit the quiz before clicking ‘Submit’
                  </li>
                  <li>Each question is required and weighted equally</li>
                  <li>
                    <span style={{ fontWeight: "bold" }}>
                      You must score 100%
                    </span>{" "}
                    to complete the quiz and unlock the building
                  </li>
                  <li>You have unlimited attempts to complete the quiz</li>
                </ul>
              </div>
              <div className="mt-40">
                <Button
                  data-testid="startQuizButton"
                  style={{ textAlign: "center" }}
                  className="w-44"
                  onClick={() => {
                    setQuizStarted(true);
                  }}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          ) : (
            <div data-testid="scorePage" className="ml-[250px] flex-1">
              <h1>{moduleTitle}</h1>
              {/* <h2 style={{ fontWeight: "bold" }}>{moduleTitle}</h2> */}
              <br />
              <div className="flex-1 flex flex-col items-center justify-center">
                <p>You scored</p>
                <br />
                {result === totalQuestions ? (
                  <>{isExploding && <ConfettiExplosion />}</>
                ) : null}
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#FFE4B2",
                    height: "100px",
                    width: "100px",
                  }}
                  className="flex items-center justify-center"
                >
                  <h2 className="text-orange-500">{score}%</h2>
                </div>
                <br />
                <Button
                  className="w-32"
                  onClick={() => {
                    setQuizStarted(true);
                    setQuizSubmitted(false);
                    saveScore(0);
                    setScore(0);
                  }}
                >
                  Take Quiz Again
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {dialogVisible ? (
        <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
          <DialogContent data-testid="confirmSubmitDialog">
            <DialogHeader>
              <DialogTitle>Submit Quiz</DialogTitle>
              <DialogDescription className="text-base">
                Make sure you have answered all of the questions!
                <br />
                This action will submit the quiz do you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end items-center">
              <Button
                variant="outline"
                className="mx-2"
                onClick={() => {
                  setDialogVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                data-testid="confirmSubmitButton"
                className="mx-2"
                onClick={() => {
                  handleSubmitClick();
                  setDialogVisible(false);
                }}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};

export default Quiz;
