import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@heroicons/react/24/outline";

//please take userNumber out later once we've figured out how to save global variables for user auth
const Question = ({ q, i, mode }) => {
  {
    /*, userNumber, ans*/
  }
  //ans[q.questionNumber] = {}
  let admin = false;

  //const [answer, setAnswer] = useState("")

  {
    /*useEffect(() => {
        saveProgress()
    }, [answer])

    const saveProgress = () => {
        ans[q.questionNumber] = {}
        //ans[q.questionNumber][] = answer
    }*/
  }

  return (
    <Card className="relative">
      <CardHeader className="pt-4 pb-4 bg-neutral-100 rounded-t-md">
        <p style={{ fontWeight: "bold" }}>Question {i + 1}</p>
        {mode === "edit" ? (
          <Button className="absolute top-1 right-4 bg-neutral-100 hover:bg-gray-100 text-xs py-1 px-2">
            <TrashIcon className="h-6 w-6 text-gray-700 hover:text-red-500" />
          </Button>
        ) : null}
      </CardHeader>

      <div className="mt-4 mx-8">
        <p>{q.questionText}</p>
      </div>

      <div className="mx-10 mb-5">
        {Object.values(q.options).map((option, index) => {
          return (
            <div key={index} className="flex items-center my-2 space-x-2">
              <Checkbox />
              <label className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option}
              </label>
            </div>
          );
        })}
        {admin ? <Button>Edit</Button> : null}
      </div>
    </Card>
  );
};

export default Question;
