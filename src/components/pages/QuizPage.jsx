import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const QuizPage = () => {
    const { targetNum } = useParams()

    useEffect(() => {
        //api call to firebase for the quiz questions
    }, [])

    return (
        <div>
            <h1>
                Target {targetNum} Quiz
            </h1>
        </div>
    )

    


}

export default QuizPage
