import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  doc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../../firebaseFiles/firebaseConfig.js";

import Question from "../../components/Question.jsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const EditQuiz = () => {
  //gets the moduleId from the url
  const { moduleId } = useParams();
  const moduleTitle = `Target 11.${moduleId} Quiz`;

  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const [isValidQuestion, setIsValidQuestion] = useState(false);
  const [type, setType] = useState("mcq");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [minError, setMinError] = useState("");
  const [questionSaved, setQuestionSaved] = useState(0);
  const [docs, setDocs] = useState({});

  const [deletionReload, setDeletionReload] = useState(0);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  let realModuleId = moduleId;
  if (moduleId == "a") {
    realModuleId = "8";
  } else if (moduleId == "b") {
    realModuleId = "9";
  } else if (moduleId == "c") {
    realModuleId = "10";
  }

  // Function to handle opening the confirmation modal
  const handleDeleteConfirm = (id) => {
    setQuestionToDelete(id); // Set the question to delete
    console.log("handleDeleteConfirm id = ", { id });
    setDeleteConfirmOpen(true); // Open the confirmation dialog
  };

  const handleDelete = async () => {
    if (!questionToDelete) return;
    try {
      const docRef = doc(
        db,
        `quizzes/sdg11t${realModuleId}/questions`,
        questionToDelete
      );
      await deleteDoc(docRef);
      console.log("Question deleted successfully");
      setDeleteConfirmOpen(false); // Close the confirmation dialog
      setDeletionReload(deletionReload + 1);
    } catch (e) {
      console.error("Error deleting question: ", e);
    }
  };
  //gets the questions from the db and saves them in docs
  const getQuestions = async () => {
    try {
      let docRef = collection(db, `quizzes/sdg11t${realModuleId}`, "questions");
      let docSnap = await getDocs(docRef);

      const newQuestions = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newQuestions);
      return newQuestions;
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionSaved, deletionReload]);

  // saves the new question to the database
  const saveNewQuestion = async () => {
    try {
      // Count the total announcement there are to generate the custom id
      const allQuestionsRef = collection(
        db,
        `quizzes/sdg11t${realModuleId}`,
        "questions"
      );
      //remove all white space options from the arrays
      const correctAnswersClean = correctAnswers.filter(
        (answer) => answer.trim() !== ""
      );
      const optionsClean = options.filter((opt) => opt.trim() !== "");
      await addDoc(allQuestionsRef, {
        questionText,
        type,
        correctAnswers: correctAnswersClean,
        options: optionsClean,
      });
    } catch (error) {
      console.error("Could not write to database: ", error);
    } finally {
      // reset all the defult caragories
      setQuestionText("");
      setIsValidQuestion(false);
      setType("mcq");
      setOptions(["", ""]);
      setCorrectAnswers([]);
      setMinError("");
      setQuestionSaved(questionSaved + 1);
    }
  };

  //adds new option text to optionas array
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  //add new slot for an option
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  //deletes the option
  const handleOptionDelete = (index) => {
    if (options.length >= 3) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      setMinError("");
      setCorrectAnswers((prev) =>
        prev.filter((option) => option !== options[index])
      );
    } else {
      setMinError("You must have a minimum of 2 options");
    }

    setTimeout(() => {
      setMinError("");
    }, 5000);
  };

  //if the checkbox is checked add ans to correctAnswers
  const handleCheckboxChange = (index, checked) => {
    const selectedOption = options[index];

    if (checked) {
      setCorrectAnswers((prev) => [...prev, selectedOption]);
    } else {
      setCorrectAnswers((prev) =>
        prev.filter((option) => option !== selectedOption)
      );
    }
  };

  //everytime a fied is updated see if it meets the minimun requirementrs for a question
  useEffect(() => {
    //q a question must have at leat two non empty options, one answer and questionText
    let moreThanTwo =
      options.filter((option) => option.trim() !== "").length >= 2;
    let validAns =
      correctAnswers.filter((answer) => answer.trim() !== "").length >= 1;
    if (questionText !== "" && validAns && moreThanTwo) {
      setIsValidQuestion(true);
    } else {
      setIsValidQuestion(false);
    }
  }, [questionText, type, options, correctAnswers]);

  return (
    <div className="flex">
      <div className="flex-1 mx-20">
        <div className="flex justify-between">
          <h2 style={{ fontSize: "3rem", lineHeight: "1rem" }}>
            {moduleTitle}
          </h2>

          <Button
            style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
            onClick={() => navigate(`/module/${moduleId}/quiz`)}
          >
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

        {/* Modal to build a new question */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="white" className="text-lg mb-6">
              <PlusIcon className="h-6 w-6 mr-2 text-black" strokeWidth="2" />
              Add New Question
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:max-w-[1000px] px-20">
            <DialogTitle className="flex justify-center text-4xl">
              New Question
            </DialogTitle>

            {/* Add Question text */}
            <div className="flex justify-start ">
              <div className="mb-4 mr-8 w-4/6">
                <label htmlFor="questionText" className="text-xl">
                  <strong>Question</strong>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Write your question here..."
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
                {questionText === "" && (
                  <span style={{ color: "red" }}>please add a question</span>
                )}
              </div>

              {/* Choose Question type */}
              <div>
                <label htmlFor="questionType" className="text-xl">
                  <strong>Question Type</strong>
                </label>
                <Select id="questionType">
                  <SelectTrigger className="w-auto mt-1">
                    <SelectValue placeholder="Select a Question Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="mselect">
                        Multiple Select Question
                      </SelectItem>
                      <SelectItem value="mcq">
                        Multiple Choice Question
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add Options */}
            <div className="flex justify-around">
              <div>
                <h4>
                  <strong>Answer Choices</strong>
                </h4>
                <h6>
                  Select the correct answers below by checking the box next to
                  each option
                </h6>
              </div>
              {/* create a new option */}
              <Button varient="white" onClick={handleAddOption}>
                Add Option
              </Button>
            </div>

            {options.map((option, index) => (
              <div key={index} className="flex items-center justify-center">
                {/* Correct Answer Checkbox */}
                <Checkbox
                  className="h-8 w-8 mx-2"
                  style={{ borderRadius: "50%" }}
                  checked={correctAnswers.includes(option) && option !== ""}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(index, checked)
                  }
                />

                {/* Input text field */}
                <div style={{ width: "100%" }}>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    id={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>

                {/* Button to delete option */}
                <Button
                  className="bg-transparent hover:bg-transparent text-xs py-1 px-2"
                  onClick={() => handleOptionDelete(index)}
                >
                  <TrashIcon className="h-6 w-6 text-gray-700 hover:text-red-500" />
                </Button>
              </div>
            ))}

            {/* Error message if user trues to delete when only 2 options left */}
            {minError && (
              <Alert variant="destructive">
                <ExclamationCircleIcon className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{minError}</AlertDescription>
              </Alert>
            )}

            {/* Save the quiestion to database when you click save */}

            <div className="flex justify-center">
              <DialogClose asChild>
                <Button
                  disabled={isValidQuestion === false}
                  onClick={saveNewQuestion}
                  className="w-2/3 mt-4"
                >
                  Save
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <div>
          {Object.values(docs).map((question, index) => {
            return (
              <div key={question.id || index}>
                <Question
                  q={question}
                  i={index}
                  mode="edit"
                  onDelete={() => handleDeleteConfirm(question.id)}
                />
                <br />
              </div>
            );
          })}
        </div>

        {/* Modal for confirming deletion */}
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Question</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this question?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirmOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleDelete}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
