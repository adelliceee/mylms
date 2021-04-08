import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} =  useHttp()
    const [lesson,setLesson] = useState({
        title: '', description: '', linkVideo: ''
    })


  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const pressHandler = async () => {
      try {
          const title = lesson.title
          const description = lesson.description
          const linkVideo = lesson.linkVideo
        const data = await request('/api/lesson/generate', 'POST', {title,description,linkVideo},
            {Authorization: `Bearer ${auth.token}`})
          history.push(`/detail/${data.lesson._id}`)
      } catch (e) {
          console.log('ERORRRR')
      }

  }
    const pressHandlerEnter = async event => {
        if(event.key === 'Enter') {
            try {
            const title = lesson.title
            const description = lesson.description
            const linkVideo = lesson.linkVideo
            const data = await request('/api/lesson/generate', 'POST', {title, description, linkVideo},{Authorization: `Bearer ${auth.token}`})
            history.push(`/detail/${data.lesson._id}`)
            } catch (e) {
                console.log('ERORRRR')
            }
        }
    }

  const teacher = auth.userRole === 1
  if (teacher){
    console.log('role is ',auth.userRole)
    return (
        <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
              <input
                  placeholder="title"
                  id="title"
                  type="text"
                  value={lesson.title}
                  onChange={e => setLesson({title:e.target.value,description: lesson.description,linkVideo:lesson.linkVideo})}

              />
              <label htmlFor="link">Enter the name of the lesson</label>
            </div>
            <div className="input-field">
              <textarea
                  id="textarea1"
                  placeholder="description"
                  className="materialize-textarea"
                  type="text"
                  value={lesson.description}
                  onChange={e => setLesson({title:lesson.title,description: e.target.value,linkVideo:lesson.linkVideo})}

              >

              </textarea>
              <label htmlFor="description">Enter a description of the lesson</label>
            </div>
            <div className="input-field">
              <input
                  placeholder="Youtube link"
                  id="linkVideo"
                  type="text"
                  value={lesson.linkVideo}
                  onChange={e => setLesson({title:lesson.title,description:lesson.description,linkVideo: e.target.value})}
                  onKeyPress={pressHandlerEnter}
              />
              <label htmlFor="linkVideo">Enter the link to the video in youtube</label>
            </div>
          </div>
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
          <button className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={pressHandler}
          >Create a lesson
            <i className="material-icons right">create</i>
          </button>
            </div>
        </div>

    )


  }
  else {
    console.log('role is ',auth.userRole)
    return (
        <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <iframe width="700" height="420" className="ifvideo"
                    src="http://www.youtube.com/embed/8CwWAwDepao?color=white&theme=light" frameBorder="0"
                    allowFullScreen=""/>
            <label htmlFor="l">Ваша роль Ученик</label>
          </div>
        </div>
    )


  }




}
