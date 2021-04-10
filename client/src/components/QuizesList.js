import React from 'react'
import {Link} from 'react-router-dom'

export const QuizesList = ({ quizes }) => {
  if (!quizes.length) {
    return <p className="center">No quizzes yet</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Name of the quiz</th>
        <th>Open</th>
      </tr>
      </thead>

      <tbody>
      {quizes.map((quiz, index) => {
        return (
          <tr key={quiz._id}>
            <td>{index + 1}</td>
            <td>{quiz.quiz_name}</td>
            <td>
              <Link to={`/quiz_detail/${quiz._id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
