import { useImperativeHandle, forwardRef, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

//please take userNumber out later once we've figured out how to save global variables for user auth
const Question = forwardRef(({ q, i }, ref) => {  {/*, userNumber, ans*/}
    //ans[q.questionNumber] = {}
    let admin = false;

    //let optionsArray = []

    const [optionsArray, setOptionsArray] = useState([])

    const checkInSelectedOptions = (answer) => {
        for(let option of optionsArray){
            if(answer === option["opt"] && option["checked"]){
                return true
            }
        }
    }

    const markQuestion = () => {
        for(let answer of q.correctAnswers){
            if(!checkInSelectedOptions(answer)) return 0
        }
        return 1
    }

    useImperativeHandle(ref, () => ({
        markQuestion
    }))

    useEffect(() => {
        let initialArray = []
        for(let option of q.options){
            initialArray.push({
                "opt": option,
                "checked": false
            })
        }
        setOptionsArray(initialArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCheck = (index) => {
        const newOptionsArray = [...optionsArray]
        optionsArray[index]["checked"] ? (newOptionsArray[index]["checked"] = false) : (newOptionsArray[index]["checked"] = true)
        console.log("option ", optionsArray[index]["opt"], "of question: ", q.questionText, "is now: ", optionsArray[index]["checked"])
        setOptionsArray(newOptionsArray)
    }

    if(optionsArray.length < q.options.length){
        return null
    }

    return (
        <Card>
            <CardHeader className="pt-2 pb-2 bg-neutral-100">
                <p style={{fontWeight:"bold"}}>Question { i + 1 }</p>
            </CardHeader>

            <div style={{paddingLeft:"25px", paddingRight:"25px"}}>
                <p>{ q.questionText }</p>
            </div>

            <div style={{paddingLeft:"40px", paddingTop: "10px", paddingRight:"40px", paddingBottom:"10px"}}>

                
                {Object.values(q.options).map((option, index)=>{

                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <Checkbox 
                              checked={optionsArray[index]["checked"]}
                              onCheckedChange={() => {handleCheck(index)}}
                            />
                            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {option}
                            </label>
                            <br/>
                        </div>
                    )
                })}
                <br />
                {admin ? <Button>Edit</Button> : null}
            </div>
        </Card>
    )
})

export default Question