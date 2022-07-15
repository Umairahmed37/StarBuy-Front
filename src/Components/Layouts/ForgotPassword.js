import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPasswordAction } from '../Actions/UserActions'

const ForgotPassword = () => {
  
  
  const [Email, setEmail] = useState('')
  const dispatch = useDispatch()
  const alert = useAlert()

  const {loading,Message} = useSelector(state => state.ForgotPassReducer)
  
  useEffect(()=>{
    Message && alert.success(Message.data.message)
  },[Message])


  const HandleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email',Email)
    dispatch(ForgotPasswordAction(formData))
  }

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={HandleSubmit}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              disabled={loading && 1}
              className="btn btn-block py-3">
              Send Email
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword