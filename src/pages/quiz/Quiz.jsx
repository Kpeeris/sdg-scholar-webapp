import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu.jsx";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../../../firebaseFiles/firebaseConfig.js";
import Question from "../../components/Question.jsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import pana from "/src/assets/images/pana.svg";
import ConfettiExplosion from "react-confetti-explosion";
import { round } from "mathjs";

const Quiz = () => {
  // used to navigate to new page when button is clicked
  const navigate = useNavigate();
  //gets the moduleId from the url
  const { moduleId } = useParams();
  const moduleTitle = `Target 11.${moduleId} Quiz`;
  const [totalQuestions, setTotalQuestions] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [isExploding, setIsExploding] = useState(false);

  const [result, setResult] = useState(0);

  const questionRefs = useRef([]);

  const [docs, setDocs] = useState({});
  const ans = {};

  let admin = true;

  //modify the moduleId from the url to match the format that is is the DB
  let realModuleId = moduleId;
  if (moduleId == "a") {
    realModuleId = "8";
  } else if (moduleId == "b") {
    realModuleId = "9";
  } else if (moduleId == "c") {
    realModuleId = "10";
  }

  const handleSubmitClick = () => {
    setQuizSubmitted(true);
    let currResult = 0;
    questionRefs.current.forEach((ref) => {
      if (ref.current) {
        currResult += ref.current.markQuestion();
      }
    });
    setResult(currResult);
    console.log("current result is, ", { currResult });
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

  useEffect(() => {
    getQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="flex">
      <SideMenu moduleTitle={`Target 11.${moduleId}`} moduleId={moduleId} />

      {(quizStarted && !quizSubmitted) || admin ? (
        <div className="ml-[250px] flex-1">
          <div className="flex justify-between">
            <h2 style={{ fontSize: "3rem", lineHeight: "1rem" }}>
              {moduleTitle}
            </h2>
            {admin ? (
              <Button
                className="w-44 text-lg"
                onClick={() => navigate(`/module/${moduleId}/editquiz`)}
              >
                Edit Quiz
              </Button>
            ) : null}
          </div>
          <br />
          <div>
            {Object.values(docs).map((question, index) => {
              return (
                <div key={question.id}>
                  <Question
                    ref={questionRefs.current[index]}
                    key={question.id}
                    q={question}
                    ans={ans}
                    i={index}
                  />
                  <br />
                </div>
              );
            })}
          </div>

          {admin ? null : (
            <div className="flex flex-col items-center">
              <br />
              <Button
                className="w-44"
                onClick={() => {
                  setDialogVisible(true);
                }}
              >
                Submit Quiz
              </Button>
            </div>
          )}
        </div>
      ) : !quizSubmitted && !admin ? (
        <div className="ml-[250px] flex-1 flex flex-col items-center justify-start">
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
                <span style={{ fontWeight: "bold" }}>not</span> be saved if you
                exit the quiz before clicking ‘Submit’
              </li>
              <li>Each question is required and weighted equally</li>
              <li>
                <span style={{ fontWeight: "bold" }}>You must score 100%</span>{" "}
                to complete the quiz and unlock the building
              </li>
              <li>You have unlimited attempts to complete the quiz</li>
            </ul>
          </div>
          <div className="mt-40">
            <Button
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
        <div className="ml-[250px] flex-1">
          <h2 style={{ fontWeight: "bold" }}>{moduleTitle}</h2>
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
              <h2 className="text-orange-500">
                {round((result / totalQuestions) * 100, 1)}%
              </h2>
            </div>
            <br />
            <Button
              className="w-32"
              onClick={() => {
                setQuizStarted(true);
                setQuizSubmitted(false);
              }}
            >
              Take Quiz Again
            </Button>
          </div>
        </div>
      )}

      {dialogVisible ? (
        <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
          <DialogTitle>
            <DialogContent>
              <DialogHeader>
                <DialogDescription className="text-center text-lg ">
                  Are you sure you&apos;re ready to submit the quiz? <br />
                  Make sure you have answered all questions!
                </DialogDescription>
                <Separator className="my-4" />
                <div className="flex-col flex items-center justify-center pt-3">
                  <Button
                    className="w-32"
                    onClick={() => {
                      handleSubmitClick();
                      setDialogVisible(false);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </DialogTitle>
        </Dialog>
      ) : null}
    </div>
  );
};

export default Quiz;
