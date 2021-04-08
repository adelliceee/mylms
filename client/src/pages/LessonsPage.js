import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LessonsList} from "../components/LessonsList";

export const LessonsPage = () => {
  const [lessons, setLessons] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLessons = useCallback(async () => {
    try {
      const fetched = await request('/api/lesson', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLessons(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LessonsList lessons={lessons} />}
    </>
  )
}
