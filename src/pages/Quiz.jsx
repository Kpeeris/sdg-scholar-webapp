import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { useParams } from "react-router-dom";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import db from "../../firebaseFiles/firebaseConfig.js";
import Question from "../components/Question.jsx";
import { Button } from "@/components/ui/button";
import pana from "/src/assets/images/pana.svg";

const Quiz = () => {
  const { moduleId } = useParams();
  const moduleTitle = `Target 11.${moduleId} Quiz`;
  const [totalQuestions, setTotalQuestions] = useState("")
  //const [nQuestions, setNQuestions] = useState(1)

  const [quizStarted, setQuizStarted] = useState(false)

  let realModuleId = moduleId;
  const [docs, setDocs] = useState({});
  const ans = {};

  let admin = false;

  if (moduleId == "a") {
    realModuleId = "8";
  } else if (moduleId == "b") {
    realModuleId = "9";
  } else if (moduleId == "c") {
    realModuleId = "10";
  }

  const getTotalQuestions = async () => {
    try {
      let docRef = doc(db, `quizzes/sdg11t${realModuleId}`);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().totalQuestions);
        setTotalQuestions(docSnap.data().totalQuestions)
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
      let docRef = collection(db, `quizzes/sdg11t${realModuleId}`, 'questions');
      let docSnap = await getDocs(docRef);

      
        const newDocs = {};
        docSnap.forEach((doc) => {
          newDocs[doc.id] = doc.data();
        })
        setDocs(newDocs)
        return newDocs;

    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  {
    /*const checkAnswers = (ans) => {
        
    }*/
  }

  const handleSubmitClick = () => {
    return (
      <div>Total questions: {totalQuestions}</div>
    )
  }

  const handleAddQuestionClick = () => {};

  
  return (
    <div className="flex">
      <SideMenu moduleTitle={`Target 11.${moduleId}`} moduleId={moduleId} />
      {quizStarted ?
        <div className="ml-[250px] flex-1">
          <h2 style={{ fontWeight: "bold" }}>{moduleTitle}</h2>
          <br />
          <div>
            {Object.values(docs).map((question, index) => {
              //console.log("question number is: " + question.questionNumber);
              //console.log("value at docs is: " + question.questionText);
              return (
                <div key={question.id}>
                  <Question
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

          <div className="flex flex-col items-center">
            {admin ? (
              <button onClick={() => handleAddQuestionClick()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            ) : null}
            <br />
            <Button className="w-44" onClick={() => {handleSubmitClick}}>Submit Quiz</Button>
          </div>
        </div>
      :
        <div className="ml-[250px] flex-1 flex flex-col items-center justify-start">
          <div className="relative h-72 w-72">
            <img
              src={pana}
              alt="Start Quiz"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={{ height: "50px", width: "800px", paddingLeft: "100px", paddingRight: "100px" }}>
            <div>
              <h2 style={{ fontWeight: "bold", textAlign: "center"}}>Ready for the Quiz?</h2>
            </div>
            
            <ul className="space-y-0">
              <li>Test yourself on the knowledge you learned about this target</li>
              <li>Your progress will <span style={{fontWeight:"bold"}}>not</span> be saved if you exit the quiz before clicking ‘Submit’</li>
              <li>Each question is required and weighted equally</li>
              <li><span style={{fontWeight:"bold"}}>You must score 100%</span> to complete the quiz and unlock the building</li>
              <li>You have unlimited attempts to complete the quiz</li>
            </ul>
          </div>
          <div className="mt-40">
            <Button style={{ textAlign: "center" }}className="w-44" onClick={() => {setQuizStarted(true)}}>Start Quiz</Button>
          </div>
        </div>
      }
      
    </div>
  );
};
export default Quiz;
