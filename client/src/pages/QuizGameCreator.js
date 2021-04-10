import React, {useContext, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const QuizGameCreator = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} =  useHttp()

    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [newQuestion,setNewQuestion] = useState({
        question:''
    })

    const [newAnswerCorrect,setNewAnswerCorrect] = useState(0)

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
        const correctNum = newAnswerCorrect

        if (correctNum<0){
            return
        }

        if (newQuestion.question === ""){
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
    }

    const pressSaveQuiz = async () => {
        try {
            console.log(currentQuestion);
            const data = await request('/api/quiz/generate', 'POST', {questions: currentQuestion},
                {Authorization: `Bearer ${auth.token}`})
            console.log(data)
            history.push(`/quiz_detail/${data.quiz._id}`)
        } catch (e) {
            console.log('ERORRRR')
        }
    }

    console.log(currentQuestion);
    return (
        <div>
            <div className='app' >

                    <div className='question-section'>
                        <div className='question-count'>
                            <span >Question {currentQuestion.length + 1}</span>
                        </div>
                        <div className='question-text'>
                            <input style={{color: 'white'}}
                                   value={newQuestion.question}
                                   name="question"
                                   onChange={handleChangeQ} />

                            <div style={{marginRight: 10}}>
                                <button
                                    onClick={pressSave}

                                >
                                    Save
                                </button>
                            </div>

                            <div className="input-field col s12" style={{marginRight: 15}}>
                                <select className="browser-default"
                                        name = "correct"
                                        onChange={event => setNewAnswerCorrect(event.target.value)}
                                >
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="0">{newAnswer.answers[0].answerText}</option>
                                    <option value="1">{newAnswer.answers[1]?.answerText}</option>
                                    <option value="2">{newAnswer.answers[2]?.answerText}</option>
                                    <option value="3">{newAnswer.answers[3]?.answerText}</option>

                                </select>

                            </div>

                        </div>
                    </div>

                    <div className='answer-section'>
                        {newAnswer.answers.map((answers, i) => (
                            <input style={{color: 'white'}}
                                   name="answerText"
                                   value={answers.answerText}
                                   onChange={handleChange(i)} />
                        ))}
                    </div>

            </div>

            <button style={{
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "1rem",
                width:"15rem",
                textAlign:"center"

            }}
                    onClick={pressSaveQuiz}
            >
                Save this quiz
            </button>

        </div>
    );
}
