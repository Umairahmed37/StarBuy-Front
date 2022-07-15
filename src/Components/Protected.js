import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Protected = ({ Component }) => {

  const Alert = useAlert()
  const navigate = useNavigate()
  const { User } = useSelector(state => state.UserLoginReducer)

  useEffect(() => {
 
    if(User && !User.name){
      Alert.error("Please Login First")
      navigate('/')
    }

  }, [])



  return (
    <>
      <Component />
    </>
  )
}

export default Protected