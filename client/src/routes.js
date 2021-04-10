import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {QuizDetailPage} from './pages/QuizDetailPage'
import {HomePage} from './pages/HomePage'
import {AuthPage} from './pages/AuthPage'
import {LessonsPage} from "./pages/LessonsPage";
import {QuizesPage} from "./pages/QuizesPage";
import {QuizGame} from "./pages/QuizGame";
import {QuizGameCreator} from "./pages/QuizGameCreator";


export const useRoutes = isAuthenticated => {


    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/lessons" exact>
                    <LessonsPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>

                <Route path="/quiz">
                    <QuizGame />
                </Route>
                <Route path="/quiz_detail/:id">
                    <QuizDetailPage />
                </Route>
                <Route path="/quizes" exact>
                    <QuizesPage/>
                </Route>
                <Route path="/quizcreator">
                    <QuizGameCreator />
                </Route>

                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}



