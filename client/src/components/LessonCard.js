import React from 'react'


function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

export const LessonCard = ({ lesson }) => {
    const url = youtube_parser(lesson.linkVideo)
    const ytlink = `http://www.youtube.com/embed/${url}?color=white&theme=light`.toString()
  return (

      <div className="col s12 m2">

          <div className="z-depth-1">
              <h1 className="center">
                  {lesson.title}
              </h1>
              <h6 className="center">{new Date(lesson.date).toLocaleDateString()}</h6>
              <br/>
              <div className="center" >

              <iframe width="700" height="420" className="ifvideo"
                      src={ytlink} frameBorder="0"
                      allowFullScreen=""/>
              </div>
              <p className="flow-text center"
                 style={{marginLeft:10}}
              > {lesson.description}</p>


          </div>
      </div>




  )
}
