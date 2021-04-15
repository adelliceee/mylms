import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {NavbarTeacher} from './components/NavbarTeacher'

import {Loader} from './components/Loader'
import 'materialize-css'





function App() {
  const {token, login, logout, userId,userRole,ready} = useAuth()
  const isAuthenticated = !!token
  const isTeacher = userRole === 1


  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  if (isTeacher){
      return (
          <AuthContext.Provider value={{
              token, login, logout, userId,userRole,isAuthenticated
          }}>
              <Router>
                  { isAuthenticated  && <NavbarTeacher/> }
                  <div className="container">
                      {routes}
                  </div>
              </Router>
          </AuthContext.Provider>
      )
  }
  else{
      return (
          <AuthContext.Provider value={{
              token, login, logout, userId,userRole,isAuthenticated
          }}>
              <Router>
                  { isAuthenticated  && <Navbar/> }
                  <div className="container">
                      {routes}
                  </div>
              </Router>
          </AuthContext.Provider>
      )
  }




}

export default App
