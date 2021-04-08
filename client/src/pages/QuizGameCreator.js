import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'





export const QuizGameCreator = () => {
    let questions = [
        {
            questionText: 'Write something',
            answerOptions: [
                { answerText: 'Here', isCorrect: false },
                { answerText: 'and here', isCorrect: false },
                { answerText: 'and here also', isCorrect: false },
                { answerText: 'and here also also', isCorrect: false },
            ],
        },           {
            questionText: 'Write something',
            answerOptions: [
                { answerText: 'Here', isCorrect: false },
                { answerText: 'and here', isCorrect: false },
                { answerText: 'and here also', isCorrect: false },
                { answerText: 'and here also also', isCorrect: false },
            ],
        },           {
            questionText: 'Write something',
            answerOptions: [
                { answerText: 'Here', isCorrect: false },
                { answerText: 'and here', isCorrect: false },
                { answerText: 'and here also', isCorrect: false },
                { answerText: 'and here also also', isCorrect: false },
            ],
        },
    ];




    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const handleAnswerChange = (value, index) => {
        const questionsCopy = [...questions] //Make a copy to avoid mutating state directly
        questionsCopy[currentQuestion].answerOptions[index].answerText = value
        questions = questionsCopy
        setCurrentQuestion(questions)
    }
    const handleQChange = (value) => {
        const questionsCopy = [...questions] //Make a copy to avoid mutating state directly
        questionsCopy[currentQuestion].questionText = value
        questions = questionsCopy
        setCurrentQuestion(questions)
    }

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return (
        <div className='app' >

                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span >Question {currentQuestion}</span>/{questions.length}
                        </div>
                        <div className='question-text'>

                            <input style={{color: 'white'}} value={questions[currentQuestion].questionText}
                                   onChange={event => handleQChange(event.target.value)} />
                        </div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <input style={{color: 'white'}} value={answerOption.answerText}
                                   onChange={event => handleAnswerChange(event.target.value, index)} />
                        ))}
                    </div>
                </>

        </div>
    );
}