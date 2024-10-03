import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

//please take userNumber out later once we've figured out how to save global variables for user auth
const Question = ({ q }) => {  {/*, userNumber, ans*/}
    //ans[q.questionNumber] = {}
    let admin = false

    //const [answer, setAnswer] = useState("")

    {/*useEffect(() => {
        saveProgress()
    }, [answer])

    const saveProgress = () => {
        ans[q.questionNumber] = {}
        //ans[q.questionNumber][] = answer
    }*/}
    
    


    return (
        <Card>
            <CardHeader className="pt-2 pb-2 bg-neutral-100">
                <p style={{fontWeight:"bold"}}>Question { q.questionNumber }</p>
            </CardHeader>

            <div style={{paddingLeft:"25px", paddingRight:"25px"}}>
                <p>{ q.questionText }</p>
            </div>

            <div style={{paddingLeft:"40px", paddingTop: "10px", paddingRight:"40px", paddingBottom:"10px"}}>

                
                {Object.values(q.options).map((option, index)=>{
                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <Checkbox />
                            <label
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
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


}

export default Question