import { useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"

import { TrashIcon } from "@heroicons/react/24/outline";

const Question = forwardRef(({ q, i, mode, onDelete }, ref) => {
  let admin = false;

  const [optionsArray, setOptionsArray] = useState([]);

  const checkInSelectedOptions = (answer) => {
    for (let option of optionsArray) {
      if (answer === option["opt"] && option["checked"]) {
        return true;
      }
    }
  };

  const markQuestion = () => {
    console.log(optionsArray)
    let selectedOptions = 0;
    for (let answer of q.correctAnswers) {
      console.log(`THERE ARE ${q.correctAnswers.length} CORRECT ANSWERS`)
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
    if (q.correctAnswers.length != selectedOptions) return 0;
    return 1;
  };

  useImperativeHandle(ref, () => ({
    markQuestion,
  }));

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

      <div className="mt-2 mx-8">
        <p>{q.questionText}</p>
      </div>

      <div className="mx-10 mb-5">
        {q.type === 'ms' ? (
          Object.values(q.options).map((option, index) => {
            return (
              <div key={index} className="flex items-center my-2 space-x-2">
                <Checkbox
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
        ) : (
          q.type === 'mcq' ? (
            <RadioGroup onValueChange={(value) => {optionsArray[value]["checked"] = true}}>
              {Object.values(q.options).map((option, index) => {
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index} id={index} />
                    <label className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option}</label>
                  </div>
                )
              })}
            </RadioGroup>
          ) : (null)
        )}
        {admin ? <Button>Edit</Button> : null}
      </div>
    </Card>
  );
});

Question.displayName = "Question";
export default Question;
