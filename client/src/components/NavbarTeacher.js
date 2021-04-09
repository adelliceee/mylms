import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const NavbarTeacher = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
    return(
        <nav>
          <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
            <span className="brand-logo">Teacher panel</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink to="/create">Create lessons</NavLink></li>
              <li><NavLink to="/lessons">Lessons</NavLink></li>
              <li><NavLink to="/quiz">QuizGame</NavLink></li>
              <li><NavLink to="/quizexample">QuizGameExample</NavLink></li>
              <li><NavLink to="/quizcreator">Create QuizGame</NavLink></li>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
          </div>
        </nav>
    )





}
