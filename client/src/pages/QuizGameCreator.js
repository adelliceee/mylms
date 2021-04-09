import React, {useState} from 'react'


class Questions {
    constructor(questionText,answerOptions) {
        this.questionText = questionText;
        this.answerOptions = [answerOptions];
    }
}



export const QuizGameCreator = () => {
    let questions = [
        {
            questionText: '',
            answerOptions: [],
        },
    ];


    const [q,setQ] = useState(
        [
            {
                questionText: '',
                answerOptions: [],
            }
        ]
    )


    const [currentQuestion, setCurrentQuestion] = useState(0);
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
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
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

        for (let i = 0; i < newAnswer.answers.length; i++) { // выведет 0, затем 1, затем 2
            if (newAnswer.answers[i].answerText === ""){
                return
            }
        }

        const answArray = [
            {
                answerText: newAnswer.answers[0]?.answerText, isCorrect: false
            },
            {
                answerText: newAnswer.answers[1]?.answerText, isCorrect: false
            },
            {
                answerText: newAnswer.answers[2]?.answerText, isCorrect: false
            },
            {
                answerText: newAnswer.answers[3]?.answerText, isCorrect: false
            }
        ]
        answArray[correctNum].isCorrect = true

        if (currentQuestion === 0){


            questions[0] =  new Questions(
                newQuestion.question,
                answArray
            )
            const nextQuestion = currentQuestion + 1;
            setCurrentQuestion(nextQuestion)
            console.log("Is 0 element")
            console.log(questions)
            return questions

        }


        questions[currentQuestion] =  new Questions(
            newQuestion.question,
            answArray
        )
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion)
        console.log("Is", currentQuestion, "element")
        console.log(questions)
        return questions




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
        <div>
        <div className='app' >

                <>

                    <div className='question-section'>
                        <div className='question-count'>
                            <span >Question {currentQuestion + 1}</span>
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

                            <div class="input-field col s12" style={{marginRight: 15}}>
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


                </>

        </div>

        </div>
    );
}