import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";

export const QuizGameCreator = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} =  useHttp()
    const message = useMessage()
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [quizName, setquizName] = useState('');
    const [newQuestion,setNewQuestion] = useState({
        question:''
    })


    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const [newAnswerCorrect,setNewAnswerCorrect] = useState(-1)

    const [newAnswer,setNewAnswer] = useState({
            answers: [{
                answerText:'',
                isCorrect:false
            }
                ,{
                    answerText:'',
                    isCorrect:false
                }
                ,{
                    answerText:'',
                    isCorrect:false
                }, {
                    answerText:'',
                    isCorrect: false
                }

            ]
        }

    )

    const handleChange = (i) => (e) => {
        setNewAnswer({
            ...newAnswer,
            answers: newAnswer.answers.map((answer, j) => j !== i ? answer : ({
                ...answer,
                answerText: e.target.value
            }))
        });
    };

    const handleChangeQ = (event) => {
        setNewQuestion({ ...newQuestion, [event.target.name]: event.target.value })
    }



    const pressSave = () => {
        //check
        const correctNum = Number(newAnswerCorrect)


        if (newQuestion.question === ""){
            message('Enter a question')
            return
        }

        for (let i = 0; i < 4; i++) { // выведет 0, затем 1, затем 2
            if (newAnswer.answers[i]?.answerText === ""){
                message(`Enter option №${i+1}`)
                return
            }
        }

        if (correctNum<=-1){
            message('Choose the correct answer')
            return
        }



        const answersArray = [1,1,1,1].map((item, index) => ({
            answerText: newAnswer.answers[index]?.answerText,
            isCorrect: correctNum === index,
        }));



        setCurrentQuestion([
            ...currentQuestion, {
                questionText: newQuestion.question,
                answerOptions: answersArray,
            }])

        setNewQuestion({
            question:''
        })
        setNewAnswer({
            answers: [{
                answerText:'',
                isCorrect:false
            }
                ,{
                    answerText:'',
                    isCorrect:false
                }
                ,{
                    answerText:'',
                    isCorrect:false
                }, {
                    answerText:'',
                    isCorrect: false
                }

            ]
        })
        setNewAnswerCorrect(-1)
    }

    const pressSaveQuiz = async () => {


        if (quizName === ''){
            message('Enter a Quiz Name')
            return
        }

        try {
            console.log(currentQuestion);
            const data = await request('/api/quiz/generate', 'POST', {questions: currentQuestion,quiz_name:quizName},
                {Authorization: `Bearer ${auth.token}`})

            history.push(`/quiz_detail/${data.quiz._id}`)
        } catch (e) {

        }
    }

    return (
        <div>
            <div className='app' >

                    <div className='question-section'>
                        <div className='question-count'>
                            <span >Question {currentQuestion.length + 1}</span>
                        </div>
                        <div className='question-text'>
                            <div style={{marginRight: 15}}>
                                 <textarea style={{color: 'white',
                                     marginRight: "auto",
                                     marginLeft: "auto",}}
                                           value={newQuestion.question}
                                           name="question"
                                           placeholder="Your question"
                                           onChange={handleChangeQ} />
                            </div>



                            <div className="input-field col s12" style={{marginRight: 15}}>
                                <select
                                    style={{background: '#252d4a',
                                    color:"white"}}
                                    className="browser-default"
                                        name = "correct"
                                        onChange={event => setNewAnswerCorrect(event.target.value)}
                                >
                                    <option value="" disabled selected>Choose your answer</option>
                                    <option value="0">{newAnswer.answers[0].answerText || 'Not filled in'}</option>
                                    <option value="1">{newAnswer.answers[1].answerText || 'Not filled in'}</option>
                                    <option value="2">{newAnswer.answers[2].answerText || 'Not filled in'}</option>
                                    <option value="3">{newAnswer.answers[3].answerText || 'Not filled in'}</option>

                                </select>

                            </div>
                            <div style={{
                                marginRight: 15}}>
                                <button
                                    onClick={pressSave}

                                >
                                    Next question
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className='answer-section'>
                        {newAnswer.answers.map((answers, i) => (
                            <input style={{color: 'white'}}
                                   name="answerText"
                                   placeholder="Answer option"
                                   value={answers.answerText}
                                   onChange={handleChange(i)} />
                        ))}
                    </div>

            </div>

            <div style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "1rem",
                width:"15rem",
                textAlign:"center"

            }}>

                <input
                    type="text"
                    placeholder = "Enter the name of the quiz"
                    value={quizName}
                    onChange={event => setquizName(event.target.value)}
                />


                <button
                    onClick={pressSaveQuiz}
                >
                    Save this quiz
                </button>
            </div>



        </div>
    );
}
