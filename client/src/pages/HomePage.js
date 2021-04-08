import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const HomePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  const teacher = auth.userRole === 1
  if (teacher){
    console.log('role is ',auth.userRole)
    return (
        <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <h3 className="col s8 offset-s2" >Hello Teacher!</h3>

          </div>
        </div>
    )

  }
  else {
    console.log('role is ',auth.userRole)
    return (
        <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <h2 style={{color: '#1E88E5'}}>Hello Student</h2>
            <p style={{color: 'black'}}>Go to lessons and start studying!</p>
          </div>
        </div>
    )


  }





}
