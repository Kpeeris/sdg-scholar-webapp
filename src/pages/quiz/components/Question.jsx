import { useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { TrashIcon } from "@heroicons/react/24/outline";

/**
 * Question component
 * This component is used to display an individual question in the quiz page.
 * Either multiple choice (mcq) or multiple select (ms) questions can be displayed.
 *
 * @param {Object} q - The question object that contains the question text, options and correct answers
 * @param {Number} i - The question number (0 indexed)
 * @param {Boolean} mode - If the edit mode is specified the delete button will be shown
 * @param {Function} onDelete - The function that is called when the rubbish bin icon is clicked
 */
const Question = forwardRef(({ q, i, mode, onDelete }, ref) => {
  // This state holds the options for the question and if they are checked
  const [optionsArray, setOptionsArray] = useState([]);

  /**
   * Checks if the answer is in the selected options
   * @param {String} answer - The answer to check
   */
  const checkInSelectedOptions = (answer) => {
    for (let option of optionsArray) {
      if (answer === option["opt"] && option["checked"]) {
        return true;
      }
    }
  };

  /**
   * Marks the question based on the selected options
   * @returns {Number} 1 if the question is correct, 0 otherwise
   */
  const markQuestion = () => {
    console.log(optionsArray);
    let selectedOptions = 0;

    // if the correct answer is not in the selected options return 0
    for (let answer of q.correctAnswers) {
      console.log(`THERE ARE ${q.correctAnswers.length} CORRECT ANSWERS`);
      if (!checkInSelectedOptions(answer)) return 0;
      else selectedOptions++;
    }
    console.log(
      "length of q correct answers: ",
      q.correctAnswers.length,
      "length of options: ",
      selectedOptions,
      "options array lenght is: ",
      optionsArray.length
    );

    // return 1 if the number of correct answers is equal to the number of selected options
    if (q.correctAnswers.length != selectedOptions) return 0;
    return 1;
  };

  //exposes the funciton to the parent component
  useImperativeHandle(ref, () => ({
    markQuestion,
  }));

  //initialise the options array when the component is first mounted
  useEffect(() => {
    let initialArray = [];
    for (let option of q.options) {
      initialArray.push({
        opt: option,
        checked: false,
      });
    }
    setOptionsArray(initialArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * toggles the checked state of the option in the options array
   * @param {Number} index - The index of the option in the options array
   */
  const handleCheck = (index) => {
    const newOptionsArray = [...optionsArray];
    optionsArray[index]["checked"]
      ? (newOptionsArray[index]["checked"] = false)
      : (newOptionsArray[index]["checked"] = true);
    console.log(
      "option ",
      optionsArray[index]["opt"],
      "of question: ",
      q.questionText,
      "is now: ",
      optionsArray[index]["checked"]
    );
    setOptionsArray(newOptionsArray);
  };

  if (optionsArray.length < q.options.length) {
    return null;
  }

  return (
    <Card className="relative">
      {/* Question number and delete button */}
      <CardHeader className="pt-4 pb-4 bg-neutral-100 rounded-t-md">
        <p style={{ fontWeight: "bold" }}>Question {i + 1}</p>
        {mode ? (
          <Button
            className="absolute top-1 right-4 bg-neutral-100 hover:bg-gray-100 text-xs py-1 px-2"
            onClick={onDelete}
          >
            <TrashIcon className="h-6 w-6 text-gray-700 hover:text-red-500" />
          </Button>
        ) : null}
      </CardHeader>

      {/* Question text */}
      <div className="mt-2 mx-8">
        <p>{q.questionText}</p>
      </div>

      {/* Options */}
      <div className="mx-10 mt-2 mb-5">
        {q.type === "ms" ? (
          // Multiple select question
          Object.values(q.options).map((option, index) => {
            return (
              <div key={index} className="flex items-center my-2 space-x-2">
                <Checkbox
                  data-testid={`ms:${option}`}
                  checked={optionsArray[index]["checked"]}
                  onCheckedChange={() => {
                    handleCheck(index);
                  }}
                />
                <label className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option}
                </label>
              </div>
            );
          })
        ) : q.type === "mcq" ? (
          // Multiple choice question
          <RadioGroup
            onValueChange={(value) => {
              optionsArray[value]["checked"] = true;
            }}
          >
            {Object.values(q.options).map((option, index) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    data-testid={`mcq:${option}`}
                    value={index}
                    id={index}
                  />
                  <label className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        ) : null}
      </div>
    </Card>
  );
});

Question.displayName = "Question";
export default Question;
