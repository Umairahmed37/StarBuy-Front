
import React from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'



const PrivateCart = () => {




  const Alert = useAlert()
  const navigate = useNavigate()
  const { User, isAuthenticated } = useSelector(state => state.UserLoginReducer)


  const navigateback = () => {
     Alert.error("Please Login First to Access")
     return <Navigate to='/Login' />
  }

  return (

    User?.name && isAuthenticated ? <Outlet /> : navigateback()
  )
}
export default PrivateCart