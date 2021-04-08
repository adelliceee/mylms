import React from 'react'
import {Link} from 'react-router-dom'

export const LessonsList = ({ lessons }) => {
  if (!lessons.length) {
    return <p className="center">Пока нет уроков</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Оригинальная</th>
        <th>Сокращенная</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      {lessons.map((lesson, index) => {
        return (
          <tr key={lesson._id}>
            <td>{index + 1}</td>
            <td>{lesson.title}</td>
            <td>{lesson.description}</td>
            <td>
              <Link to={`/detail/${lesson._id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
