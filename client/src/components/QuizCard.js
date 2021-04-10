import React, {useState} from 'react'


export const QuizCard = ({ quiz }) => {

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



  )
}
