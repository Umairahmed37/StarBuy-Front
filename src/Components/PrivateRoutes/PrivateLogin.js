
import React from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'



const PrivateLogin = () => {

  const Alert = useAlert()
  const navigate = useNavigate()
  const { User } = useSelector(state => state.UserLoginReducer)

  const navigateback = () => {
    return <Navigate to='/' />
  }


  return (
    User && User.isAuthenticated ? navigateback() : <Outlet />
  )
}
export default PrivateLogin