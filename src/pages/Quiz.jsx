import { React, useEffect, useState } from 'react';
import SideMenu from "../components/SideMenu";
import "../components/SideMenu.css"
import {useParams} from "react-router-dom"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../../firebaseFiles/firebaseConfig.js';
import Question from "../components/Question.jsx"
import { Button, buttonVariants } from "@/components/ui/button"

const Quiz = () => {

    const { moduleId } = useParams();
    const moduleTitle = `Target 11.${moduleId} Quiz`;
    //const [nQuestions, setNQuestions] = useState(1)
    const [docs, setDocs] = useState({})
    const ans = {}

    let admin = false


    const getTotalQuestions = async () => {
        try {
            let docRef = doc(db, `quizzes/sdg11t${ moduleId }`)
            let docSnap = await getDoc(docRef)
            if (docSnap.exists()) {   
                console.log((docSnap.data()).totalQuestions)
                return (docSnap.data()).totalQuestions
            } else {
                console.log('nQuestions Document does not exist')
            }

            
        } catch (e) {
            console.error('Error retrieving document: ', e)
        }
        return 0
    }

    const getQuestions = async () => {
        const totalQuestions = await getTotalQuestions()

        try {
            let docRef = doc(db, `quizzes/sdg11t${ moduleId }`)
            let docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const newDocs = {}
                //console.log((docSnap.data()).totalQuestions)
                //setNQuestions((docSnap.data()).totalQuestions)
                for (let i = 1; i<= totalQuestions; i++) {
                    let docRef = doc(db, `quizzes/sdg11t${ moduleId }/questions/sdg11t${ moduleId }q${i}`)
                    let docSnap = await getDoc(docRef)
            
                    if (docSnap.exists()) {
                        console.log((docSnap.data()).questionText)
                        newDocs[`sdg11t${ moduleId }q${i}`] = docSnap.data()
                        console.log(`document sdg11t${ moduleId }q${i} is now ${ docSnap.data().questionText }`)
                        console.log("newdocs is: "+ (newDocs[`sdg11t${ moduleId }q${i}`]).questionText)
                    } else {
                        console.log(`Document does not exist at sdg11t${ moduleId }q${i}`)
                    }
                }
                setDocs(newDocs)
            } else {
                console.log('nQuestions Document does not exist')
            }

            
        } catch (e) {
            console.error('Error retrieving document: ', e)
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])

    const checkAnswers = (ans) => {
        
    }

    const handleAddQuestionClick = () => {

    }

    return <div className="main-content">
        <h2 style={{fontWeight: "bold"}}>{ moduleTitle }</h2>
        <br />
        <SideMenu moduleTitle={`Target 11.${moduleId}`} moduleId={moduleId} />
        <div>
            {Object.values(docs).map((question) => {
                console.log("question number is: "+ question.questionNumber)
                console.log("value at docs is: "+ question.questionText)
                return (
                    <div>
                    <Question key={question.questionNumber} q={ question } ans={ ans }/>
                    <br />
                    </div>
                )
                
            }
                )
                
            }
        </div>

        <div className="flex flex-col items-center">
            {admin ? 
                <button onClick={()=>handleAddQuestionClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            : null}
            <br />
            <Button onClick={ () => checkAnswers() } className="w-44">Submit Quiz</Button>
        </div>
        
        
    </div>

};
export default Quiz;
