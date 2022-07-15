
import React from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'



const PrivateRoutes = () => {


  const Alert = useAlert()
  const navigate = useNavigate()
  const { User } = useSelector(state => state.UserLoginReducer)


  const navigateback = () => {
    console.log(User);
    Alert.error("Please Login First to Access")
    return <Navigate to='/' />
  }

  return (

    User && User.name ? <Outlet /> : navigateback()
  )
}
export default PrivateRoutes