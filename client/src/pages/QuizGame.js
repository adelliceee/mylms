import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'


export const QuizGame = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [quiz, setQuiz] = useState(null)
    const quizId = "60712d1aba1ab5b1c8c7707e"

    const getQuiz = useCallback(async () => {
        try {
            const fetched = await request(`/api/quiz/${quizId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setQuiz(fetched.questions)
            console.log("fetched is", fetched)

        } catch (e) {}
    }, [auth.token, quizId, request,])

    useEffect(() => {
        getQuiz()
    }, [getQuiz])

    const questions = quiz || [];

    console.log(questions);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

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
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    {questions.length > 0 &&
                        <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                        <div className='answer-section'>
                    {questions[currentQuestion].answerOptions.map((answerOption) => (
                        <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                        </div>
                        </>
                    }
                </>
            )}
        </div>
    );


}
