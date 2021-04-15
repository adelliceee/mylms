import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {body} from "express-validator";




export const CreateAssignmentsPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} =  useHttp()
    const [lesson,setLesson] = useState({
        title: '', description: '',files: null
    })



  useEffect(() => {
    window.M.updateTextFields()
  }, [])

    const [fileData, setFileData] = useState();

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let newFilename = Date.now() + '--загр'
        // Handle File Data from the state Before Sending

        const data = new FormData();
        data.append("attachment", fileData);
        data.append("fname", newFilename)

        fetch("http://localhost:5000/api/assignment/single", {
            method: "POST",
            body: data,
        })
            .then((result) => {
                console.log("File Sent Successful");
            })
            .catch((err) => {
                console.log(err.message);
            });


    };





    const pressHandler = async () => {
      try {
          const title = lesson.title
          const description = lesson.description
          const files = lesson.files
        // const data = await request('/api/lesson/generate', 'POST', {title,description,files},
        //     {Authorization: `Bearer ${auth.token}`})
        //   history.push(`/detail/${data.lesson._id}`)
          console.log({title,description,files})
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
        <div className="app" >


        <div className="question-section">
            <h5>Assignment of the task</h5>
          <div className="question-text" style={{paddingTop: '2rem'}}>
            <div className="input-field" >
                <label htmlFor="link">Enter the task topic</label>
              <input style={{color: '#FFFFFF'}}
                  placeholder="title"
                  id="title"
                  type="text"
                  value={lesson.title}
                  onChange={e => setLesson({title:e.target.value,description: lesson.description,files:lesson.files})}

              />
            </div>

            <div className="input-field">
                <label htmlFor="description">Enter the task description</label>
              <textarea style={{color: '#FFFFFF'}}
                  id="textarea1"
                  placeholder="description"
                  className="materialize-textarea"
                  type="text"
                  value={lesson.description}
                  onChange={e => setLesson({title:lesson.title,description: e.target.value,files:lesson.files})}

              >

              </textarea>

            </div>
          </div>
            <div>
                <form  onSubmit={onSubmitHandler}>
                    <div className="file-field input-field ">
                        <div className="btn indigo darken-1" >
                            <span>File</span>
                            <input type="file"
                                   //onChange={e => setLesson({title:lesson.title,description: lesson.description,files:e.target.files})}
                                   onChange={fileChangeHandler}
                                   multiple>

                                </input>
                        </div>
                        <div className="file-path-wrapper ">
                            <input className="file-path validate"
                                   type="text"
                                   placeholder="Upload one or more files"
                                   style={{color: '#FFFFFF'}}/>
                        </div>
                    </div>

                    <button type="submit">Submit To Server</button>
                </form>



            </div>
          <div className="col s8 offset-s2 " style={{paddingTop: '2rem'}}>
          <button className="btn waves-effect waves-light indigo darken-1"
                  type="submit"
                  name="action"
                  onClick={pressHandler}
          >Create an Assignment
            <i className="material-icons right">create</i>
          </button>
            </div>

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
