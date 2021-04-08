import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LessonCard} from '../components/LessonCard'
import {useAuth} from "../hooks/auth.hook";

export const DetailPage = () => {
  //const {token} = useContext(AuthContext)
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [lesson, setLesson] = useState(null)

  const lessonId = useParams().id

  const getLesson = useCallback(async () => {
    try {
      const fetched = await request(`/api/lesson/${lessonId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setLesson(fetched)
    } catch (e) {}
  }, [auth.token, lessonId, request,])

  useEffect(() => {
    getLesson()
  }, [getLesson])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && lesson && <LessonCard lesson={lesson} /> }
    </>
  )
}
