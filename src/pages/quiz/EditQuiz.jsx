import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../../../firebaseFiles/firebaseConfig.js";
import Question from "../../components/Question.jsx";
import { Button } from "@/components/ui/button";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export const EditQuiz = () => {
  // used to navigate to new page when button is clicked
  //const navigate = useNavigate();
  //gets the moduleId from the url
  const { moduleId } = useParams();
  const moduleTitle = `Target 11.${moduleId} Quiz`;
  // eslint-disable-next-line no-unused-vars
  const [totalQuestions, setTotalQuestions] = useState("");
  const [docs, setDocs] = useState({});
  const ans = {};

  let realModuleId = moduleId;
  if (moduleId == "a") {
    realModuleId = "8";
  } else if (moduleId == "b") {
    realModuleId = "9";
  } else if (moduleId == "c") {
    realModuleId = "10";
  }

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

  return (
    <div className="flex">
      <div className="flex-1 mx-20">
        <div className="flex justify-between">
          <h2 style={{ fontSize: "3rem", lineHeight: "1rem" }}>
            {moduleTitle}
          </h2>
          <Button style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}>
            <PaperAirplaneIcon className="h-6 w-6 mr-2 text-white" />
            Publish Quiz
          </Button>
        </div>
        <br />
        <div>
          <h4>Instructions</h4>
          <ul style={{ marginTop: "0px" }}>
            <li>
              When editing a quiz, always click{" "}
              <strong>‘Publish Changes’</strong>, or your updates{" "}
              <strong>won’t</strong> be saved.
            </li>
            <li>Each question is mandatory and worth 1 mark </li>
            <li>
              The quiz allows unlimited attempts and requires 100% to pass
            </li>
          </ul>
        </div>
        <br />
        <div>
          {Object.values(docs).map((question, index) => {
            //console.log("question number is: " + question.questionNumber);
            //console.log("value at docs is: " + question.questionText);
            return (
              <div key={question.id || index}>
                {/* <TrashIcon className="h-6 w-6 text-black" /> */}
                <Question q={question} ans={ans} i={index} mode="edit" />
                <br />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center">
          <br />
          {/* {admin ? null : (
            <Button
              className="w-44"
              
            >
              Submit Quiz
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};
