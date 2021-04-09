import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LessonCard} from '../components/LessonCard'




export const QuizGame = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [quiz, setQuiz] = useState(null)
    const quizId = "60700cf42c23332c8856d55f"

    const getQuiz = useCallback(async () => {
        try {
            const fetched = await request(`/api/quiz/${quizId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setQuiz(fetched)
            console.log("fetched is",fetched)

        } catch (e) {}
    }, [auth.token, quizId, request,])

    useEffect(() => {
        getQuiz()
    }, [getQuiz])

    console.log("quiz is",quiz)

    // const questions = [
    //     {
    //         questionText: 'What is the capital of France?',
    //         answerOptions: [
    //             { answerText: 'New York', isCorrect: false },
    //             { answerText: 'London', isCorrect: false },
    //             { answerText: 'Paris', isCorrect: true },
    //             { answerText: 'Dublin', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'Who is CEO of Tesla?',
    //         answerOptions: [
    //             { answerText: 'Jeff Bezos', isCorrect: false },
    //             { answerText: 'Elon Musk', isCorrect: true },
    //             { answerText: 'Bill Gates', isCorrect: false },
    //             { answerText: 'Tony Stark', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'The iPhone was created by which company?',
    //         answerOptions: [
    //             { answerText: 'Apple', isCorrect: true },
    //             { answerText: 'Intel', isCorrect: false },
    //             { answerText: 'Amazon', isCorrect: false },
    //             { answerText: 'Microsoft', isCorrect: false },
    //         ],
    //     },
    //     {
    //         questionText: 'How many Harry Potter books are there?',
    //         answerOptions: [
    //             { answerText: '1', isCorrect: false },
    //             { answerText: '4', isCorrect: false },
    //             { answerText: '6', isCorrect: false },
    //             { answerText: '7', isCorrect: true },
    //         ],
    //     },
    // ];




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
    console.log(questions)
    // return (
    //     <div className='app'>
    //         {showScore ? (
    //             <div className='score-section'>
    //                 You scored {score} out of {questions.length}
    //             </div>
    //         ) : (
    //             <>
    //                 <div className='question-section'>
    //                     <div className='question-count'>
    //                         <span>Question {currentQuestion + 1}</span>/{questions.length}
    //                     </div>
    //                     <div className='question-text'>{questions[currentQuestion].questionText}</div>
    //                 </div>
    //                 <div className='answer-section'>
    //                     {questions[currentQuestion].answerOptions.map((answerOption) => (
    //                         <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
    //                     ))}
    //                 </div>
    //             </>
    //         )}
    //     </div>
    // );
}