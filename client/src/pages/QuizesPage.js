import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {QuizesList} from "../components/QuizesList";

export const QuizesPage = () => {
  const [quizes, setQuizes] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchQuizes = useCallback(async () => {
    try {
      const fetched = await request('/api/quiz', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setQuizes(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchQuizes()
  }, [fetchQuizes])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <QuizesList quizes={quizes} />}
    </>
  )
}
