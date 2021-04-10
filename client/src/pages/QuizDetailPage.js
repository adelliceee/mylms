import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'

import {QuizCard} from "../components/QuizCard";


export const QuizDetailPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [quiz, setQuiz] = useState(null)
    const quizId = useParams().id

    const getQuiz = useCallback(async () => {
        try {
            const fetched = await request(`/api/quiz/${quizId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setQuiz(fetched.questions)
            console.log("fetched is", fetched)

        } catch (e) {}
    }, [auth.token, quizId, request,])

    useEffect(() => {
        getQuiz()
    }, [getQuiz])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            { !loading && quiz && <QuizCard quiz={quiz} /> }
        </>
    )


}
